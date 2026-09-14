<!--通用主页面布局：左右分离结构-->
<template>
  <div class="common-page-split">
    <div class="split-div" :style="block1Css">
      <div class="page-header">
        <div class="header-title">{{title1}}</div>
      </div>
      <div class="split-content">
        <slot name="split-1"></slot>
      </div>
    </div>

    <div class="split-div" :style="block2Css">
      <div class="page-header">
        <div class="header-title">{{title2}}</div>
      </div>
      <div class="split-content">
        <slot name="split-2"></slot>
      </div>
    </div>

    <div class="split-div" :style="block3Css">
      <div class="page-header">
        <div class="header-title">{{title3}}</div>
      </div>
      <div class="split-content">
        <slot name="split-3"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">

import {onMounted, ref} from "vue";

const props = defineProps({
  title1: String,
  title2: String,
  title3: String,
  width1: { type: String, default: '360px' },  // 第一栏宽度，传入，则左侧自动计算宽度
  width2: { type: String, default: '360px' }, // 第二栏宽度，传入，则右侧自动计算宽度
})


// 第一栏样式
const block1Css = ref({});
// 第二栏样式
const block2Css = ref({});
// 第三栏样式
const block3Css = ref({});

onMounted(() => {
  if (props.width1) {
    block1Css.value = { width: props.width1 }
  }

  if (props.width2) {
    block2Css.value = { width: props.width2 }
  }

  block3Css.value = { flex: '1', minWidth: 0 }
})
</script>


<style scoped lang="scss">
.common-page-split{
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;

  .split-div{
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