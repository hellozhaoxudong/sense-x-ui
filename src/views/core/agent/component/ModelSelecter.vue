<template>
  <div class="model">
    <div class="model-title">对话模型</div>
    <a-select v-model="currentModelId" style="width: 260px">
      <a-option v-for="item in modelList" :value="item.id">{{item.modelTitle}}</a-option>
    </a-select>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {queryChatModel} from "../../../../api/core/agent/model.js";

const emit = defineEmits(["clickModel"])

const currentModelId = ref(null);
const modelList = ref([]);

onMounted(()=>{
  initChatModel();
})

watch(currentModelId, (id)=>{
  emit("clickModel", id);
})

function initChatModel(){
  queryChatModel().then(res=>{
    if (res.data){
      modelList.value = res.data;
      currentModelId.value = res.data[0].id;
    }
  })
}
</script>

<style scoped>
.model{
  background-color: white;
  padding: 4px 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  .model-title{
    font-size: 12px;
    color: #5c6370;
  }
}
</style>