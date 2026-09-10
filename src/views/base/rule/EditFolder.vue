<template>
  <CommonModal :title="formData.id ? '编辑分类' : '新建分类'" :width="'450px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="分类名称" field="folderName" :rules="[{ required: true, message: '请输入分类名称' }]">
        <a-input v-model="formData.folderName" placeholder="请输入分类名称" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitRuleFolder} from "../../../api/base/rule.js";
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
    submitRuleFolder({...formData.value}).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
