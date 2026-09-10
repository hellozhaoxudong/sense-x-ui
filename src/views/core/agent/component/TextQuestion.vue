<template>
  <div class="message-question">
    <div class="message-right">
      <div class="message-text">{{message}}</div>

      <div class="question-tool">
        <div class="tool-item" @click="emit('deleteMessage')"><icon-delete /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String
})

const emit = defineEmits(['deleteMessage']);


</script>

<style scoped lang="scss">
.message-question{
  width: 100%;
  display: flex;
  justify-content: end;
  max-width: 1000px;       // 内容最大宽度（你可以改成 800、900、1000）
  margin: 0 auto;         // 居中

  // 靠右
  .message-right{
    max-width: 600px;
    min-width: 400px;

    position: relative;

    .question-tool{
      position: absolute;
      left: -24px;
      bottom: 0px;

      .tool-item{
        padding: 4px;
      }
      .tool-item:hover{
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
    }

    // 文本
    .message-text{
      background-color: rgba(0, 0, 0, 0.04);
      padding: 8px 12px;
      border-radius: 6px;
      color: #262626;
      /*换行*/
      word-wrap: break-word;
      word-break: break-word;
      white-space: pre-wrap;
    }
  }
}
</style>