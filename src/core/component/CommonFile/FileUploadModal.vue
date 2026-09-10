<template>
  <CommonModal :title="`上传文件: ${UploadOptions.options.businessType}`" @ok="ok" @close="close">
    <CommonUpload
        v-model="oids"
        :business-type="UploadOptions.options.businessType"
        :file-types="UploadOptions.options.fileTypes"
        :max-count="UploadOptions.options.maxCount"
    />
  </CommonModal>
</template>

<script setup>
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CommonUpload from "../../../core/component/CommonFile/CommonUpload.vue";
import {UploadOptions} from "./uploadFile.js";
import {ref} from "vue";

const oids = ref('');

function ok(){
  UploadOptions.resolve?.(oids.value)
  UploadOptions.open = false
}

function close() {
  UploadOptions.reject?.()
  UploadOptions.open = false
}
</script>


<style scoped>
</style>