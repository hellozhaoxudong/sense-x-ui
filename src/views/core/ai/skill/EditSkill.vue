<template>
  <CommonModal :title="formData.id ? '编辑技能' : '新建技能'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" layout="horizontal" auto-label-width>
      <a-form-item label="技能名称" field="skillName" :rules="[{ required: true, message: '请输入技能名称' }]">
        <a-input v-model="formData.skillName" placeholder="请输入技能名称" />
      </a-form-item>
      <a-form-item label="技能图标" field="skillIcon" :rules="[{ required: true, message: '请输入技能图标' }]">
        <a-input v-model="formData.skillIcon" placeholder="请输入技能图标" />
      </a-form-item>
      <a-form-item label="技能描述" field="skillDesc">
        <a-textarea v-model="formData.skillDesc" placeholder="请输入技能描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
      </a-form-item>
      <a-form-item label="标签" field="skillTag" :rules="[{ required: true, message: '请输入标签' }]">
        <a-input v-model="formData.skillTag" placeholder="请输入标签" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CommonModal from "../../../../core/component/CommonModal/CommonModal.vue";
import {submitSkill} from "../../../../api/core/ai/skill.js";

const emit = defineEmits(['close']);
const props = defineProps({
  editData: { type: Object, default: () => ({}) }
});

const formRef = ref(null);

const formData = ref({
  skillName: '',
  skillIcon: '',
  skillDesc: '',
  skillTag: '',
});

onMounted(() => {
  if (props.editData && props.editData.id) {
    formData.value = { ...formData.value, ...props.editData };
  }
});

function submit() {
  formRef.value.validate((err) => {
    if (err) return;
    const data = { ...formData.value };
    submitSkill(data).then(() => {
      emit('close');
    });
  });
}
</script>

<style scoped>
</style>
