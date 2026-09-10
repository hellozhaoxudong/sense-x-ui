<!--
  封装通用列表组件，用于统一增删改查列表页面的整体样式
  使用：<CommonList></CommonList>

 【基础用法】
    参数：
      title: 树标题
      list: 列表数据，格式为: [{ id: 1, dicName: '字典名称', dicDesc: '字典描述' }]
      titleProps: 标题属性名，例如dicName
      descProps: 描述属性名，例如dicDesc
    事件:
      @create(): 点击新建按钮触发
      @select(item): 点击某个列表项触发
    插槽：
      item-operation: 列表项操作
      operation: 列表操作
-->

<template>
  <div class="common-list">
    <!--头部-->
    <div class="list-header">
      <div v-if="title" class="header-title">{{title}}</div>
    </div>

    <!--查询框-->
    <div class="list-search">
      <a-input v-model="searchText" placeholder="快速检索" @input="handleSearch"/>
      <div class="header-operation" v-if="showAdd">
        <IconBtn @click="handleCreate"><icon-plus /></IconBtn>
      </div>
    </div>

    <!--列表页面-->
    <div class="list-content">
      <div v-for="item in commonList" :class="['list-item', { active: item[keyProps] === selectedItem[keyProps] }]" @click="handleSelect(item)">
        <!--图片插槽-->
        <slot name="image" :item="item"/>

        <div class="item-content">
          <div class="item-title">{{item[titleProps]}}</div>
          <div class="item-desc">{{item[descProps]}}</div>
        </div>

        <a-dropdown v-if="$slots['item-operation'] && item[keyProps] === selectedItem[keyProps]" trigger="click">
          <IconBtn><icon-more /></IconBtn>
          <template #content>
            <slot name="item-operation" :item="item" />
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import IconBtn from "../CommonBtn/IconBtn.vue";

const props = defineProps({
  title: String,
  list: { type: Array, default: () => [] },
  keyProps: { type: String, default: 'id' }, // 元素唯一ID
  titleProps: { type: String, default: 'title' }, // 标题属性名
  descProps: { type: String, default: 'desc' }, // 描述属性名
  showAdd: { type: Boolean, default: true }, // 是否显示新增按钮
})

const emit = defineEmits(['create', 'select'])

const commonList = ref([]);

watch(()=>props.list, (val) => {
  commonList.value = [...props.list];
}, { deep: true, immediate: true });

// 搜索框
const searchText = ref('');
// 选择项
const selectedItem = ref({});

// 新建
function handleCreate() {
  emit('create');
}

// 选择
function handleSelect(item) {
  console.log(item);
  selectedItem.value = item;
  emit('select', item);
}

// 搜索
function handleSearch(v) {
  if (!v){
    commonList.value = [...props.list];
  }

  // 检索
  commonList.value = [];
  props.list.forEach(item=>{
    if (item[props.titleProps].includes(v) || item[props.descProps].includes(v)){
      commonList.value.push(item);
    }
  })
}

</script>


<style scoped lang="scss">
.common-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  // 头部
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 2px;

    // 标题
    .header-title {
      font-size: 16px;
      color: rgb(29, 33, 41);
      font-weight: 500;
    }
  }

  // 查询框
  .list-search {
    padding: 0 8px 0 2px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;

    // 操作
    .header-operation{
      display: flex;
      align-items: center;
    }
  }

  .list-content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding: 4px 6px 4px 2px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;

    // 字典项
    .list-item {
      padding: 4px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      border-radius: 6px;
      background-color: #fafafa;
      border: 0.5px solid rgba(46, 116, 255, 0.25);
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

      // 字典内容
      .item-content {
        flex: 1;

        // 字典标题
        .item-title {
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
          font-weight: 500;

          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; /* 这里是超出几行省略 */
          overflow: hidden;
        }

        // 字典描述
        .item-desc {
          font-size: 12px;
          color: rgb(110, 110, 110);
          margin-top: 2px;

          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; /* 这里是超出几行省略 */
          overflow: hidden;
        }
      }

    }

    .list-item.active {
      background-color: rgba(46, 116, 255, 0.3);
      color: rgb(46, 116, 255);
    }

    .list-item:not(.active):hover {
      background-color: rgba(46, 116, 255, 0.08);
      color: rgb(46, 116, 255);
    }

    // 美化滚动条
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }

  // 图标按钮
  .operation-icon{
    padding: 6px;

    &:hover{
      background-color: rgb(229, 230, 235);
      border-radius: 4px;
    }
  }
}
</style>