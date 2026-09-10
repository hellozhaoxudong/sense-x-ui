<template>
  <CommonLightTable
      title="用户管理"
      :data="table.data"
      :total="table.total"
      @search="initData"
      @selectRowIds="(ids)=>selectRowIds = ids"
      :page="table.page"
      :page-size="table.pageSize"
      @pageChange="(p, s)=>{ table.page = p; table.pageSize = s; initData(); }"
  >
    <!--查询区域-->
    <template #search>
      <SearchItem label="登录名称"><a-input v-model="table.tableFilter.username" size="small"/></SearchItem>
      <SearchItem label="用户姓名"><a-input v-model="table.tableFilter.name" size="small"/></SearchItem>
      <SearchItem label="邮箱"><a-input v-model="table.tableFilter.email" size="small"/></SearchItem>
      <SearchItem label="手机号"><a-input v-model="table.tableFilter.phone" size="small"/></SearchItem>
    </template>

    <!--表格操作-->
    <template #operation>
      <a-button type="primary" @click="modalShow.edit=true"><template #icon><icon-plus /></template>新建</a-button>
      <a-button type="primary" status="danger" @click="onDelete()"><template #icon><icon-delete /></template>删除</a-button>
      <a-button type="outline"><template #icon><icon-upload /></template>导入</a-button>
      <a-button type="outline"><template #icon><icon-download /></template>导出</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="登录名" data-index="username" :width="140" ellipsis tooltip />
      <a-table-column title="用户姓名" data-index="name" :width="160" ellipsis tooltip />
      <a-table-column title="性别" data-index="sex" :width="70" ellipsis tooltip>
        <template #cell="{ record }">
          <span v-if="record.sex==='M'">男</span>
          <span v-else-if="record.sex==='W'">女</span>
          <span v-else>未知</span>
        </template>
      </a-table-column>
      <a-table-column title="手机号" data-index="phone" :width="160" ellipsis tooltip />
      <a-table-column title="邮箱" data-index="email" :width="200" ellipsis tooltip />
      <a-table-column title="角色" data-index="roleNames" ellipsis tooltip />
      <a-table-column title="锁定" data-index="locked" :width="90" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.locked==='Y'" color="danger">red</a-tag>
          <a-tag v-else>未锁定</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="启用" data-index="enabled" :width="90" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.enabled==='Y'" color="arcoblue">启用中</a-tag>
          <a-tag v-else>未启用</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="operation" fixed="right" :width="140" ellipsis tooltip>
        <template #cell="{ record }">
          <TextBtns>
            <div @click="onEdit(record)">编辑</div>
            <div @click="onAssignRole(record)">分配角色</div>
          </TextBtns>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>

  <!--新建/编辑-->
  <EditUser v-if="modalShow.edit" :edit-data="currentEditRow" @close="modalShow.edit = false; currentEditRow={}; initData();" />

  <!--分配角色-->
  <UserRole v-if="modalShow.role" :user-data="currentRoleUser" @close="modalShow.role = false; currentRoleUser={};" @success="initData()" />
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {onMounted, ref} from "vue";
import HttpRequest from "../../../utils/request.js";
import EditUser from "./EditUser.vue";
import UserRole from "./UserRole.vue";
import {deleteRole, deleteUser, queryUser} from "../../../api/core/user/user.js";
import {Message, Modal} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import TextBtns from "../../../core/component/CommonBtn/TextBtns.vue";

// 表格数据
const table = ref({
  data: [], // 数据
  total: 0, // 总数
  page: 1,  // 显示第几页
  pageSize: 50, // 每页显示多少条
  tableFilter: { username: '', name: '', email: '', phone: '' } // 表格筛选
});
// 选中数据ID
const selectRowIds = ref([]);

// 编辑中的一行
const currentEditRow = ref({});

// 当前分配角色的用户
const currentRoleUser = ref({});

// 弹窗
const modalShow = ref({
  edit: false,
  role: false
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

  queryUser(params).then(res=>{
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

// 编辑
function onEdit(row){
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 分配角色
function onAssignRole(row){
  currentRoleUser.value = row;
  modalShow.value.role = true;
}

// 删除
function onDelete(){
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
      deleteUser(selectRowIds).then(res=>{
        initData();
      })
    }
  });
}
</script>


<style scoped>

</style>