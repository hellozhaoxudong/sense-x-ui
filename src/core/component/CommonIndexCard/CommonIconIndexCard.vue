<template>
  <div class="icon-index-card" :style="{backgroundColor: cardColor}">
    <div class="icon" v-if="$slots.default">
      <slot></slot>
    </div>

    <div class="card-content">
      <div class="title">{{indexName}}</div>
      <div class="value">{{indexValue}}</div>
    </div>
  </div>
</template>

<script setup lang="js">
const props = defineProps({
  indexName: { type: String, default: '指标名' },
  indexValue: { type: [String, Number], default: 0.00 },
  cardColor: { type: String, default: 'white' },
});
</script>


<style scoped lang="scss">
.icon-index-card{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 2px 8px 8px;
  box-sizing: border-box;
  border: #0f243810 1px solid;
  border-radius: 4px;

  .icon{
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
  }

  .card-content{
    flex: 1;

    .title{
      font-size: 14px;

    }
    .value{
      font-size: 14px;
      font-weight: bold;
      margin-top: 4px;
    }
  }
}
</style>