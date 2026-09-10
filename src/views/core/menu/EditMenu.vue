<template>
  <CommonModal title="菜单信息" :width="'560px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="所属应用" field="appName" :rules="[{ required: true }]">
        <a-input v-model="formData.appName" disabled />
      </a-form-item>
      <a-form-item label="父菜单" field="parentId">
        <a-tree-select v-model="formData.parentId" :data="[{id: '0', menuName: '根目录', children: parentMenuList}]" :field-names="{ key: 'id', title: 'menuName' }"/>
      </a-form-item>
      <a-form-item label="菜单编码" field="menuCode" :rules="[{ required: true }]">
        <a-input v-model="formData.menuCode" placeholder="请输入菜单编码" max-length="20"/>
      </a-form-item>
      <a-form-item label="菜单名称" field="menuName" :rules="[{ required: true }]">
        <a-input v-model="formData.menuName" max-length="8"/>
      </a-form-item>
      <a-form-item label="菜单图标" field="menuIcon">
        <IconSelecter v-model="formData.menuIcon"/>
      </a-form-item>
      <a-form-item label="菜单路由" field="menuPath">
        <a-input v-model="formData.menuPath" placeholder="请输入菜单路由，如 /setting/menu" max-length="50" />
      </a-form-item>

      <a-form-item label="排序号" field="sortOrder">
        <a-input-number v-model="formData.sortOrder" :min="0" style="width: 100%" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitMenu} from "../../../api/core/menu.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import IconSelecter from "./IconSelecter.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
  currentApp: { type: Object, default: () => ({}) },
  parentMenuList: { type: Array, default: () => [] },
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  parentId: "0",
  appId: props.currentApp.id,
  appName: props.currentApp.appName,
});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = {...formData.value, ...props.editData}
  }
})

// 提交
function submit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const data = {...formData.value};
    submitMenu(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
