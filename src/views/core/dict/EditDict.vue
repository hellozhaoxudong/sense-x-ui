<template>
  <CommonModal title="编辑字典" :width="'450px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="字典名称" field="dictName" :rules="[{ required: true, message: '请输入字典名称' }]">
        <a-input v-model="formData.dictName" placeholder="请输入字典名称" />
      </a-form-item>
      <a-form-item label="字典编码" field="dictCode" :rules="[{ required: true, message: '请输入字典编码' }]">
        <a-input v-model="formData.dictCode" placeholder="请输入字典编码" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitDict} from "../../../api/base/dict.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);
const formData = ref({});

onMounted(()=>{
  formData.value = {...props.editData};
})

function submit(){
  formRef.value.validate((err)=>{
    if (err) return;
    submitDict({...formData.value}).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
