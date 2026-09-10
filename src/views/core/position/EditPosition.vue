<template>
  <CommonModal :title="formData.id ? '编辑岗位' : '新建岗位'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" layout="horizontal" auto-label-width>
      <a-form-item label="岗位编码" field="postCode" :rules="[{ required: true, message: '请输入岗位编码' }]">
        <a-input v-model="formData.postCode" placeholder="请输入岗位编码" />
      </a-form-item>
      <a-form-item label="岗位名称" field="postName" :rules="[{ required: true, message: '请输入岗位名称' }]">
        <a-input v-model="formData.postName" placeholder="请输入岗位名称" />
      </a-form-item>
      <a-form-item label="岗位简称" field="postShortName">
        <a-input v-model="formData.postShortName" placeholder="请输入岗位简称" />
      </a-form-item>
      <a-form-item label="岗位职级" field="postRank">
        <a-input v-model="formData.postRank" placeholder="请输入岗位职级" />
      </a-form-item>
      <a-form-item label="岗位序列" field="postSequence">
        <a-input v-model="formData.postSequence" placeholder="请输入岗位序列" />
      </a-form-item>
      <a-form-item label="编制人数" field="employeeCount">
        <a-input-number v-model="formData.employeeCount" placeholder="请输入编制人数" :min="0" style="width: 100%" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch v-model="formData.status" checked-value="Y" unchecked-value="N" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitPosition} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);

const formData = ref({
  postCode: '',
  postName: '',
  postShortName: '',
  postRank: '',
  postSequence: '',
  employeeCount: null,
  status: 'Y',
});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = {...props.editData}
  }
})

function submit(){
  formRef.value.validate((err)=>{
    if (err) return;
    const data = {...formData.value};
    submitPosition(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
