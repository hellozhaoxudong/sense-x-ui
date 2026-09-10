<template>
  <CommonModal title="用户信息" :width="'600px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-form-item label="登录名" field="username" :rules="[{ required: true, message: '请输入登录名' }]">
        <a-input v-model="formData.username" placeholder="请输入登录名" autocomplete="new-password"/>
      </a-form-item>
      <a-form-item label="密码" field="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model="formData.password" placeholder="请输入密码" autocomplete="new-password"/>
      </a-form-item>
      <a-form-item label="手机号" field="phone" :rules="[{ required: true, message: '请输入手机号' }]">
        <a-input v-model="formData.phone" placeholder="请输入手机号" maxlength="11" />
      </a-form-item>
      <a-form-item label="姓名" field="name" :rules="[{ required: true, message: '请输入姓名' }]">
        <a-input v-model="formData.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="邮箱" field="email" :rules="[{ required: true, message: '请输入邮箱' }]">
        <a-input v-model="formData.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="性别" field="sex" :rules="[{ required: true, message: '请选择性别' }]">
        <a-radio-group v-model="formData.sex">
          <a-radio value="M">男</a-radio>
          <a-radio value="W">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否启用" field="enabled" :rules="[{ required: true, message: '请选择是否启用' }]">
        <a-switch v-model="formData.enabled" checkedValue="Y" unCheckedValue="N" />
      </a-form-item>
      <a-form-item label="角色" field="roleIds" :rules="[{ required: true, message: '请选择角色' }]">
        <a-checkbox-group v-model="formData.roleIds">
          <a-checkbox :value="item.id" v-for="item in roleList" :key="item.id">{{item.roleName}}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {queryRole, submitUser} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: {} }, // 编辑信息
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  sex: 'M',
  enabled: 'Y',
  roleIds: []
});

// 角色信息
const roleList = ref([]);

onMounted(()=>{
  initRole();

  if (props.editData){
    formData.value = {...props.editData}
  }
})


function initRole(){
  queryRole().then(res=>{
    roleList.value = res.data;
  })
}

// 提交
function submit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    // 组装数据
    const data = {...formData.value};
    submitUser(data).then(res=>{
      emit('close');
    })
  });
}
</script>


<style scoped>

</style>