<template>
  <RouterView/>

  <!--全局文件上传组件-->
  <FileUploadModal v-if="UploadOptions.open"/>

  <!--全局Loading组件-->
  <CommonLoading ref="loadingRef" />
</template>
<script setup>
import FileUploadModal from "./core/component/CommonFile/FileUploadModal.vue";
import {UploadOptions} from "./core/component/CommonFile/uploadFile.js";
import CommonLoading from "./core/component/CommonLoading/CommonLoading.vue";
import {onMounted, ref} from "vue";
import {setLoadingInstance} from "./utils/loading.js";

const loadingRef = ref();

onMounted(() => {
  setLoadingInstance(loadingRef);

})

</script>

<style scoped>

</style>
