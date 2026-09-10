<!--通用主页面布局：多选择页面-->
<template>
  <div class="common-page">
    <!--切换-->
    <div class="page-radios">
      <a-button v-if="title1" shape="round" style="min-width: 90px" @click="switchTab('Tab1')" :type="showTab==='Tab1'?'primary':'secondary'">{{title1}}</a-button>
      <a-button v-if="title2" shape="round" style="min-width: 90px" @click="switchTab('Tab2')" :type="showTab==='Tab2'?'primary':'secondary'">{{title2}}</a-button>
      <a-button v-if="title3" shape="round" style="min-width: 90px" @click="switchTab('Tab3')" :type="showTab==='Tab3'?'primary':'secondary'">{{title3}}</a-button>
    </div>

    <!--内容-->
    <div class="page-content">
      <slot name="tab1" v-if="showTab==='Tab1'"></slot>
      <slot name="tab2" v-if="showTab==='Tab2'"></slot>
      <slot name="tab3" v-if="showTab==='Tab3'"></slot>
    </div>
  </div>
</template>

<script setup lang="js">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  title1: String, // Tab1的名称
  title2: String, // Tab2的名称
  title3: String, // Tab3的名称
})

// 当前选中的Tab
const showTab = ref('');

// 切换Tab
function switchTab(tab) {
  // 缓存选中状态
  sessionStorage.setItem("COMMON-PAGE-RADIO:" + route.path, tab);

  showTab.value = tab;
  // 向路由中添加_show
  router.replace({
    query: { ...route.query, _show: tab}
  })
}

onMounted(() => {
  const cacheTab = sessionStorage.getItem("COMMON-PAGE-RADIO:" + route.path);
  if (cacheTab){
    showTab.value = cacheTab;
  } else {
    showTab.value = 'Tab1';
  }
})

watch(() => route.query._show, (val) => {
  if (route.query._show) {
    showTab.value = val || 'Tab1';
    sessionStorage.setItem("COMMON-PAGE-RADIO:" + route.path, showTab.value);
  }
}
)
</script>


<style scoped lang="scss">
.common-page{
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;


  // 选择页签
  .page-radios{
    display: flex;
    align-items: center;
    gap: 8px;

    :deep(.arco-btn-secondary){
      font-weight: bold;
      color: #1D2129;
    }
    :deep(.arco-btn-primary){
      font-weight: bold;
      color: #ffffff;
    }
  }

  // 内容
  .page-content{
    width: 100%;
    flex: 1;
    min-height: 0;
  }
}
</style>