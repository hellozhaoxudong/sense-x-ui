<!--通用主页面布局：Radio页面-->
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
import {ref} from "vue";

const props = defineProps({
  title1: String, // Tab1的名称
  title2: String, // Tab2的名称
  title3: String, // Tab3的名称
})

// 当前选中的Tab
const showTab = ref('Tab1');

// 切换Tab
function switchTab(tab) {
  showTab.value = tab;
}
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