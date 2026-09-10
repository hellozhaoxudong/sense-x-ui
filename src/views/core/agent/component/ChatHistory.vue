<template>
  <div class="chat-history">
    <div class="create-chat" @click="createChat">
      <img src="/src/assets/core/agent-new-chat.svg" style="width: 16px"/>
      新对话
    </div>
    <div class="chat-list">
      <div :class="['chat-item', {select: currentChatId===item.id}]" v-for="item in chatList" @click="handleClickChat(item.id)">
        <img src="/src/assets/core/agent-chat.svg" style="width: 18px"/>
        <div class="item-name">{{item.chatTitle}}</div>

        <a-dropdown trigger="hover" class="item-btn">
          <icon-more-vertical />
          <template #content>
            <a-doption>删除</a-doption>
            <a-doption>重命名</a-doption>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, defineEmits, defineProps} from "vue";
import {queryMyChat} from "../../../../api/core/agent/agent.js";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const emit = defineEmits(['clickChat'])

const props = defineProps({
  agentType: { type: String, default: 'QA' }
})

const chatList = ref([]);
const currentChatId = ref('');

onMounted(()=>{
  initChatList();
})

function initChatList(){
  queryMyChat({agentType: props.agentType}).then(res=>{
    chatList.value = res.data;

    const chatId = route.params.chatId;
    if (chatId){
      handleClickChat(chatId);
    } else if (res.data.length > 0){
      handleClickChat(res.data[0].id);
    }
  })
}

function createChat(){

}

function handleClickChat(id){
  currentChatId.value = id;
  emit('clickChat', id)
  router.replace({ name: route.name, params: { chatId: id }});
}

</script>


<style scoped>
.chat-history{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .create-chat{
    width: 100%;
    background-color: rgba(0, 87, 255, 0.06);
    padding: 8px 6px;
    border: 0.5px solid rgba(0, 87, 255, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    color: rgb(0, 87, 255);
  }
  .create-chat:hover{
    background-color: rgba(0, 87, 255, 0.1);
  }

  .chat-list{
    flex: 1;
    padding: 8px 0px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: auto;

    .chat-item{
      padding: 6px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;

      .item-name{
        flex: 1;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-btn{
        visibility: hidden;
      }
    }


    .chat-item:hover{
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 4px;

      .item-btn{
        visibility: visible;
      }
    }
    .chat-item.select{
      background-color: rgba(0, 87, 255, 0.06);
      color: rgb(0, 87, 255);
      border-radius: 4px;
      font-weight: 500;

      .item-btn{
        visibility: visible;
      }
    }
  }
}
</style>