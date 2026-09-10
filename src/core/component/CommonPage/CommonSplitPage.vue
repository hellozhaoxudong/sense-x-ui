<!--通用主页面布局：左右分离结构-->
<template>
  <div class="common-page-split">
    <div class="split-left" :style="leftCss">
      <div class="page-header">

        <div class="header-title">{{leftTitle}}</div>
      </div>
      <div class="split-content">
        <slot name="left"></slot>
      </div>
    </div>

    <div class="split-right" :style="rightCss">
      <div class="page-header" v-if="rightTitle">

        <div class="header-title">{{rightTitle}}</div>
      </div>
      <div class="split-content">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">

import {onMounted, ref} from "vue";

const props = defineProps({
  leftTitle: String,
  leftIcon: String,
  rightTitle: String,
  rightIcon: String,
  rightWidth: { type: String, default: '500px' },  // 右侧宽度，传入，则左侧自动计算宽度
  leftWidth: { type: String, default: '' }, // 左侧宽度，传入，则右侧自动计算宽度
})


// 左侧样式
const leftCss = ref({});
// 右侧样式
const rightCss = ref({});

onMounted(() => {
  if (props.leftWidth) {
    leftCss.value = { width: props.leftWidth }
    rightCss.value = { flex: '1', minWidth: 0 };
  } else if (props.rightWidth) {
    rightCss.value = { width: props.rightWidth }
    leftCss.value = { flex: '1', minWidth: 0 }
  }
})
</script>


<style scoped lang="scss">
.common-page-split{
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;

  // 左侧
  .split-left{
    height: 100%;
    background-color: white;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // 右侧
  .split-right{
    height: 100%;
    background-color: white;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  }



  // 内容
  .split-content{
    width: 100%;
    flex: 1;
    min-height: 0;

    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

// 页面头部
.page-header{
  display: flex;
  gap: 4px;
  align-items: center;

  .header-title{
    font-size: 16px;
    font-weight: 500;
    color: #1D2129;
  }

  img{
    width: 16px;
    height: 16px;
  }
}
</style>