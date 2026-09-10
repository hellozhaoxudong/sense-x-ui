<template>
  <CommonLightTable
      :data="treeData"
      :show-page="false"
      @search="initData"
      @resetSearch="initData"
  >
    <!--操作按钮-->
    <template #operation>
      <a-button type="primary" @click="toSave">保存</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="菜单名称" data-index="menuName" ellipsis tooltip />
      <a-table-column title="菜单别名" data-index="menuAliasName" ellipsis tooltip>
        <template #cell="{ record }">
          <a-input v-model="record.menuAliasName" size="small"/>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>
</template>

<script setup>
import {ref, watch} from "vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {queryRoleMenuTree, updateRoleMenuAlias} from "../../../api/core/menu-role.js";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
  roleId: { type: [Number, String], default: null },
});

const treeData = ref([]);

// 监听角色变化
watch(() => props.roleId, (val) => {
  treeData.value = [];
  if (val) {
    initData();
  }
}, { immediate: true })

// 加载数据
function initData(){
  if (!props.roleId) return;
  queryRoleMenuTree(props.roleId).then(res => {
    treeData.value = res.data || [];
  })
}

// 保存别名
function toSave(){
  if (!props.roleId) return;
  // 将树形数据平铺，收集所有 menuId + menuAliasName
  const aliasList = flattenTree(treeData.value).map(item => ({
    menuId: item.id,
    menuAliasName: item.menuAliasName || ''
  }));

  updateRoleMenuAlias({
    roleId: props.roleId,
    aliasList
  }).then(() => {
    Message.success('菜单别名保存成功');
  })
}

// 递归平铺树
function flattenTree(nodes) {
  const result = [];
  if (!nodes) return result;
  for (const node of nodes) {
    result.push(node);
    if (node.children && node.children.length > 0) {
      result.push(...flattenTree(node.children));
    }
  }
  return result;
}
</script>

<style scoped>
</style>
