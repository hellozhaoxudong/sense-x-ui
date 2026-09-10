<template>
  <CommonModal title="菜单重命名" width="700px" @ok="onSubmit" @close="emit('close')">
    <div class="alias-table">
      <CommonLightTable
          :data="treeData"
          :show-page="false"
          @search="initData"
          @resetSearch="initData"
      >
        <!--字段信息-->
        <template #columns>
          <a-table-column title="菜单名称" data-index="menuName" ellipsis tooltip />
          <a-table-column title="菜单别名" data-index="menuAliasName" ellipsis tooltip>
            <template #cell="{ record }">
              <a-input v-model="record.menuAliasName" size="small" maxlength="100" />
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </div>
  </CommonModal>
</template>

<script setup>
import {ref, watch} from "vue";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {queryTenantMenuTree, updateMenuAlias} from "../../../api/core/menu-tenant.js";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(['close'])

const props = defineProps({
  tenantId: { type: [Number, String], default: null },
});

const treeData = ref([]);

// 监听租户变化
watch(() => props.tenantId, (val) => {
  treeData.value = [];
  if (val) {
    initData();
  }
}, { immediate: true })

// 加载数据
function initData(){
  if (!props.tenantId) return;
  queryTenantMenuTree(props.tenantId).then(res => {
    treeData.value = res.data || [];
  })
}

// 提交
function onSubmit(){
  if (!props.tenantId) return;
  // 将树形数据平铺，收集所有 menuId + menuAliasName
  const aliasList = flattenTree(treeData.value).map(item => ({
    menuId: item.id,
    menuAliasName: item.menuAliasName || ''
  }));

  updateMenuAlias({
    tenantId: props.tenantId,
    aliasList
  }).then(() => {
    Message.success('菜单别名保存成功');
    emit('close');
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

<style scoped lang="scss">
.alias-table {
  width: 100%;
  height: 460px;
}
</style>
