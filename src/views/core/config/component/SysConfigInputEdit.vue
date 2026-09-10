<template>
  <CommonModal title="编辑配置">

  </CommonModal>
</template>

<script setup>
import CommonModal from "../../../../core/component/CommonModal/CommonModal.vue";

const props = defineProps({
  configName: String,
  configKey: String,
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
    min-width: 220px;
  }

  .config-value{
    flex: 1;
  }
}
</style>