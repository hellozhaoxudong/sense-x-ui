# 前端弹窗页面开发 Skill

## 一、Skill 说明

用于规范基于 `CommonModal` 的新建、编辑、详情弹窗页面代码生成。

核心原则：

- 弹窗统一使用 `CommonModal`
- 表单统一使用 Arco Design `a-form`
- 新建、编辑共用同一个弹窗页面
- 表单数据统一使用 `formData`
- 提交前必须进行表单校验
- API 请求不自行增加 loading
- 优先复用现有项目组件和 API

---

## 二、CommonModal 使用约束

编辑/新建页面必须使用 `CommonModal`：

```vue
<CommonModal title="用户信息" :width="'600px'" @ok="submit" @close="emit('close')">
```

约束：

- 必须使用 `CommonModal`
- 不使用 `a-modal` 直接实现
- 标题通过 `title` 设置
- 弹窗宽度通过 `width` 设置
- 确认操作统一绑定 `submit`
- 关闭操作统一触发 `emit('close')`

---

## 三、Form 使用约束
具体表单字段规范遵循《前端 Form 表单组件约束 Skill》。

---

## 四、Props 与 Emit 约束

编辑弹窗通过 `props` 接收编辑数据：

```js
const props = defineProps({
  editData: { type: Object, default: {} }
});
```

关闭弹窗统一通过 `emit`：

```js
const emit = defineEmits(['close'])
```

提交成功后：

```js
emit('close');
```

---

## 五、表单数据初始化约束

使用 `formData` 保存表单数据：

```js
const formData = ref({
  sex: 'M',
  enabled: 'Y',
  roleIds: []
});
```

约束：

- 默认值统一在 `formData` 中定义
- 编辑时使用 `props.editData` 覆盖表单数据
- 新建时使用默认值
- 不直接修改 `props`
- 编辑数据建议使用对象展开复制：

```js
formData.value = {...props.editData}
```

---

## 六、关联数据初始化约束

弹窗存在下拉框、角色、字典等关联数据时，在 `onMounted` 中统一初始化：

```js
onMounted(() => {
  initRole();

  if (props.editData) {
    formData.value = {...props.editData}
  }
})
```

关联数据通过独立方法查询：

```js
function initRole() {
  queryRole().then(res => {
    roleList.value = res.data;
  })
}
```

约束：

- 一个关联数据对应一个初始化方法
- 不在模板中直接请求 API
- 不重复请求相同数据
- 页面已有公共数据时优先复用

---

## 七、提交约束

提交方法统一命名为 `submit`：

```js
function submit() {
  formRef.value.validate((err) => {
    if (err) {
      return;
    }

    const data = {...formData.value};

    submitUser(data).then(res => {
      emit('close');
    })
  });
}
```

约束：

- 提交 API 前必须进行表单校验
- 校验失败直接返回
- 提交数据从 `formData` 组装
- API 请求不自行增加 loading
- API 成功后关闭弹窗
- 不在提交方法中增加无关业务逻辑

---

## 八、新建与编辑约束

同一个弹窗页面同时支持新建和编辑。

判断规则：

```js
if (props.editData) {
  formData.value = {...props.editData}
}
```

- 无 `editData`：新建
- 有 `editData`：编辑
- 新建使用 `formData` 默认值
- 编辑使用 `editData` 初始化表单

如新建和编辑 API 不同，应根据项目现有 API 规范进行判断，不自行设计新的接口形式。

---

## 九、页面结构标准

标准结构：

```text
CommonModal
└── a-form
    ├── a-form-item
    ├── a-form-item
    ├── a-form-item
    └── ...
```

推荐页面结构：

```vue
<template>
  <CommonModal
    title="用户信息"
    :width="'600px'"
    @ok="submit"
    @close="emit('close')"
  >
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <!-- 表单项 -->
    </a-form>
  </CommonModal>
</template>

<script setup>
// import
// props / emit
// formRef
// formData
// 关联数据
// 初始化
// 提交
</script>

<style scoped>
</style>
```

---

## 十、禁止事项

- 禁止直接使用 `a-modal`
- 禁止直接修改 `props`
- 禁止使用 `computed` 做表单数据转换
- 禁止自行创建 loading
- 禁止 API 请求配合 loading
- 禁止在模板中调用 API
- 禁止重复创建已有公共组件
- 禁止自定义弹窗按钮样式
- 禁止无必要增加复杂状态管理

---

## 十一、核心规则

生成编辑弹窗页面时必须遵循：

> **CommonModal + a-form + formData + props.editData + validate + API提交 + 成功关闭**

优先保证与现有项目的 `CommonModal`、Form、API 及页面规范保持一致，不自行引入新的组件、状态管理或交互方式。