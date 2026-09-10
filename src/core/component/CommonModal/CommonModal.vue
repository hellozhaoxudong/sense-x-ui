<template>
  <a-modal :visible="true" title-align="start" :unmount-on-close="true" :mask-closable="false" modal-class="common-modal" :width="width" @cancel="emit('close')">
    <template #title>
      <div class="modal-header">
        <div>{{ title }}</div>
      </div>
    </template>

    <div>
      <slot></slot>
    </div>

    <template #footer>
      <a-button v-if="cancelText" @click="emit('close')">{{cancelText}}</a-button>
      <a-button v-if="okText" type="primary" :loading="loading" @click="emit('ok')">{{okText}}</a-button>
      <div></div>
    </template>
  </a-modal>
</template>

<script setup>
const emit = defineEmits(['ok', 'close']);

const props = defineProps({
  visible: { type: Boolean, default: true },
  title: { type: String, default: '编辑' },
  icon: { type: String, default: 'ICON_EDIT' },
  okText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  loading: { type: Boolean, default: false },
  width: { type: String, default: '500px' },
  height: { type: String, default: 'auto' },
})
</script>


<style lang="scss">
.common-modal{

  .arco-modal-body{

  }

  // 表头
  .arco-modal-header{
    height: 42px;
  }

  // 脚部
  .arco-modal-footer{
    border-top: 0 !important;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>