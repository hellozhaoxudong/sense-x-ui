<template>
  <div class="answer-chart">
    <div class="deep-think" @click="showThink=!showThink">
      <img src="/src/assets/core/agent-think.svg" style="width: 14px" /><div>深度思考</div>
      <icon-down v-if="showThink"/>
      <icon-right v-if="!showThink"/>
    </div>

    <!--深度思考内容-->
    <div v-if="showThink" class="thinks" v-html="thinks">
    </div>

    <div class="smart-chart" v-html="message">
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  messageId: String,
  thinks: String,  // 思考内容
  message: String,
});

const showThink = ref(false);

</script>

<style scoped lang="scss">
.answer-chart {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .deep-think{
    width: 100px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .deep-think:hover{
    cursor: pointer;
    background-color: #5c637020;
    border-radius: 4px;
  }

  .thinks{
    width: 600px;
    font-size: 12px;
    color: #5c6370;
  }

  .smart-chart{
    width: 420px;
    background-color: rgba(0, 0, 0, 0.04);
    padding: 6px 6px 4px 6px;
  }
}
</style>