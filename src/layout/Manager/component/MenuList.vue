<template>
  <div class="menu-list">
    <a-menu
        :style="{ width: '160px', height: '100%' }"
        show-collapse-button
        breakpoint="xl"
        :level-indent="12"
        v-model:selected-keys="selectKeys"
    >
      <template v-for="item in menuList">
        <!--单个菜单-->
        <a-menu-item v-if="!item.children" :key="item.menuPath" @click="handleClick(item)">
          <template #icon><component :is="item.menuIcon" /></template>
          {{item.menuAliasName}}
        </a-menu-item>

        <!--二级菜单-->
        <a-sub-menu v-else :key="`${item.menuPath}`">
          <template #icon><component :is="item.menuIcon" /></template>
          <template #title>{{item.menuAliasName}}</template>

          <template v-for="level2 in item.children">
            <!--二级就是页面-->
            <a-menu-item v-if="!level2.children" :key="level2.menuPath" @click="handleClick(level2)">
              <template #icon><component :is="level2.menuIcon" /></template>
              {{level2?.menuAliasName}}
            </a-menu-item>

            <!--三级菜单-->
            <a-sub-menu v-else :key="`${level2.menuPath}`">
              <template #title>{{level2.menuAliasName}}</template>
              <a-menu-item v-for="level3 in level2.children" :key="level3.menuPath" @click="handleClick(level3)">
                {{level3?.menuAliasName}}
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {UserStore} from "../../../store/core/UserStore.js";

const route = useRoute();
const router = useRouter();

const userStore = UserStore();

// 当前用户拥有的菜单权限
const { menuList } = storeToRefs(userStore);

// 菜单列表
const selectKeys = ref([route.path]);

function handleClick(menu) {
  // 添加页签
  userStore.addTab(menu);

  // 跳转路由
  router.push({ path: menu.menuPath })
}

</script>

<style scoped>
.menu-list{
  height: 100%;

  :deep(.arco-menu-icon){
    margin-right: 8px;
  }

  :deep(.arco-menu-inner){
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }


}
</style>