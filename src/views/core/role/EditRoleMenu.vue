<template>
  <CommonLightTable
      ref="tableRef"
      :data="menuTreeData"
      :show-page="false"
      @selectRowIds="(ids)=>assignedMenuIds = ids"
  >
    <template #operation>
      <a-button type="primary" @click="toSave">保存分配</a-button>
    </template>
    <template #columns>
      <a-table-column title="菜单" data-index="menuAliasName" ellipsis tooltip>
        <template #cell="{ record }">
          <div style="display: flex; align-items: center; gap: 8px">
            <component :is="record.menuIcon" />
            <span>{{record.menuAliasName}}</span>
            <a-tag color="arcoblue">{{record.appName}}</a-tag>
          </div>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>
</template>

<script setup>
import {ref, watch} from "vue";
import {queryTenantMenuTree} from "../../../api/core/menu-tenant.js";
import {queryMenuIdsByRoleId, assignMenusToRole} from "../../../api/core/menu-role.js";
import {Message} from "@arco-design/web-vue";
import CommonTree from "../../../core/component/CommonTree/CommonTree.vue";
import {queryTenantMenu} from "../../../api/core/menu.js";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";

const props = defineProps({
  roleId: { type: [Number, String], default: null },
});

const tableRef = ref();
const menuTreeData = ref([]);       // 当前租户已分配的菜单树
const assignedMenuIds = ref([]);    // 角色已分配菜单ID

// 监听角色变化
watch(() => props.roleId, (val) => {
  assignedMenuIds.value = [];

  if (val){
    initTenantMenu();
  }
}, { immediate: true })


// 初始化租户内全部菜单
function initTenantMenu(){
  queryTenantMenu().then(res=>{
    menuTreeData.value = res.data;

    initExist();
  })
}

// 初始化已分配的
function initExist(){
  queryMenuIdsByRoleId(props.roleId).then(res=>{
    assignedMenuIds.value = res.data;
    tableRef.value?.setSelectRows(res.data);
  })
}

// 保存分配
function toSave(){
  assignMenusToRole({
    roleId: props.roleId,
    menuIds: assignedMenuIds.value
  }).then(() => {
    Message.success('菜单分配保存成功');
  })
}
</script>

<style scoped lang="scss">
.edit-role-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .menu-toolbar {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: end;
  }

  .menu-transfer {
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
}
</style>
