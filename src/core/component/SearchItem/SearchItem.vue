<template>
  <div class="search-item">
    <div class="search-label">{{ label }}：</div>
    <div class="search-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' }
})
</script>

<style scoped lang="scss">
.search-item{
  width: 20%;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap; // 禁止换航
  padding-right: 12px;
  box-sizing: border-box;

  .search-label{
    width: 80px;
    text-align: end;
  }
  .search-content{
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>