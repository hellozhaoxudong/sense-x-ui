<template>
  <div class="line-card">
    <div class="card-content">
      <div class="title">{{title}}</div>
      <div class="value">{{desc}}</div>
    </div>

    <div class="operation" v-if="showDo">
      <a-button size="mini" type="outline" @click="emit('do')">{{doText}}</a-button>
    </div>
  </div>
</template>

<script setup lang="js">
const props = defineProps({
  title: { type: String, default: '指标名' },
  desc: { type: String, default: '2022-01-01' },
  showDo: { type: Boolean, default: true },
  doText: { type: String, default: '详情' },
});

const emit = defineEmits(['do'])
</script>


<style scoped lang="scss">
.line-card{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  box-sizing: border-box;
  background-color: #266FFF0D;
  border: #266FFF0D 1px solid;
  border-radius: 4px;

  .card-content{
    flex: 1;
    .title{
      font-size: 14px;
      color: #165dff;
    }
    .value{
      font-size: 12px;
      color: #1d2129;
      margin-top: 8px;
    }
  }


  .operation{
    display: flex;
    align-items: center;
    width: 64px;
    justify-content: end;
  }

  &:hover{
    border: #266FFF 1px solid;
  }
}
</style>