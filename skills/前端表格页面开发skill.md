## 前端表格页面约束 Skill

### 一、Skill 说明

AI 创建、修改表格页面时，必须遵循本 Skill。

**核心原则：**
- 所有表格页面必须使用项目公共组件 `CommonLightTable`，禁止直接使用 `a-table` 作为页面主表格。
- 查询区域统一使用 `#search` 和 `SearchItem`。
- 表格操作统一使用 `#operation`。
- 表格字段统一使用 `#columns` 和 `a-table-column`。
- 表格数据、分页、查询条件统一使用 `table` 对象管理。
- 表格查询统一通过 `initData()` 完成。
- 选中行 ID 统一使用 `selectRowIds`。
- 编辑数据统一使用 `currentEditRow`。
- 本 Skill 的规范优先于 AI 的通用前端开发习惯，禁止自行发挥。

### 二、CommonLightTable使用约束

表格页面必须直接使用 `CommonLightTable`，标准结构：

```vue
<CommonLightTable
  title="用户管理"
  :data="table.data"
  :total="table.total"
  @search="initData"
  @selectRowIds="(ids)=>selectRowIds = ids"
  :page="table.page"
  :page-size="table.pageSize"
  @pageChange="(p, s)=>{ table.page = p; table.pageSize = s; initData(); }"
>
  <template #search>
    <!-- 查询条件 -->
  </template>

  <template #operation>
    <!-- 表格操作 -->
  </template>

  <template #columns>
    <!-- 表格字段 -->
  </template>
</CommonLightTable>
```

禁止自行封装新的表格、分页、查询组件。

### 三、查询区域约束

查询条件必须放在 `#search` 中，并使用 `SearchItem`：

```vue
<template #search>
  <SearchItem label="登录名称">
    <a-input v-model="table.tableFilter.username" size="small" />
  </SearchItem>

  <SearchItem label="用户姓名">
    <a-input v-model="table.tableFilter.name" size="small" />
  </SearchItem>
</template>
```

所有查询条件统一放在：

```js
table.tableFilter
```

禁止将查询条件拆分为多个独立的 `ref`。

### 四、表格数据及分页约束

表格数据统一使用以下结构：

```js
const table = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 50,
  tableFilter: {}
});
```

字段含义：
- `data`：表格数据
- `total`：数据总数
- `page`：当前页
- `pageSize`：每页数量
- `tableFilter`：查询条件

分页变化时，直接修改 `table.page`、`table.pageSize`，并调用 `initData()`。

禁止单独定义：

```js
const page = ref(1);
const pageSize = ref(50);
```

### 五、表格查询约束

表格初始化、查询、分页刷新统一使用 `initData()`：

```js
function initData() {
  const params = {
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...table.value.tableFilter
  };

  queryUser(params).then(res => {
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count']
      ? Number(res.headers['x-total-count'])
      : 0;
  });
}
```

接口查询参数必须包含：

```js
{
  page,
  pageSize,
  ...tableFilter
}
```

默认从响应头 `x-total-count` 获取总数。

### 六、Loading约束

禁止自行创建表格 `loading`，由框架统一处理。

API 请求禁止配合使用 loading。

### 七、表格选中行约束

选中数据 ID 统一使用：

```js
const selectRowIds = ref([]);
```

通过 `CommonLightTable` 获取：

```vue
@selectRowIds="(ids)=>selectRowIds = ids"
```

禁止重复定义 `selectedIds`、`checkedIds`、`selectedRows` 等相同用途的状态。

### 八、表格列约束

表格字段统一放在 `#columns` 中，使用 `a-table-column`：

```vue
<template #columns>
  <a-table-column
    title="登录名"
    data-index="username"
    :width="140"
    ellipsis
    tooltip
  />

  <a-table-column
    title="用户姓名"
    data-index="name"
    :width="160"
    ellipsis
    tooltip
  />
</template>
```

普通文本字段优先配置 `ellipsis`、`tooltip`。

需要根据数据进行展示转换时，使用 `#cell`：

```vue
<a-table-column title="性别" data-index="sex" :width="70">
  <template #cell="{ record }">
    <span v-if="record.sex === 'M'">男</span>
    <span v-else-if="record.sex === 'W'">女</span>
    <span v-else>未知</span>
  </template>
</a-table-column>
```

状态字段可以使用 Arco Design 的 `a-tag` 展示。

### 九、表格操作约束

表格顶部操作统一放在 `#operation`：

```vue
<template #operation>
  <a-button type="primary">
    新建
  </a-button>

  <a-button status="danger">
    删除
  </a-button>
</template>
```

按钮具体样式遵循《前端按钮约束 Skill》。

表格行操作统一放在最后的操作列：

```vue
<a-table-column
  title="操作"
  data-index="operation"
  fixed="right"
  :width="80"
>
  <template #cell="{ record }">
    <a @click="onEdit(record)">编辑</a>
  </template>
</a-table-column>
```

多个行操作使用项目公共组件 `TextBtns`：

```vue
<TextBtns>
  <div @click="onEdit(record)">编辑</div>
  <div @click="onAssign(record)">分配</div>
</TextBtns>
```

禁止使用 `a-button` 作为表格行内操作按钮。

### 十、编辑/新建约束

编辑数据统一使用：

```js
const currentEditRow = ref({});
```

编辑时：

```js
function onEdit(row) {
  currentEditRow.value = row;
  modalShow.value.edit = true;
}
```

新建、编辑等表单使用独立组件，通过 `v-if` 控制显示：

```vue
<EditUser
  v-if="modalShow.edit"
  :edit-data="currentEditRow"
  @close="
    modalShow.edit = false;
    currentEditRow = {};
    initData();
  "
/>
```

新增、编辑、删除操作完成后，需要调用 `initData()` 刷新表格。

### 十一、核心规则

AI 生成 `sense-x-ui` 表格代码时必须牢记：

> **表格页面必须使用 `CommonLightTable`，禁止直接使用 `a-table`。**

> **查询条件统一放在 `#search`，使用 `SearchItem`。**

> **表格操作统一放在 `#operation`，按钮样式遵循按钮 Skill。**

> **表格字段统一放在 `#columns`，使用 `a-table-column`。**

> **表格数据、分页、查询条件统一使用 `table` 管理。**

> **表格查询统一通过 `initData()` 完成。**

> **选中行 ID 统一使用 `selectRowIds`。**

> **表格行内操作使用 `TextBtns`，禁止使用 `a-button`。**

> **API 请求禁止配合使用 loading，由框架层统一处理。**

> **本 Skill 的规范优先于 AI 的通用前端开发习惯，禁止自行发挥。**