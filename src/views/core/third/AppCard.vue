<template>
  <div class="big-card">
    <div class="title-div" @click="emit('clickTitle')">
      {{title}}
    </div>
    <div class="card-content">
      <slot></slot>

      <div class="card-operation">
        <slot name="operation"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})

const emit = defineEmits(['clickTitle']);
</script>

<style scoped lang="scss">
.big-card{
  cursor: pointer;

  .title-div{
    font-size: 18px;
    font-weight: 700;
    box-sizing: border-box;
    padding: 12px 8px 22px 8px;
    border-radius: 8px 8px 0 0 ;
    background: linear-gradient(54deg, transparent 72.29%), linear-gradient(120deg, rgba(154, 91, 255, 0) 68.73%, #9a5bff 125.49%), linear-gradient(211deg, transparent 62.13%, #000 89.31%), linear-gradient(311deg, rgba(0, 85, 255, 0) 69.74%, #05f 115.24%), #181920;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-content{
    min-height: 80px;
    padding: 8px 8px 2px 8px;
    border-radius: 0 0 8px 8px;
    border: 1px solid #fff;
    background: linear-gradient(180deg, hsla(0, 0%, 100%, .7) 1.56%, #fff 10.94%);
    margin-top: -12px;
    backdrop-filter: blur(32px);
  }

  .card-operation{
    display: flex;
    justify-content: flex-end;
  }

  // 图标按钮
  ::v-deep(.operation-icon){
    padding: 6px;
    font-size: 12px;
    cursor: pointer;
    color: #2f54eb;
    &:hover{
      background-color: rgb(229, 230, 235);
      border-radius: 4px;
    }
  }

}
</style>