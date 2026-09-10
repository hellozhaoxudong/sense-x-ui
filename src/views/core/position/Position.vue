<template>
  <CommonSplitPage left-title="岗位管理" right-title="岗位用户" left-width="60%">
    <!--左侧：岗位列表-->
    <template #left>
      <CommonLightTable
          :data="positionList"
          :show-page="false"
          @search="initPositionList"
          @selectRowIds="(ids)=> posSelectedIds = ids"
          @currentRowChange="onPositionRowClick"
          @resetSearch="posFilter.postName=''; initPositionList();"
      >
        <template #operation>
          <a-button type="primary" @click="toCreatePosition"><template #icon><icon-plus /></template>新建</a-button>
          <a-button type="outline" status="danger" @click="toDeletePosition"><template #icon><icon-delete /></template>删除</a-button>
        </template>
        <template #columns>
          <a-table-column title="岗位编码" data-index="postCode" :width="100" ellipsis tooltip />
          <a-table-column title="岗位名称" data-index="postName" :width="120" ellipsis tooltip />
          <a-table-column title="岗位序列" data-index="postSequence" :width="80" ellipsis tooltip />
          <a-table-column title="编制人数" data-index="employeeCount" :width="70" />
          <a-table-column title="状态" data-index="status" :width="70">
            <template #cell="{ record }">
              <a-tag v-if="record.status === 'Y'" color="green" size="small">启用</a-tag>
              <a-tag v-else color="red" size="small">停用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="60">
            <template #cell="{ record }">
              <a @click.stop="toEditPosition(record)">编辑</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>

    <!--右侧：岗位用户列表-->
    <template #right>
      <a-empty v-if="!currentPosition" description="请先选择一个岗位" style="margin: auto" />

      <CommonLightTable
          v-else
          :data="userList"
          :show-page="false"
          @search="initUserList"
          @selectRowIds="(ids)=> userSelectedIds = ids"
          @resetSearch="initUserList"
      >
        <template #operation>
          <a-button type="primary" @click="toAddUser"><template #icon><icon-plus /></template>添加用户</a-button>
          <a-button type="outline" status="danger" @click="toRemoveUser"><template #icon><icon-delete /></template>移除</a-button>
        </template>
        <template #columns>
          <a-table-column title="用户名" data-index="username" :width="120" ellipsis tooltip />
          <a-table-column title="姓名" data-index="name" :width="100" ellipsis tooltip />
          <a-table-column title="手机号" data-index="phone" :width="130" ellipsis tooltip />
          <a-table-column title="邮箱" data-index="email" ellipsis tooltip />
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--新建/编辑岗位-->
  <EditPosition v-if="modalShow.edit" :edit-data="currentEditPosition" @close="modalShow.edit = false; initPositionList();" />

  <!--添加用户弹窗-->
  <AddUserModal v-if="modalShow.addUser" :position-id="currentPosition?.id" @close="modalShow.addUser = false; initUserList();" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import EditPosition from "./EditPosition.vue";
import AddUserModal from "./AddUserModal.vue";
import {
  queryPosition,
  deletePosition,
  queryPositionUser,
  removePositionUser,
  deleteRole
} from "../../../api/core/user/user.js";
import {Message, Modal} from "@arco-design/web-vue";

// === 左侧：岗位 ===
const positionList = ref([]);
const posFilter = ref({ postName: '' });
const posSelectedIds = ref([]);
const currentPosition = ref(null);
const currentEditPosition = ref({});

// === 右侧：用户 ===
const userList = ref([]);
const userSelectedIds = ref([]);

// 弹窗状态
const modalShow = ref({
  edit: false,
  addUser: false,
});

onMounted(()=>{
  initPositionList();
})

// 查询岗位列表
function initPositionList(){
  queryPosition({ page: 1, pageSize: 500, ...posFilter.value }).then(res=>{
    positionList.value = res.data;
    if (currentPosition.value && !positionList.value.find(d => d.id === currentPosition.value.id)){
      currentPosition.value = null;
      userList.value = [];
    }
  })
}

// 点击岗位行
function onPositionRowClick(record){
  currentPosition.value = record;
  initUserList();
}

// 新建岗位
function toCreatePosition(){
  currentEditPosition.value = {};
  modalShow.value.edit = true;
}

// 编辑岗位
function toEditPosition(row){
  currentEditPosition.value = row;
  modalShow.value.edit = true;
}

// 删除岗位
function toDeletePosition(){
  if (posSelectedIds.value.length === 0){
    Modal.warning({ title: '操作提示', content: '请先勾选要删除的数据！', titleAlign: 'start' })
    return;
  }

  Modal.confirm({
    title: `确定要删除勾选的数据吗?`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    onOk: ()=>{
      deletePosition(posSelectedIds.value).then(()=>{
        Message.success('删除成功');
        initPositionList();
      })
    }
  });
}

// 查询岗位用户列表
function initUserList(){
  if (!currentPosition.value) return;
  queryPositionUser({ positionId: currentPosition.value.id }).then(res=>{
    userList.value = res.data;
  })
}

// 添加用户
function toAddUser(){
  modalShow.value.addUser = true;
}

// 移除用户
function toRemoveUser(){
  if (userSelectedIds.value.length === 0){
    Modal.warning({ title: '操作提示', content: '请先勾选要删除的数据！', titleAlign: 'start' })
    return;
  }

  Modal.confirm({
    title: `确定要删除勾选的数据吗?`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    onOk: ()=>{

      removePositionUser({ positionId: currentPosition.value.id }, userSelectedIds.value).then(()=>{
        Message.success('移除成功');
        initUserList();
      })
    }
  });
}
</script>

<style scoped>
</style>
