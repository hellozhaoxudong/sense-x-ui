<template>
  <CommonModal :title="editData.id ? '编辑通知' : '新建通知'" :width="'700px'" @ok="onSubmit" @close="emit('close')">
    <a-form ref="formRef" :model="formData" autocomplete="off" auto-label-width>
      <a-form-item label="标题" field="noticeTitle" :rules="[{ required: true, message: '必选项' }]">
        <a-input v-model="formData.noticeTitle" maxlength="100" />
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="类型" field="noticeType" :rules="[{ required: true, message: '必选项' }]">
            <a-select v-model="formData.noticeType">
              <a-option value="通知">通知</a-option>
              <a-option value="公告">公告</a-option>
              <a-option value="系统消息">系统消息</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="级别" field="noticeLevel" :rules="[{ required: true, message: '必选项' }]">
            <a-select v-model="formData.noticeLevel">
              <a-option value="普通">普通</a-option>
              <a-option value="重要">重要</a-option>
              <a-option value="紧急">紧急</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="状态" field="noticeStatus" :rules="[{ required: true, message: '必选项' }]">
            <a-select v-model="formData.noticeStatus">
              <a-option value="草稿">草稿</a-option>
              <a-option value="已发布">已发布</a-option>
              <a-option value="已下线">已下线</a-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="摘要" field="noticeSummary">
        <a-textarea v-model="formData.noticeSummary" maxlength="200" show-word-limit :auto-size="{ minRows: 2, maxRows: 4 }" />
      </a-form-item>
      <a-form-item label="内容" field="noticeContent">
        <a-textarea v-model="formData.noticeContent" maxlength="2000" :auto-size="{ minRows: 4, maxRows: 8 }" />
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="发布时间" field="publishDate">
            <a-date-picker v-model="formData.publishDate" show-time style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="过期时间" field="expireDate">
            <a-date-picker v-model="formData.expireDate" show-time style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="是否置顶" field="showTop">
            <a-switch v-model="formData.showTop" checkedValue="Y" unCheckedValue="N" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否弹窗" field="showModal">
            <a-switch v-model="formData.showModal" checkedValue="Y" unCheckedValue="N" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {submitNotice} from "../../../api/base/notice.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";

const emit = defineEmits(['close'])
const props = defineProps({
  editData: { type: Object, default: () => ({}) },
});

const formRef = ref(null);

// 待编辑信息
const formData = ref({
  noticeStatus: '草稿',
  noticeLevel: '普通',
  showTop: 'N',
  showModal: 'N',
});

onMounted(()=>{
  if (props.editData && props.editData.id){
    formData.value = { ...props.editData };
  }
  if (!formData.value.noticeStatus) formData.value.noticeStatus = '草稿';
  if (!formData.value.noticeLevel) formData.value.noticeLevel = '普通';
  if (!formData.value.showTop) formData.value.showTop = 'N';
  if (!formData.value.showModal) formData.value.showModal = 'N';
})

// 提交
function onSubmit(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    const data = {...formData.value};
    submitNotice(data).then(()=>{
      emit('close');
    })
  });
}
</script>

<style scoped>
</style>
