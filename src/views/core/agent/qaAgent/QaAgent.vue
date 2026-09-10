<!--智能问答智能体-->
<template>
  <div class="smart-chat">
    <!--左侧-->
    <div class="chat-left">
      <div class="user">
        <div class="user-title">智能数据探索</div>
      </div>
      <!--聊天历史记录-->
      <ChatHistory agent-type="QA" @clickChat="handleClickChat"/>
    </div>

    <!--右侧-->
    <div class="chat-right">
      <div class="model-selecter">
        <ModelSelecter @clickModel="handleClickModel"/>
      </div>

      <div class="init-welcome" v-if="messageList.length === 0"><img src="/src/assets/core/agent-qa.svg" style="width: 32px" />您好，欢迎使用智能数据探索</div>

      <div class="chat-content" ref="contentListRef">
        <template v-for="item in messageList">
          <!--用户问题-->
          <TextQuestion v-if="item.messageType === 'USER'" :message="item.content"/>

          <!--AI回答-->
          <TextAnswer v-if="item.messageType === 'AI'" :message="item.content" :thinks="item.thinks"/>
        </template>

        <!--缓存的AI回答-->
        <TextAnswer v-if="answerCache.messageId" :thinks="answerCache.think" :message="answerCache.content"/>
      </div>

      <div class="chat-send">
        <a-textarea v-model="question" placeholder="请输入您的问题" allow-clear :auto-size="{ minRows:3, maxRows:5 }"/>
        <a-button type="primary" size="large" @click="doChat">发送</a-button>
      </div>

      <!--声明-->
      <div class="chat-author">
        国新健康BI分析平台提供智能化服务
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatHistory from "../component/ChatHistory.vue";
import {nextTick, ref} from "vue";
import {queryChatMessage, saveChatMessage} from "../../../../api/core/agent/agent.js";
import TextQuestion from "../component/TextQuestion.vue";
import TextAnswer from "../component/TextAnswer.vue";
import ModelSelecter from "../component/ModelSelecter.vue";
import {v4 as uuidv4} from 'uuid';
import {fetchEventSource} from "@microsoft/fetch-event-source";

const contentListRef = ref(null);

// 选中的对话
const currentChatId = ref(null);
// 选中的模型
const currentModelId = ref(null);
// 对话消息
const messageList = ref([]);
// 用户问题
const question = ref('');
// 缓存的AI回答
const answerCache = ref({});

// 初始化消息列表
function initMessageList(){
  if (!currentChatId.value){
    return;
  }

  queryChatMessage({chatId: currentChatId.value}).then(res=>{
    messageList.value = res.data;
  })
}

// 发起对话
function doChat(){
  // 构造前端虚拟的消息
  const cacheId = uuidv4();
  messageList.value.push({ chatId: currentChatId.value, messageId: cacheId, messageType: "USER", content: question.value });
  scrollToBottom();

  // 存储用户问题
  saveQuestion(cacheId, question.value);

  // 构建前端AI回答缓冲
  const aId = uuidv4();
  answerCache.value = { chatId: currentChatId.value, messageId: aId, messageType: "AI", thinks: '', content: '' };

  // 发送请求
  const ctrl = new AbortController();
  fetchEventSource(`/api/core/agent/qa?chatId=${currentChatId.value}&modelId=${currentModelId.value}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem("sense.access_token")}`,
    },
    body: JSON.stringify({ role: 'USER', content: question.value }),
    signal: ctrl.signal,
    onmessage: (event) => {
      // 思考过程
      if (event.event === 'think') {
        answerCache.value.thinks += '\n' + event.data;
      }

      if (event.event === 'error'){
        // 写入正式记录中
        messageList.value.push({ chatId: currentChatId.value, messageId: aId, messageType: "ERROR", thinks: answerCache.value.thinks, content: event.data })
        answerCache.value = {};
        scrollToBottom();

        // 存储记录
        // saveErrorAnswer(aId, JSON.stringify(chartAnswerCache.value.thinks), JSON.stringify(content));
      }

      if (event.event === 'data') {
        // 写入缓存的数据中
        answerCache.value.content += event.data;
      }

      // 请求完成
      if (event.event === 'completed') {
        const thinkStr = answerCache.value.thinks;
        answerCache.value = {};
        messageList.value.push({chatId: currentChatId.value, messageId: aId, messageType: "AI", thinks: thinkStr, content: event.data})
        scrollToBottom();

        // 存储记录
        saveAnswer(aId, thinkStr, event.data);
        question.value = '';
      }
    },
    onclose() {
      ctrl.abort(); //关闭连接
    },
    onerror(err) {
      // 必须抛出错误才会停止
      throw err;
    },
  });
}



function handleClickChat(id){
  currentChatId.value = id;
  initMessageList();
}

function handleClickModel(id){
  currentModelId.value = id;
}

async function scrollToBottom () {
  await nextTick() // 确保内容已渲染
  const el = contentListRef.value
  el.scrollTo({
    top: el.scrollHeight,
    behavior: 'smooth'
  })
}


function saveQuestion(messageId, content){
  saveChatMessage({
    messageId: messageId,
    chatId: currentChatId.value,
    messageType: "USER",
    content: content
  })
}

function saveAnswer(messageId, thinks, content){
  saveChatMessage({
    messageId: messageId,
    chatId: currentChatId.value,
    messageType: "AI",
    content: content,
    thinks: thinks
  })
}
</script>


<style scoped lang="scss">
.smart-chat {
  width: 100%;
  height: 100%;
  min-width: 900px;
  display: flex;
  gap: 8px;

  .chat-left {
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;

    // 用户
    .user{
      display: flex;
      align-items: center;
      gap: 4px;

      .user-title{
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .chat-right {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 4px;

    // 模型选择
    .model-selecter{
      height: 48px;
      width: 100%;
    }

    // 默认欢迎
    .init-welcome{
      line-height: 160px;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    // 内容
    .chat-content{
      flex: 1;
      padding: 2px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      box-sizing: border-box;

      // 美化滚动条
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
    }

    .chat-send{
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 128px;
      box-sizing: border-box;
    }

    // 说明
    .chat-author{
      height: 32px;
      text-align: center;
      font-size: 12px;
      color: #5c637090;
    }
  }

  }
</style>