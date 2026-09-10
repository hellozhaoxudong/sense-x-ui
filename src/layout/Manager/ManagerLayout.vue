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

        <div class="ml-tabs">
          <PageTabs/>
        </div>

        <div class="ml-page-content">
          <router-view v-slot="{ Component, route }">
            <component v-if="route.meta?.transparentBck" :is="Component" />
            <div v-else class="router-view">
              <component :is="Component" />
            </div>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import MenuList from "./component/MenuList.vue";
import ManagerHeader from "./component/ManagerHeader.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AppList from "./component/AppList.vue";
import PageTabs from "./component/PageTabs.vue";

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
      min-width: 0;
      height: 100%;
      background-color: rgb(242, 243, 245);
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      // 多页签
      .ml-tabs{
        width: 100%;
        background-color: #ffffff;
        padding: 4px;
        box-sizing: border-box;
      }


      // 页面内容
      .ml-page-content{
        width: 100%;
        flex: 1;
        min-height: 0;
        box-sizing: border-box;
        padding: 10px 0 8px 0;

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