<template>
  <a-popover title="图标选择" trigger="click">
    <div class="icon-view">
      <component :is="selectedIconName"/>
      <div>{{selectedIconName}}</div>
    </div>
    <template #content>
      <div class="icon-selecter">
        <div class="icon-search">
          <a-input-search placeholder="请输入图标名称" v-model:value="searchValue" style="width: 100%;"/>
        </div>
        <div class="icon-list">
          <div v-for="item in iconList" :key="item.name" class="icon-item" @click="onClickIcon(item.name)">
            <component :is="item.name" style="width: 18px; height: 18px"/>
          </div>
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="js">
import * as icons from '@arco-design/web-vue/es/icon'
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  modelValue: { type: String }
})
const emit = defineEmits(['update:modelValue'])

// 用一个内部的 ref 来管理输入框的值
const selectedIconName = ref(props.modelValue);

const iconList = ref([]);

const searchValue = ref('');


onMounted(() => {
  iconList.value = Object.values(icons);
})

// 监听 props.modelValue 的变化，确保内部值与外部 prop 保持同步
watch(() => props.modelValue, (newVal) => {
  selectedIconName.value = newVal;
})

function onClickIcon(iconName){
  selectedIconName.value = iconName;
  emit('update:modelValue', iconName);
}

</script>


<style scoped lang="scss">
.icon-view{
  width: 220px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #3e3e3e10;
  padding: 0 12px;
  cursor: pointer;
}

.icon-selecter{
  width: 400px;

  .icon-search{
    padding-bottom: 8px;
  }

  .icon-list{
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    overflow-y: auto;
    // 美化滚动条
    &::-webkit-scrollbar {
      width: 0px;
    }

    .icon-item{
      padding: 4px;

      background: #f2f3f5;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #2d8cf030;
      }
    }
  }


}
</style>
