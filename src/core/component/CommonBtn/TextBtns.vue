<template>
  <div class="text-btns">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.text-btns{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  :deep(div){
    color: #165DFF;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .common-text-btn :deep(div:hover){
    color: #409EFF;
  }
}
</style>