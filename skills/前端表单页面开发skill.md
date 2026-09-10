## 前端Form表单组件约束 Skill

### 一、Skill 说明
AI 创建、修改表单页面或编辑弹窗时，必须遵循本 Skill。

**核心原则：**
- 所有业务表单直接使用 Arco Design 的 `Form`、`FormItem` 及对应表单控件，不自行封装表单组件。 
- 表单布局由 `auto-label-width` 自动控制，禁止手动设置表单标签和内容区域宽度。
- 所有可输入文本的输入框必须限制最大输入长度。
- 所有必填项必须进行统一的必填校验。
- 提交前必须通过 `formRef.value.validate()` 完成表单校验。
- 本 Skill 的规范优先于 AI 的通用前端开发习惯，禁止自行发挥。


### 二、Form基础组件使用约束
表单必须直接使用 Arco Design，禁止自行封装，标准用法：
```vue
<a-form
  ref="formRef"
  :model="formData"
  autocomplete="off"
  auto-label-width
>
</a-form>
```
### 三、Form布局约束
- 必须配置 auto-label-width，用于让 Arco Design 根据表单项标签自动计算标签宽度。
- 禁止手动设置 label-col
- 禁止手动设置 wrapper-col
- 表单项不允许自行划分标签和内容区域宽度

### 四、FormRef约束
表单必须定义 `formRef`：
```js
const formRef = ref(null);
```

Form：
```vue
<a-form ref="formRef" :model="formData" auto-label-width></a-form>
```

提交等操作执行实际API请求之前，必须调用`formRef.value.validate()`进行表单验证：
```js
function onSubmit() {
  formRef.value.validate((err) => {
    if (err) {
      return;
    }

    submitUser(formData.value).then(() => {
      emit('close');
    });
  });
}
```

### 五、FormItem使用约束
- 禁止使用 placeholder
- label：显示表单项名称
- field：对应 `formData` 中的字段
- rules：表单校验规则

### 六、FormItem必填约束
业务上必填的字段，需要配置rules，标准配置：
```vue
:rules="[{ required: true, message: '必选项' }]"
```
必填校验的 `message` 必须统一使用：`必选项`，禁止使用业务字段名等其他提示语。

### 七、FormItem输入长度约束
所有用户可以输入文本的Input，必须使用 `max-length` 设置最大输入长度，标准配置：
```vue
<a-form-item label="用户名" field="username" :rules="[{ required: true, message: '必选项' }]">
  <a-input v-model="formData.username" max-length="50"/>
</a-form-item>
```

### 八、完整新建/编辑弹窗标准示例

```vue
<template>
  <CommonModal title="编辑用户信息" width="600px" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-form-item label="登录名" field="username" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.username" maxlength="50" />
      </a-form-item>

      <a-form-item label="密码" field="password" :rules="[{ required: true, message: '必选项' }]">
        <a-input-password v-model="formData.password" maxlength="100" />
      </a-form-item>

      <a-form-item label="姓名" field="name" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.name" maxlength="100"/>
      </a-form-item>

      <a-form-item label="手机号" field="phone" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.phone" maxlength="11"/>
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {ref} from "vue";
import {submitUser} from "../../../api/core/user/user.js";

const emit = defineEmits(['close']);

const props = defineProps({
  editData: { type: Object, default: () => ({}) }   // 编辑内容
});

// 表单实例
const formRef = ref(null);

// 表单数据
const formData = ref(props.editData);

// 提交
function onSubmit() {
  formRef.value.validate((err) => {
    if (err) {
      return;
    }

    submitUser(formData.value)
      .then(() => {
        emit('close');
      })
  });
}
</script>
```

# 九、核心规则
AI 生成 `sense-x-ui` 表单代码时必须牢记：

> **直接使用 Arco Design Form，不自行封装。**

> **Form 必须配置 `auto-label-width`，禁止 `label-col` 和 `wrapper-col`。**

> **文本输入框必须设置 `maxlength`。**

> **表单禁止使用 `placeholder`。**

> **必填项统一使用 `rules="[{ required: true, message: '必选项' }]"`。**

> **保存、提交前必须执行 `formRef.value.validate()`。**

> **API请求禁止配合使用loading，由框架层统一处理。**

> **本skill的规范优先于AI的通用前端开发习惯，禁止自行发挥。**