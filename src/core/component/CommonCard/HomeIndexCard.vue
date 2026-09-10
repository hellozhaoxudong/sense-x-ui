<template>
  <div class="energy-card">
    <div class="card-bg-circle"></div>

    <div class="card-header">
      <span class="card-title">{{title}}</span>
      <div class="card-icon">
        <slot name="icon"/>
      </div>
    </div>

    <div class="card-value">
      {{value}}<span class="unit">{{unit}}</span>
    </div>

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: { type: String, default: '' },
  value: { type: String, default: '' },
  unit: { type: String, default: '' }
})
</script>


<style scoped lang="scss">
.energy-card {
  position: relative;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  color: #fff;
  overflow: hidden;
  background: linear-gradient(135deg, #4f8dfd 0%, #2f6cf6 100%);
}

/* 右侧装饰半圆 */
.card-bg-circle {
  position: absolute;
  right: -40px;
  top: 20px;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
}

/* 头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
}

/* 右上角图标 */
.card-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主数值 */
.card-value {
  margin-top: 8px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 1px;
}

.card-value .unit {
  font-size: 16px;
  margin-left: 4px;
  opacity: 0.85;
}

/* 底部 */
.card-footer {
  margin-top: 12px;
  font-size: 13px;
  opacity: 0.9;
}
</style>