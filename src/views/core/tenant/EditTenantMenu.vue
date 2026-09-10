<template>
  <CommonModal title="分配菜单" width="700px" @ok="onSubmit" @close="emit('close')">
    <div class="menu-transfer" v-if="tenantId">
      <CommonLightTable
          ref="tableRef"
          :data="menuTreeData"
          :show-page="false"
          @selectRowIds="(ids)=>assignedMenuIds = ids"
      >
        <template #columns>
          <a-table-column title="菜单" data-index="menuName" ellipsis tooltip>
            <template #cell="{ record }">
              <div style="display: flex; align-items: center; gap: 8px">
                <component :is="record.menuIcon" />
                <span>{{record.menuName}}</span>
                <a-tag color="arcoblue">{{record.appName}}</a-tag>
              </div>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </div>
  </CommonModal>
</template>

<script setup>
import {ref, watch} from "vue";
import {queryAllAppMenu, queryMenuTree} from "../../../api/core/menu.js";
import {queryMenuIdsByTenantId, assignMenusToTenant} from "../../../api/core/menu-tenant.js";
import {Message} from "@arco-design/web-vue";
import CommonTree from "../../../core/component/CommonTree/CommonTree.vue";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CommonTable from "../../../core/component/CommonTable/CommonTable.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";

const emit = defineEmits(['close'])

const props = defineProps({
  tenantId: { type: [Number, String], default: null },
});


const tableRef = ref();
const menuTreeData = ref([]);       // 原始树形数据
const assignedMenuIds = ref([]);    // 已分配菜单ID

// 监听租户变化
watch(() => props.tenantId, (val) => {
  assignedMenuIds.value = [];
  initAllMenu();
}, { immediate: true })

// 初始化系统全部菜单
function initAllMenu(){
  queryAllAppMenu().then(res=>{
    menuTreeData.value = res.data;

    initExist();
  })
}


// 初始化已分配的
function initExist(){
  queryMenuIdsByTenantId(props.tenantId).then(res=>{
    assignedMenuIds.value = res.data;
    tableRef.value?.setSelectRows(res.data);
  })
}

// 提交
function onSubmit(){
  assignMenusToTenant({
    tenantId: props.tenantId,
    menuIds: assignedMenuIds.value
  }).then(() => {
    Message.success('菜单分配保存成功');
    emit('close');
  })
}
</script>

<style scoped lang="scss">
.menu-transfer {
  width: 100%;
  height: 460px;
  overflow: hidden;

  :deep(.arco-transfer){
    height: 100%;
  }

  :deep(.arco-transfer-view){
    flex: 1;
    min-width: 200px;
    height: 100%;
  }
}
</style>
