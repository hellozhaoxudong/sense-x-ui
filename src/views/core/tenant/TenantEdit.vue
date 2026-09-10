<template>
  <CommonModal :title="editData.id ? '编辑租户' : '新建租户'" :width="'800px'" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-row :gutter="12">
        <a-col :span="12">
          <a-form-item label="租户编码" field="tenantCode" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.tenantCode" maxlength="50" />
          </a-form-item>
          <a-form-item label="租户名称" field="tenantName" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.tenantName" maxlength="100" />
          </a-form-item>
          <a-form-item label="公司名称" field="companyName">
            <a-input v-model="formData.companyName" maxlength="100" />
          </a-form-item>
          <a-form-item label="用户上限" field="userLimit">
            <a-input-number v-model="formData.userLimit" :min="0" :step="1" style="width: 100%" />
          </a-form-item>
          <a-form-item label="到期时间" field="expirationDate">
            <a-date-picker v-model="formData.expirationDate" style="width: 100%" />
          </a-form-item>
          <a-form-item label="是否启用" field="enabled">
            <a-switch v-model="formData.enabled" :checked-value="1" :unchecked-value="0" />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="!editData.id">
          <a-form-item label="管理员登录名" field="adminUser.username" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.adminUser.username" maxlength="50" />
          </a-form-item>
          <a-form-item label="管理员密码" field="adminUser.password" :rules="[{ required: true, message: '必选项' }]">
            <a-input-password v-model="formData.adminUser.password" maxlength="50" />
          </a-form-item>
          <a-form-item label="管理员电话" field="adminUser.phone" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.adminUser.phone" maxlength="20" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {createTenant, submitTenant} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  enabled: 1,
  adminUser: {}
});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = { ...props.editData };
  }
  if (formData.value.enabled === 'Y'){
    formData.value.enabled = 1;
  } else if (formData.value.enabled === 'N'){
    formData.value.enabled = 0;
  }
  if (formData.value.enabled === undefined || formData.value.enabled === null){
    formData.value.enabled = 1;
  }
  if (!formData.value.adminUser){
    formData.value.adminUser = {};
  }
})

// 提交
function onSubmit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const data = {...formData.value};

    const request = props.editData && props.editData.id ? submitTenant(data) : createTenant(data);
    request.then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
