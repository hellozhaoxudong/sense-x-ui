<template>
  <div class="page-tabs">
    <div v-show="showArrows" class="arrow-btn arrow-left" @click="scrollLeft">
      <icon-double-left />
    </div>
    <div class="tabs-container" ref="tabsContainerRef">
      <a-tag
          v-for="item in tabList"
          :key="item.menuPath"
          closable
          @close="handleDelete(item)"
          :color="activityKey===item.menuPath?'arcoblue':''"
          @click="handleClick(item)"
      >
        <template #icon>
          <component :is="item.menuIcon" />
        </template>
        {{item.menuAliasName}}
      </a-tag>
    </div>
    <div v-show="showArrows" class="arrow-btn arrow-right" @click="scrollRight">
      <icon-double-right />
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch, nextTick, onBeforeUnmount} from "vue";
import {UserStore} from "../../../store/core/UserStore.js";

const userStore = UserStore();

// 当前活动的页签
const { tabList } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();

const activityKey = ref('');

const tabsContainerRef = ref(null);
const showArrows = ref(false);

// 每次点击滚动的距离
const SCROLL_DISTANCE = 200;

watch(() => route.path, (path) => {
  activityKey.value = path;
})

// 监听 tabs 变化，检查是否需要显示箭头
watch(tabList, () => {
  nextTick(() => {
    checkOverflow();
  });
}, { deep: true })

onMounted(()=>{
  activityKey.value = route.path;
  checkOverflow();
  window.addEventListener('resize', checkOverflow);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkOverflow);
})

// 检查是否溢出
function checkOverflow() {
  if (!tabsContainerRef.value) return;
  showArrows.value = tabsContainerRef.value.scrollWidth > tabsContainerRef.value.clientWidth;
}

// 左滚
function scrollLeft() {
  if (!tabsContainerRef.value) return;
  tabsContainerRef.value.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
}

// 右滚
function scrollRight() {
  if (!tabsContainerRef.value) return;
  tabsContainerRef.value.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
}

// 关闭页签
function handleDelete(item){
  const next = userStore.removeTab(item.menuPath);

  // 如果删除的是当前页签，且返回了下一个页签，则打开
  if (item.menuPath === route.path && next && next.menuPath){
    router.push({path: next.menuPath})
  }
}

// 点击页签
function handleClick(item){
  router.push({path: item.menuPath})
}
</script>

<style scoped lang="scss">
.page-tabs{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 4px;
  box-sizing: border-box;
  user-select: none;

  .arrow-btn{
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    color: #666;

    &:hover{
      background-color: #e8e8e8;
      color: #333;
    }
  }

  .tabs-container{
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 4px;
    overflow-x: auto;

    :deep(.arco-tag){
      flex-shrink: 0;
      font-size: 14px;
      font-weight: normal;
    }

    // 隐藏滚动条
    &::-webkit-scrollbar {
      height: 0px;
    }
  }
}
</style>