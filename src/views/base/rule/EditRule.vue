<template>
  <CommonModal :title="formData.id ? '编辑规则' : '新建规则'" width="900px" height="auto" @ok="submit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width show-colon>
      <a-form-item label="规则编码" field="ruleCode" :rules="[{ required: true, message: '请输入规则编码' }]">
        <a-input v-model="formData.ruleCode" />
      </a-form-item>
      <a-form-item label="规则名称" field="ruleName" :rules="[{ required: true, message: '请输入规则名称' }]">
        <a-input v-model="formData.ruleName" />
      </a-form-item>
      <CodeEditor init-language="Aviator" v-model="formData.editContent" style="height: 400px"/>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitRule} from "../../../api/base/rule.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CodeEditor from "../../../core/component/CommonEditor/CodeEditor.vue";

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
    submitRule({...formData.value}).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
