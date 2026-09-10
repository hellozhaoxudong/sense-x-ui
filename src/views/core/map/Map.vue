<template>
  <div id="container" class="map">
  </div>

  <MonitorView v-if="showMonitor" @close="showMonitor = false"/>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import {onMounted, onUnmounted, ref} from "vue";
import {addMonitorMarker} from "./utils/MapUtils.js";
import MonitorView from "./components/MonitorView.vue";

let mapIns = null;

const showMonitor = ref(false);

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "d15ff84b588821a1ca9241b2a5fb66d2",
  };

  AMapLoader.load({
    key: "c19c51a9ed5e397fcc7cb2898d1f85d1",
    version: "2.0",
    plugins: ["AMap.Scale"],
  })
      .then((AMap) => {
        mapIns = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [116.397428, 39.90923], // 初始化地图中心点位置
        });


        addMonitorMarker(mapIns, [116.397428, 39.90923], 1001,'海康威视0001', '在线', ['更新日期：2022-01-01', '建立日期：22222'], onShowMonitor);
      })
      .catch((e) => {
        console.log(e);
      });
});

// 弹窗展示
function onShowMonitor(markId){
  console.log(markId);
  showMonitor.value = true;
}

onUnmounted(() => {
  mapIns?.destroy();
});
</script>


<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>