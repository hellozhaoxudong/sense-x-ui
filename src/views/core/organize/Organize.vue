<template>
  <CommonSplitPage left-title="组织部门" right-title="组织用户" left-width="60%">
    <!--左侧：组织部门列表-->
    <template #left>
      <CommonLightTable
          :data="organizeList"
          :show-page="false"
          @search="initOrganizeList"
          @selectRowIds="(ids)=> organizeIds = ids"
          @currentRowChange="onOrganizeRowClick"
      >
        <template #operation>
          <a-button type="primary" @click="toCreate"><template #icon><icon-plus /></template>新建</a-button>
          <a-button type="outline" status="danger" @click="handleDeleteOrganize"><template #icon><icon-delete /></template>删除</a-button>
        </template>

        <template #columns>
          <a-table-column title="部门编码" data-index="organizeCode" :width="140" ellipsis tooltip />
          <a-table-column title="部门名称" data-index="organizeName" :width="140" ellipsis tooltip />
          <a-table-column title="排序号" data-index="sortNum" :width="60" align="right" />
          <a-table-column title="操作" :width="60">
            <template #cell="{ record }">
              <a @click.stop="toEdit(record)">编辑</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>

    <!--右侧：组织用户列表-->
    <template #right>
      <a-empty v-if="!currentOrganize" description="请先选择一个组织" style="margin: auto" />

      <CommonLightTable
          v-else
          :data="userList"
          :show-page="false"
          @search="initUserList"
          @selectRowIds="(ids)=> userIds = ids"
      >
        <template #operation>
          <a-button type="primary" @click="openAddUser"><template #icon><icon-plus /></template>添加用户</a-button>
          <a-button type="outline" status="danger" @click="handleRemoveUsers"><template #icon><icon-delete /></template>移除</a-button>
        </template>

        <template #columns>
          <a-table-column title="登录名" data-index="username" :width="120" ellipsis tooltip />
          <a-table-column title="姓名" data-index="name" :width="100" ellipsis tooltip />
          <a-table-column title="手机号" data-index="phone" :width="130" ellipsis tooltip />
          <a-table-column title="邮箱" data-index="email" :width="160" ellipsis tooltip />
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--新建/编辑组织部门-->
  <EditOrganize
      v-if="showEditOrganize"
      :edit-data="editData"
      :tree="organizeList"
      @close="showEditOrganize = false; editData = {}; initOrganizeList();"
  />

  <!--添加用户弹窗-->
  <AddOrganizeUser v-if="showNewOrganizeUser" :organize-id="currentOrganize?.id" @close="showNewOrganizeUser=false; initUserList()"/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import EditOrganize from "./EditOrganize.vue";
import AddOrganizeUser from "./AddOrganizeUser.vue";
import {
  deleteOrganize,
  deleteOrganizeUser,
  deleteRole,
  queryOrganizeTree,
  queryOrganizeUser
} from "../../../api/core/user/user.js";
import {Message, Modal} from "@arco-design/web-vue";

// === 左侧：组织部门 ===
const organizeList = ref([]);
const organizeIds = ref([]);
const currentOrganize = ref(null);
const editData = ref({});
const showEditOrganize = ref(false);

// === 右侧：用户 ===
const userList = ref([]);
const userIds = ref([]);

// 弹窗状态
const showNewOrganizeUser = ref(false);

onMounted(()=>{
  initOrganizeList();
})

// 查询组织部门列表
function initOrganizeList(){
  queryOrganizeTree().then(res=>{
    organizeList.value = res.data;
    if (currentOrganize.value && !findNode(organizeList.value, currentOrganize.value.id)){
      currentOrganize.value = null;
      userList.value = [];
    }
  })
}

// 在树中查找节点
function findNode(tree, id){
  for (const node of tree){
    if (node.id === id) return true;
    if (node.children && findNode(node.children, id)) return true;
  }
  return false;
}

// 点击组织部门行
function onOrganizeRowClick(record){
  currentOrganize.value = record;
  initUserList();
}

// 新建组织部门
function toCreate(){
  editData.value = {};
  showEditOrganize.value = true;
}

// 编辑组织部门
function toEdit(row){
  editData.value = row;
  showEditOrganize.value = true;
}

// 删除组织部门
function handleDeleteOrganize(){
  if (!organizeIds.value || organizeIds.value.length === 0){
    Message.warning('请选择要删除的部门');
    return;
  }
  deleteOrganize(organizeIds.value).then(()=>{
    Message.success('删除成功');
    initOrganizeList();
  })
}

// 查询组织用户列表
function initUserList(){
  if (!currentOrganize.value) return;
  queryOrganizeUser({
    organizeId: currentOrganize.value.id
  }).then(res=>{
    userList.value = res.data || [];
    userIds.value = [];
  })
}

// 添加用户
function openAddUser(){
  if (!currentOrganize.value){
    Message.warning('请先选择组织部门');
    return;
  }
  showNewOrganizeUser.value = true;
}

// 移除用户
function handleRemoveUsers(){
  if (userIds.value.length === 0){
    Modal.warning({ title: '操作提示', content: '请先勾选要删除的数据！', titleAlign: 'start' })
    return;
  }

  Modal.confirm({
    title: `确定要删除勾选的数据吗?`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    onOk: ()=>{
      deleteOrganizeUser({ organizeId: currentOrganize.value.id }, userIds.value).then(()=>{
        Message.success('移除成功');
        initUserList();
      })
    }
  });
}
</script>

<style scoped>
</style>