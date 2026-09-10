<template>
  <div class="icon-btn" :style="{color: colorMap[type]}">
    <slot></slot>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  type: { type: String, default: 'primary' },
})

const colorMap = ref({
  primary: '#1d2129',
  danger: '#ea520d',
})
</script>

<style scoped>
.icon-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;

  &:hover{
    background-color: rgb(229, 230, 235);
    border-radius: 2px;
  }
}
</style>