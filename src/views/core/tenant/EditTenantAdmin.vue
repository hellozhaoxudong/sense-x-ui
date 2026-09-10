<template>
  <CommonModal title="租户管理员" width="650px" @ok="onSubmit" @close="emit('close')">
    <a-descriptions title="" bordered :column="1" size="large">
      <a-descriptions-item label="管理员登录名">
        <a-input v-model="formData.username" maxlength="50" />
      </a-descriptions-item>
      <a-descriptions-item label="管理员姓名">
        {{formData.name}}
      </a-descriptions-item>
      <a-descriptions-item label="管理员密码">
        <a-input-password v-model="formData.password" maxlength="50" />
      </a-descriptions-item>
      <a-descriptions-item label="管理员电话">
        <a-input v-model="formData.phone" maxlength="20" />
      </a-descriptions-item>
    </a-descriptions>
  </CommonModal>
</template>

<script setup>
import { ref, watch} from "vue";
import {queryTenantAdminUser, submitUser} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(['close'])
const props = defineProps({
  tenantId: String, // 租户ID
});

const formData = ref({});

watch(() => props.tenantId, () => {
  initTenantAdminUser();
}, { immediate: true });

function initTenantAdminUser(){
  if (!props.tenantId){
    return;
  }

  formData.value = {};
  queryTenantAdminUser({tenantId: props.tenantId}).then(res => {
    formData.value = res.data;
  });
}

// 提交
function onSubmit(){
  if (!formData.value.username || !formData.value.phone) {
    Message.error('请填写完整');
    return;
  }

  submitUser({ ...formData.value }).then(()=>{
    Message.success('保存成功');
    emit('close');
  })
}
</script>

<style scoped>
</style>
