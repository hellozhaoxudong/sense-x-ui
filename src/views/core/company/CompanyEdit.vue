<template>
  <CommonModal :title="editData.id ? '编辑企业' : '新建企业'" :width="'650px'" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="企业名称" field="companyName" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.companyName" maxlength="100" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="企业编码" field="companyCode" :rules="[{ required: true, message: '必选项' }]">
            <a-input v-model="formData.companyCode" maxlength="50" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="统一社会信用代码" field="socialCreditCode">
            <a-input v-model="formData.socialCreditCode" maxlength="50" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="法人" field="legalPerson">
            <a-input v-model="formData.legalPerson" maxlength="50" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="联系人" field="contactName">
            <a-input v-model="formData.contactName" maxlength="50" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系电话" field="contactPhone">
            <a-input v-model="formData.contactPhone" maxlength="20" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="省份" field="province">
            <a-input v-model="formData.province" maxlength="50" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="城市" field="city">
            <a-input v-model="formData.city" maxlength="50" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="详细地址" field="address">
        <a-input v-model="formData.address" maxlength="200" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch v-model="formData.status" :checked-value="1" :unchecked-value="0" />
      </a-form-item>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitCompany} from "../../../api/base/company.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  status: 1,
});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = { ...props.editData };
  }
  if (formData.value.status === undefined || formData.value.status === null){
    formData.value.status = 1;
  }
})

// 提交
function onSubmit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const data = {...formData.value};
    submitCompany(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
