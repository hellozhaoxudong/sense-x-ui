<template>
  <div class="app-list">
    <div :class="['app-item', { active: currentAppCode === item.appCode }]" v-for="item in appList" :key="item.appCode" @click="onClickApp(item.appCode)">
      <component :is="item.appIcon"/>
      <div>{{ item.appName }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {UserStore} from "../../../store/core/UserStore.js";

const userStore = UserStore();

// 当前用户拥有权限的应用
const { appList, currentAppCode } = storeToRefs(userStore);

// 点击应用
function onClickApp(appCode){
  userStore.setAppCode(appCode);
}
</script>


<style scoped lang="scss">
.app-list{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  .app-item{
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    border-radius: 2px;
    color: #C9CDD4;
    font-size: 15px;
    padding: 2px 12px;
    box-sizing: border-box;

    &:hover{
      color: rgb(201,205,212);
      background-color: rgb(255 255 255 / 20%);
    }

    &.active{
      color: #fff;
      background-color: rgb(255 255 255 / 20%);
      font-weight: 500;
    }
  }
}

.app-list-expand{
  width: 80px;
}
</style>