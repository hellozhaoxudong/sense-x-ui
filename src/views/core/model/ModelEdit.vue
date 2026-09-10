<template>
  <CommonModal :title="editData.id ? '编辑模型' : '新建模型'" :width="'600px'" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-form-item label="模型类型" field="modelType" :rules="[{ required: true, message: '必选项' }]">
        <a-select v-model="formData.modelType">
          <a-option value="Chat">Chat</a-option>
          <a-option value="Embedding">Embedding</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="模型标题" field="modelTitle" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.modelTitle" maxlength="100" />
      </a-form-item>
      <a-form-item label="模型名称" field="modelName" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.modelName" maxlength="100" />
      </a-form-item>
      <a-form-item label="调用地址" field="baseUrl" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.baseUrl" maxlength="500" />
      </a-form-item>
      <a-form-item label="API Key" field="apiKey" :rules="[{ required: true, message: '必选项' }]">
        <a-input-password v-model="formData.apiKey" maxlength="500" />
      </a-form-item>
      <a-form-item label="是否启用" field="enable" :rules="[{ required: true, message: '必选项' }]">
        <a-switch v-model="formData.enable" checked-value="Y" unchecked-value="N">
          <template #checked>启用</template>
          <template #unchecked>停用</template>
        </a-switch>
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { submitModel } from "../../../api/core/agent/model.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  editData: { type: Object, default: () => ({}) }
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  modelType: "",
  modelTitle: "",
  modelName: "",
  baseUrl: "",
  apiKey: "",
  enable: "Y"
});

onMounted(() => {
  if (props.editData && props.editData.id) {
    formData.value = {
      ...formData.value,
      ...props.editData
    };
  }
});

// 提交
function onSubmit() {
  formRef.value.validate(err => {
    if (err) {
      return;
    }

    const data = { ...formData.value };
    submitModel(data)
        .then(() => {
          emit("close");
        });
  });
}
</script>

<style scoped>
</style>
