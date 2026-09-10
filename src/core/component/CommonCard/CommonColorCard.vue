<template>
  <div class="common-color-card" :style="{height: cardHeight}">
    <!--头部-->
    <div class="card-header">
      <div class="header-title">
        <slot name="icon"></slot>
        {{title}}
      </div>

      <div class="header-extra">
        <slot name="extra"></slot>
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
  cardHeight: { type: String, default: '100%' },  // 卡片整体高度是否充满屏幕
})

</script>


<style scoped lang="scss">
.common-color-card{
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #3179FF10;
  border-radius: 4px;

  // 卡片头部
  .card-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(90deg, #3179FF, #63AFFB);
    border-radius: 4px 4px 0 0;

    // 标题
    .header-title{
      padding: 8px 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #ffffff;
      font-weight: 500;

      :deep(img){
        width: 16px;
        height: 16px;
      }
    }

    .header-extra{
      width: 32px;
      height: 32px;

      :deep(img){
        width: 32px;
        height: 32px;
      }
    }
  }

  .card-content{
    width: 100%;
    flex: 1;
    min-height: 0;
    padding: 12px;
    box-sizing: border-box;
    background: linear-gradient(180deg, #63AFFB20 0%, #FFFFFF 100%);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

</style>