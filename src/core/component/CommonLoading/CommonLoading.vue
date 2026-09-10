公共Loading组件
<template>
  <div v-if="visible" class="global-loading">
    <div class="loading-div">
      <a-spin :size="24" tip="请求中..." />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

defineExpose({
  show() {
    visible.value = true
  },
  hide() {
    visible.value = false
  }
})
</script>

<style scoped>
.global-loading {
  position: fixed;
  z-index: 9999999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  .loading-div{
    width: 120px;
    height: 120px;
    background: rgb(92 99 112 / 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>