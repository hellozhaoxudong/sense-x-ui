<template>
  <div class="third-apps">
    <AppCard v-for="item in apps" :title="item.appTitle">
      <div>
        {{item.appDesc}}
      </div>
      <template #operation>
        <a @click="handleClick(item.id)">进入</a>
      </template>
    </AppCard>
  </div>
</template>
<script setup>

import {onMounted, ref} from "vue";
import {queryThirdApp} from "../../../api/core/third/third-app.js";
import {useRouter} from "vue-router";
import AppCard from "./AppCard.vue";

const router = useRouter();

const apps = ref([]);

onMounted(()=>{
  initApps();
})

function initApps(){
  queryThirdApp().then(res=>{
    apps.value = res.data;
  })
}

function handleClick(id) {
  router.push({
    name: 'ThirdIfm',
    params: {
      appId: id
    }
  })
}
</script>

<style scoped>
.third-apps{
  width: 100%;
  height: 100%;
  padding: 14px;

  background-color: #F0F4FD;
  display: grid;
  align-content: start;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
</style>