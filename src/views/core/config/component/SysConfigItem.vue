<template>
  <div class="sys-config-item">
    <div class="config-name">{{configName}}</div>
    <div class="config-value">
      <slot />
    </div>

    <TextBtns>
      <slot name="operation" />
    </TextBtns>
  </div>
</template>

<script setup>

import TextBtns from "../../../../core/component/CommonBtn/TextBtns.vue";

const props = defineProps({
  configName: String,
})
</script>


<style scoped>
.sys-config-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #266FFF0D;
  padding: 12px;

  .config-name{
    min-width: 120px;
    text-align: right;
  }

  .config-value{
    flex: 1;
  }
}
</style>