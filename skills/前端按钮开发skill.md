## 前端按钮约束 Skill

### 一、Skill 说明
AI 创建、修改前端页面时，按钮的样式、图标、文字及使用方式必须遵循本 Skill。

**核心原则：**
- 标准业务操作必须使用规定的 Arco Design Button 样式。
- 新建、删除、导入、导出按钮必须使用规定的类型、状态和图标。
- 表格行内操作必须使用项目已有的 TextBtns 组件。
- 禁止自行设计按钮颜色、图标、边框、背景等样式。
- 本 Skill 的规范优先于 AI 的通用前端开发习惯，禁止自行发挥。


### 二、新建按钮约束
新建按钮用于创建新的业务数据, 标准用法：
```vue
<a-button type="primary" @click="showEdit = true;"><template #icon><icon-plus /></template>新建</a-button>
```

### 三、删除按钮约束
删除按钮用于删除业务数据，属于危险操作, 标准用法：
```vue
<a-button type="primary" status="danger" @click="onDelete()"><template #icon><icon-delete /></template>删除</a-button>
```

### 四、导入按钮约束
导入按钮用于从外部文件或其他数据源导入业务数据, 标准用法：
```vue
<a-button type="outline"><template #icon><icon-upload /></template>导入</a-button>
```

### 五、导出按钮约束
导出按钮用于导出业务数据, 标准用法：
```vue
<a-button type="outline"><template #icon><icon-download /></template>导入</a-button>
```

### 六、表格行内按钮约束
表格行内操作按钮必须使用项目已有的`TextBtns`组件，适用于：编辑、详情、查看、分配、配置、启用、停用、其他表格行级业务操作。
```vue
<a-table-column title="操作" data-index="operation" fixed="right" :width="180" align="center">
  <template #cell="{ record }">
    <TextBtns>
      <div @click="onDetail(record)">详情</div>
      <div @click="currentEdit = record; showEdit = true;">编辑</div>
    </TextBtns>
  </template>
</a-table-column>
```

### 七、核心规则
AI 生成 `sense-x-ui` 按钮代码时必须牢记：

> **新建按钮统一使用 primary + icon-plus。**

> **删除按钮统一使用 primary + danger + icon-delete。**

> **导入按钮统一使用 outline + icon-upload。**

> **导出按钮统一使用 outline + icon-download。**

> **表格行内操作统一使用 TextBtns，禁止使用普通 a-button。**

> **禁止自行设计按钮颜色、图标、背景、边框、圆角等样式。**

> **本 Skill 的规范优先于 AI 的通用前端开发习惯，禁止自行发挥。**
