<template>
  <CommonModal title="分配角色" :width="'500px'" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-form-item label="角色" field="roleIds" :rules="[{ required: true, message: '必选项' }]">
        <a-checkbox-group v-model="formData.roleIds">
          <a-checkbox :value="item.id" v-for="item in roleList" :key="item.id">{{item.roleName}}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {distributeUserRole, queryRole} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(['close', 'success'])
const props = defineProps({
  userData: { type: Object, default: () => ({}) }
});

const formRef = ref(null);

// 待提交信息
const formData = ref({
  roleIds: []
});

// 角色信息
const roleList = ref([]);

onMounted(()=>{
  initRole();

  if (props.userData && props.userData.roleIds){
    formData.value.roleIds = [...props.userData.roleIds];
  }
})

function initRole(){
  queryRole().then(res=>{
    roleList.value = res.data || [];
  })
}

// 提交
function onSubmit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const userId = props.userData && props.userData.id;
    if (!userId){
      return;
    }

    distributeUserRole(userId, formData.value.roleIds).then(()=>{
      Message.success('角色分配成功');
      emit('close');
      emit('success');
    })
  });
}
</script>

<style scoped>
</style>
