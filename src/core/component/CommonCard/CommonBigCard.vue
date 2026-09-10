<template>
  <div :class="['common-big-card', { border: border }]" :style="{height: cardHeight}">
    <!--头部-->
    <div :class="['card-header', { dark: darkHeader}]">
      <div class="header-title">
        <slot name="icon"></slot>
        {{title}}
      </div>
    </div>

    <!--内容-->
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: { type: String, default: '' },
  border: { type: Boolean, default: true },  // 是否带边框
  darkHeader: { type: Boolean, default: false },  // 标题暗色主题
  cardHeight: { type: String, default: '100%' },  // 卡片整体高度是否充满屏幕
})

</script>


<style scoped lang="scss">
.common-big-card{
  width: 100%;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &.border{
    border: 1px solid #0337D020;
  }

  // 卡片头部
  .card-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(230, 230, 230, 0.8);
    padding: 6px;
    box-sizing: border-box;
    color: rgb(29, 33, 41);

    // 黑色主题
    &.dark{
      background-color: #165dff;
      color: white;
    }

    // 标题
    .header-title{
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;

      font-weight: 500;

      :deep(img){
        width: 16px;
        height: 16px;
      }
    }
  }

  .card-content{
    width: 100%;
    flex: 1;
    min-height: 0;
    background-color: white;
    padding: 8px;
    box-sizing: border-box;
  }
}

</style>