<template>
  <div class="common-title">
    <div class="title">{{title}}</div>
  </div>
</template>

<script setup lang="js">
const props = defineProps({
  title: { type: String, default: '' }
})
</script>


<style scoped lang="scss">
.common-title{
  .title{
    font-size: 16px;
    color: rgb(29, 33, 41);
    font-weight: 500;
    margin-bottom: 10px;
    margin-top: 10px;
    border-left: 8px solid #165dff;
    padding-left: 10px;
  }
}
</style>
