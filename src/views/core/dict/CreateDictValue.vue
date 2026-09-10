<template>
  <CommonModal title="新建字典值" :width="'450px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="字典编码" field="dictCode">
        <a-input v-model="formData.dictCode" disabled />
      </a-form-item>
      <a-form-item label="字典值编码" field="valueCode" :rules="[{ required: true, message: '请输入字典值编码' }]">
        <a-input v-model="formData.valueCode" placeholder="请输入字典值编码" />
      </a-form-item>
      <a-form-item label="字典值名称" field="valueName" :rules="[{ required: true, message: '请输入字典值名称' }]">
        <a-input v-model="formData.valueName" placeholder="请输入字典值名称" />
      </a-form-item>
      <a-form-item label="排序" field="sort">
        <a-input-number v-model="formData.sort" placeholder="请输入排序号" :min="0" :step="1" style="width: 100%" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch v-model="formData.status" checkedValue="Y" unCheckedValue="N" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitDictValue} from "../../../api/base/dict.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  dictCode: { type: String, default: '' },
});

const formRef = ref(null);
const formData = ref({
  status: 'Y',
  sort: 0,
});

onMounted(()=>{
  formData.value.dictCode = props.dictCode;
})

function submit(){
  formRef.value.validate((err)=>{
    if (err) return;
    submitDictValue({...formData.value}).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
