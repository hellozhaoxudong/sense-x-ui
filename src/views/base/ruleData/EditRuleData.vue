<template>
  <CommonModal :title="formData.id ? '编辑规则数据' : '新建规则数据'" :width="'500px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="数据编码" field="dataCode" :rules="[{ required: true, message: '请输入数据编码' }]">
        <a-input v-model="formData.dataCode" placeholder="请输入数据编码，脚本中通过该编码获取数据" />
      </a-form-item>
      <a-form-item label="数据名称" field="dataName" :rules="[{ required: true, message: '请输入数据名称' }]">
        <a-input v-model="formData.dataName" placeholder="请输入数据名称" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitRuleData} from "../../../api/base/ruleData.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);
const formData = ref({});

onMounted(() => {
  formData.value = { ...props.editData };
})

function submit() {
  formRef.value.validate((err) => {
    if (err) return;
    submitRuleData({ ...formData.value }).then(() => {
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
