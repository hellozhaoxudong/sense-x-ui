<template>
  <div class="app-ifm">
    <iframe v-if="app.appUrl" :src="app.appUrl" style="width: 100%; height: 100%; border: none"/>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {queryAppById} from "../../../api/core/third/third-app.js";

const route = useRoute();

const app = ref({});

onMounted(()=>{
  const appId = route.params.appId;
  initApp(appId);
})

function initApp(id){
  queryAppById({id: id}).then(res=>{
    app.value = res.data;
  })
}

</script>

<style scoped>
.app-ifm{
  width: 100%;
  height: 100%;
}

</style>