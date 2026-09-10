<template>
  <CommonSplitPage left-title="角色管理" left-width="600px">
    <!--左侧：角色列表-->
    <template #left>
      <CommonLightTable
          :data="table.data"
          :show-page="false"
          @search="initList"
          @resetSearch="resetFilter"
          @selectRowIds="(ids)=>selectRowIds = ids"
          @currentRowChange="onRoleRowClick"
      >
        <!--表格操作-->
        <template #operation>
          <a-button type="primary" @click="toCreate"><template #icon><icon-plus /></template>新建</a-button>
          <a-button type="outline" status="danger" @click="toDelete"><template #icon><icon-delete /></template>删除</a-button>
          <a-button type="outline" @click="onExport"><template #icon><icon-download /></template>导出</a-button>
        </template>

        <!--字段信息-->
        <template #columns>
          <a-table-column title="角色编码" data-index="roleCode" :width="140" ellipsis tooltip />
          <a-table-column title="角色名称" data-index="roleName" :width="140" ellipsis tooltip />
          <a-table-column title="操作" :width="60">
            <template #cell="{ record }">
              <a @click.stop="toEdit(record)">编辑</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>

    <!--右侧：Tab切换-->
    <template #right>
      <a-empty v-if="!currentRole" description="请先选择一个角色" style="margin: auto" />

      <CommonRadioPage v-else title1="菜单分配" title2="菜单重命名">
        <template #tab1>
          <EditRoleMenu :role-id="currentRole?.id" />
        </template>
        <template #tab2>
          <EditRoleMenuAlias :role-id="currentRole?.id" />
        </template>
      </CommonRadioPage>
    </template>
  </CommonSplitPage>

  <!--新建/编辑-->
  <EditRole
      v-if="modalShow.edit"
      :edit-data="currentEditRow"
      @close="modalShow.edit = false; currentEditRow={}; initList();"
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonRadioPage from "../../../core/component/CommonPage/CommonRadioPage.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import EditRole from "./EditRole.vue";
import EditRoleMenu from "./EditRoleMenu.vue";
import EditRoleMenuAlias from "./EditRoleMenuAlias.vue";
import {deleteRole, exportRole, queryRole} from "../../../api/core/user/user.js";
import {Message, Modal} from "@arco-design/web-vue";
import {downloadFile} from "../../../utils/file.js";


// 表格数据
const table = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 500,
  tableFilter: { roleName: '', roleCode: '' }
});

// 选中数据ID
const selectRowIds = ref([]);

// 当前选中的角色（点击行）
const currentRole = ref(null);

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false
})

onMounted(()=>{
  initList();
})

// 初始化查询
function initList(){
  const params = {
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...table.value.tableFilter
  }

  queryRole(params).then(res=>{
    selectRowIds.value = [];
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
    // 如果当前选中角色已被删除，清除选中
    if (currentRole.value && !table.value.data.find(d => d.id === currentRole.value.id)){
      currentRole.value = null;
    }
  })
}

// 重置查询条件
function resetFilter(){
  table.value.tableFilter = { roleName: '', roleCode: '' };
  initList();
}

// 点击角色行
function onRoleRowClick(record){
  currentRole.value = record;
}

// 新建
function toCreate(){
  currentEditRow.value = {};
  modalShow.value.edit = true;
}

// 导出
function onExport(){
  exportRole().then(res=>{
    downloadFile(res);
  })
}

// 编辑
function toEdit(row){
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 删除
function toDelete(){
  if (selectRowIds.value.length === 0){
    Modal.warning({ title: '操作提示', content: '请先勾选要删除的数据！', titleAlign: 'start' })
    return;
  }

  Modal.confirm({
    title: `确定要删除勾选的数据吗?`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    onOk: ()=>{
      deleteRole(selectRowIds.value).then(()=>{
        initList();
      })
    }
  });
}
</script>

<style scoped>
</style>

