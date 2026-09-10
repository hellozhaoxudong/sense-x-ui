<template>
  <div class="header-div">
    <div class="header-left">
      <div class="logo">
<!--        <img src="/src/assets/sense-logo.png" height="28px">-->
      </div>
      <div class="system-title">{{ systemTitle }}</div>
    </div>

    <!--多APP-->
    <div class="header-tabs">
      <AppList />
    </div>

    <div class="header-right">
      <a-dropdown trigger="hover">
        <div class="right-item">{{userInfo?.role?.roleName}}</div>
        <template #content>
          <a-doption v-for="item in userInfo?.roleList">{{item.roleName}}</a-doption>
        </template>
      </a-dropdown>


      <a-dropdown trigger="hover">
        <div class="right-item user">{{userInfo?.name}}</div>
        <template #content>
          <a-doption @click="showUserCenter=true">个人中心</a-doption>
          <a-doption @click="logout">退出登录</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>

  <UserCenter v-if="showUserCenter" @close="showUserCenter = false" />
</template>

<script setup>

import {UserStore} from "../../../store/core/UserStore.js";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import PageTabs from "./PageTabs.vue";
import {queryConfig, queryConfigMap} from "../../../api/core/system/sysConfig.js";
import UserCenter from "./UserCenter.vue";
import AppList from "./AppList.vue";

const router = useRouter();
const route = useRoute();

const store = UserStore();
const { userInfo } = storeToRefs(store);

const showUserCenter = ref(false);

const systemTitle = ref('');

onMounted(()=>{
  initLogo();

  // 初始化用户信息
  store.initUserInfo();
})


// 初始化系统名称、Logo信息
function initLogo(){
  queryConfigMap({ configKey: 'SYSTEM_TITLE,SYSTEM_ICON' }).then(res=>{
    if (res.data){
      systemTitle.value = res.data.SYSTEM_TITLE;
    }
  })
}

// 退出登录
function logout(){

  router.push({path: '/login'});
}

</script>


<style scoped>
.header-div{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #232324;
  color: #ffffff;

  .header-left{
    min-width: 206px;
    padding-left: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-right: 1px solid #e4e7ed;

    font-size: 16px;
    font-weight: bold;

    .logo{
      display: flex;
      justify-content: center;
    }

    .system-title{

    }
  }

  .header-tabs{
    flex: 1;
    height: 100%;
    min-width: 0;
    padding: 0 12px;
  }

  .header-right{
    display: flex;
    gap: 8px;
    align-items: center;
    padding-right: 4px;

    .right-item{
      padding: 4px 8px;
      display: flex;
      align-items: center;
      gap: 2px;

      &:hover{
        cursor: pointer;
        background-color: #747bff20;
        border-radius: 4px;
      }
    }

    .user{
      display: flex;
      gap: 2px;
      align-items: center;
    }
  }
}
</style>