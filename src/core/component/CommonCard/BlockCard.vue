<template>
  <div class="block-card">
    <div class="card-header">
      <div class="card-title">{{ title }}</div>
    </div>

    <div class="card-desc">
      {{ desc }}
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '卡片名称' },
  desc: { type: String, default: '卡片描述' },
  showDo: { type: Boolean, default: true },
  doText: { type: String, default: '详情' },
});

</script>


<style scoped lang="scss">
.block-card{
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid #e6e8ee;
  cursor: pointer;
  background: radial-gradient(26% 84% at 4% 4%, #dddce54d 0%, #f5f4f700 94%), #fff;
  border-radius: 6px;
  padding: 20px;
  transition: all .4s;

  // 卡片头
  .card-header{
    display: flex;
    align-items: center;

    // 卡片标题
    .card-title{
      flex: 1;
      color: #26244c;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      overflow: hidden;
    }
  }

  // 卡描述
  .card-desc{
    color: rgba(38, 36, 76, 0.45);
    margin: 0;
    font-size: 12px;
  }

  &:hover{
    border-color: #615ced;
    box-shadow: 0 4px 12px #0000001a;
  }
}
</style>