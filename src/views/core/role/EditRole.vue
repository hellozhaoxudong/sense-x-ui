<template>
  <CommonModal title="角色信息" :width="'500px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="角色编码" field="roleCode" :rules="[{ required: true, message: '请输入角色编码' }]">
        <a-input v-model="formData.roleCode" placeholder="请输入角色编码" />
      </a-form-item>
      <a-form-item label="角色名称" field="roleName" :rules="[{ required: true, message: '请输入角色名称' }]">
        <a-input v-model="formData.roleName" placeholder="请输入角色名称" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitRole} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: {} }, // 编辑信息
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
});

onMounted(()=>{
  if (props.editData){
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
    submitRole(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>

