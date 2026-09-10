<template>
  <CommonModal title="应用信息" :width="'560px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="应用编码" field="appCode" :rules="[{ required: true }]">
        <a-input v-model="formData.appCode" max-length="20"/>
      </a-form-item>
      <a-form-item label="应用名称" field="appName" :rules="[{ required: true }]">
        <a-input v-model="formData.appName" max-length="4" />
      </a-form-item>
      <a-form-item label="应用图标" field="appIcon">
        <IconSelecter v-model="formData.appIcon"/>
      </a-form-item>
      <a-form-item label="排序号" field="sortOrder">
        <a-input-number v-model="formData.sortOrder" :min="0" style="width: 100%" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitApp} from "../../../api/core/menu.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import IconSelecter from "./IconSelecter.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) }
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = {...props.editData}
  }
})

// 提交
function submit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const data = {...formData.value};
    submitApp(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
