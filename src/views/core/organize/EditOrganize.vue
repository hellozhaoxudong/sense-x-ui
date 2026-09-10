<template>
  <CommonModal title="组织部门" :width="'600px'" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="上级部门" field="parentId" :rules="[{ required: true, message: '请选择上级部门' }]">
        <a-tree-select
            v-model="formData.parentId"
            :data="organizeTreeData"
            :field-names="{
              key: 'id',
              title: 'organizeName',
              children: 'children'
            }"
            allow-search
            style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="部门编码" field="organizeCode" :rules="[{ required: true, message: '请输入部门编码' }]">
        <a-input v-model="formData.organizeCode" placeholder="请输入部门编码" />
      </a-form-item>
      <a-form-item label="部门名称" field="organizeName" :rules="[{ required: true, message: '请输入部门名称' }]">
        <a-input v-model="formData.organizeName" placeholder="请输入部门名称" />
      </a-form-item>
      <a-form-item label="排序号" field="sortNum" :rules="[{ required: true, message: '请输入排序号' }]">
        <a-input-number v-model="formData.sortNum" placeholder="请输入排序号" :min="0" :step="1" style="width: 100%" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {submitOrganize} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close']);
const props = defineProps({
  editData: { type: Object, default: {}}, // 编辑信息
  tree: { type: Array, default: () => [] } // 组织树
})

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  parentId: '0',
  sortNum: 0,
});

const organizeTreeData = ref([
  { id: '0', organizeName: '根目录', children: [...props.tree] }
])

onMounted(()=>{
  if (props.editData){
    formData.value = { ...formData.value, ...props.editData }
    if (formData.value.parentId === undefined || formData.value.parentId === null){
      formData.value.parentId = 0;
    }
    if (formData.value.sortNum === undefined || formData.value.sortNum === null){
      formData.value.sortNum = 0;
    }
  }
})

function submit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }
    submitOrganize({...formData.value}).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>