<template>
  <div class="manager-layout">
    <!--头部-->
    <div class="ml-header">
      <ManagerHeader />
    </div>

    <!--中间-->
    <div class="ml-content">
      <!--左侧菜单-->
      <div class="ml-menu">
        <MenuList />
      </div>
      <!--右侧页面-->
      <div class="ml-page">
        <div class="ml-page-content">
          <div class="router-view">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import ManagerHeader from "../Manager/component/ManagerHeader.vue";
import MenuList from "../Manager/component/MenuList.vue";

onMounted(()=>{
})
</script>

<style scoped lang="scss">
.manager-layout{
  width: 100%;
  height: 100%;

  .ml-header{
    width: 100%;
    height: 42px;
    border-bottom: 1px solid rgb(229,230,235)
  }

  // 中间
  .ml-content{
    width: 100%;
    height: calc(100% - 42px);
    display: flex;

    // 左侧菜单
    .ml-menu{
      height: 100%;
    }

    // 右侧页面
    .ml-page{
      flex: 1;
      height: 100%;
      background-color: rgb(242, 243, 245);
      box-sizing: border-box;

      // 页面内容
      .ml-page-content{
        width: 100%;
        height: calc(100% - 40px);
        box-sizing: border-box;
        padding: 8px 8px 0px 8px;

        // 页面公共样式
        .router-view{
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: white;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: auto;

          // 美化滚动条
          &::-webkit-scrollbar {
            width: 0px;
          }
        }
      }
    }
  }
}
</style>