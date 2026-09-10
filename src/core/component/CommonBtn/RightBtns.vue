<template>
  <div class="right-btns">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>
.right-btns{
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
}
</style>