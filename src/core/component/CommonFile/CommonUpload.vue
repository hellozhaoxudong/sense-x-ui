<template>
  <div class="common-upload">
    <a-upload
        v-if="maxCount > fileList.length"
        :action="`/api/base/file/upload?businessType=${businessType}`"
        :headers="{ Authorization: token }"
        :accept="fileTypes.join(', ')"
        :show-file-list="false"
        @success="uploadSuccess"
        @error="uploadError"
    >
      <template #upload-button>
        <!--文本链接-->
        <a-link v-if="handType==='link'" icon>{{handText}}</a-link>
        <!--区域-->
        <div v-if="handType==='area'" class="hand-area">
          <icon-upload />
          <div>{{handText}}</div>
          <div v-if="fileTypes.length > 0" class="area-desc">类型限制: {{fileTypes.join('、')}}</div>
        </div>
      </template>
    </a-upload>

    <!--文件列表-->
    <div class="file-list">
      <div v-for="item in fileList" :key="item.oid" class="file-item">
        <a-link icon>{{item.fileName}}</a-link>
        <IconBtn type="danger" @click="removeFile(item)"><icon-delete :size="14" /></IconBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import IconBtn from "../CommonBtn/IconBtn.vue";
import {Message, Notification} from "@arco-design/web-vue";

const props = defineProps({
  modelValue: { type: String, default: '' },  // 文件OID
  handType: { type: String, default: 'area' },  // 上传触发抓手
  handText: { type: String, default: '点击上传' },  // 上传抓手文本
  businessType: { type: String, default: 'system' },  // 业务类型
  maxCount: { type: Number, default: 2 }, // 最大上传个数
  fileTypes: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue', 'success']);

const fileList = ref([]);

const token = ref(sessionStorage.getItem('sense.access_token'));

function uploadSuccess(fileItem){
  if (fileItem.response){
    fileList.value.push(fileItem.response);
    Message.success("文件上传成功:" + fileItem.response.fileName);

    // 更新出去
    const oids = fileList.value.map(item => item.oid).join(',');
    emit('update:modelValue', oids);
    emit('success', oids);
  }
}

function uploadError(fileItem){
  Notification.error('上传失败，请联系系统管理员')
}

// 删除文件
function removeFile(file){
  fileList.value = fileList.value.filter(item => item.oid !== file.oid);
}
</script>


<style scoped lang="scss">
.common-upload{
  width: 100%;

  :deep(.arco-upload){
    width: 100%;
  }

  // 上传按钮：区域类型
  .hand-area{
    width: 100%;
    padding: 12px 12px;
    background: rgb(247, 248, 250);
    border: 1px dashed rgb(229, 230, 235);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2px;
    box-sizing: border-box;

    font-size: 14px;
    color: #1d2129;

    // 描述
    .area-desc{
      font-size: 12px;
      color: #666;
    }
  }

  // 文件列表
  .file-list{
    display: flex;
    flex-direction: column;
    gap: 2px;

    .file-item{
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}
</style>