<template>
  <CommonLightTable
      title="租户管理"
      :data="table.data"
      :show-page="false"
      @search="initData"
      @selectRowIds="(ids)=>selectRowIds = ids"
  >
    <!--查询区域-->
    <template #search>
      <SearchItem label="租户编码"><a-input v-model="table.tableFilter.tenantCode" size="small"/></SearchItem>
      <SearchItem label="租户名称"><a-input v-model="table.tableFilter.tenantName" size="small"/></SearchItem>
      <SearchItem label="公司名称"><a-input v-model="table.tableFilter.companyName" size="small"/></SearchItem>
    </template>

    <!--表格操作-->
    <template #operation>
      <a-button type="primary" @click="currentEditRow={}; modalShow.edit=true"><template #icon><icon-plus /></template>新建</a-button>
      <a-button type="primary" status="danger" @click="onDeleteTenant()"><template #icon><icon-delete /></template>删除</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="租户编码" data-index="tenantCode" :width="120" ellipsis tooltip />
      <a-table-column title="租户名称" data-index="tenantName" :width="140" ellipsis tooltip />
      <a-table-column title="公司名称" data-index="companyName" :width="140" ellipsis tooltip />
      <a-table-column title="用户上限" data-index="userLimit" :width="80" ellipsis tooltip  align="center" />
      <a-table-column title="有效期" data-index="expirationDate" :width="120" ellipsis tooltip  align="center" />
      <a-table-column title="启用" data-index="enabled" :width="80" ellipsis tooltip  align="center">
        <template #cell="{ record }">
          <a-tag v-if="record.enabled === 1 || record.enabled === 'Y'" color="arcoblue">启用</a-tag>
          <a-tag v-else color="red">停用</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="operation" fixed="right" :width="180" align="center">
        <template #cell="{ record }">
          <TextBtns>
            <div @click="onOpenMenu(record)">分配菜单</div>
            <div @click="onOpenMenuAlias(record)">菜单重命名</div>
            <div @click="onOpenAdmin(record)">租户管理员</div>
            <div @click="onEdit(record)">编辑</div>
          </TextBtns>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>

  <!--新建/编辑租户-->
  <TenantEdit v-if="modalShow.edit" :edit-data="currentEditRow" @close="modalShow.edit = false; currentEditRow={}; initData();" />

  <!--分配菜单-->
  <EditTenantMenu v-if="modalShow.menu" :tenant-id="currentTenant.id" @close="modalShow.menu = false" />

  <!--菜单重命名-->
  <EditTenantMenuAlias v-if="modalShow.menuAlias" :tenant-id="currentTenant.id" @close="modalShow.menuAlias = false" />

  <!--租户管理员-->
  <EditTenantAdmin v-if="modalShow.admin" :tenant-id="currentTenant.id" @close="modalShow.admin = false" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import TenantEdit from "./TenantEdit.vue";
import EditTenantMenu from "./EditTenantMenu.vue";
import EditTenantMenuAlias from "./EditTenantMenuAlias.vue";
import EditTenantAdmin from "./EditTenantAdmin.vue";
import {deleteTenant, queryTenant} from "../../../api/core/user/user.js";
import {Message, Modal} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import TextBtns from "../../../core/component/CommonBtn/TextBtns.vue";


// 表格数据
const table = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 500,
  tableFilter: { tenantCode: '', tenantName: '', companyName: '' }
});

// 选中数据ID
const selectRowIds = ref([]);

// 当前操作租户
const currentTenant = ref({});

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false,
  menu: false,
  menuAlias: false,
  admin: false,
})

onMounted(()=>{
  initData();
})

// 初始化查询
function initData(){
  const params = {
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...table.value.tableFilter
  }

  queryTenant(params).then(res=>{
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

// 编辑
function onEdit(row){
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 打开分配菜单
function onOpenMenu(row){
  currentTenant.value = row;
  modalShow.value.menu = true;
}

// 打开菜单重命名
function onOpenMenuAlias(row){
  currentTenant.value = row;
  modalShow.value.menuAlias = true;
}

// 打开租户管理员
function onOpenAdmin(row){
  currentTenant.value = row;
  modalShow.value.admin = true;
}

// 删除
function onDeleteTenant(){
  if (!selectRowIds.value || selectRowIds.value.length === 0){
    Message.warning('请选择要删除的数据');
    return;
  }

  Modal.confirm({
    title: '操作确认',
    content: '确定要删除吗？',
    onOk: ()=>{
      deleteTenant(selectRowIds.value).then(()=>{
        Message.success('删除成功');
        initData();
      })
    }
  });
}
</script>

<style scoped>
</style>
