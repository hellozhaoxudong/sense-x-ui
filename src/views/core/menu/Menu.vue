<template>
  <CommonSplitPage left-title="应用管理" right-title="菜单管理" left-width="320px" >
    <template #left>
      <CommonList :list="appData" title-props="appName" desc-props="appCode" @create="showEditApp = true;" @select="onSelectApp">
        <template #image="{ item }">
          <component :is="item.appIcon" :size="22" />
        </template>

        <template #item-operation="{ item }">
          <a-doption @click="currentApp = item; showEditApp = true;">编辑</a-doption>
          <a-doption @click="onDeleteApp(item)">删除</a-doption>
        </template>
      </CommonList>
    </template>

    <template #right>
      <CommonLightTable
          :data="filteredData"
          :show-page="false"
          @search="initList"
          @selectRowIds="(ids)=>selectRowIds = ids"
          @resetSearch="filterText=''; initList();"
      >
        <!--查询区域-->
        <template #search>
          <SearchItem label="菜单名称"><a-input v-model="filterText" allow-clear size="small"/></SearchItem>
        </template>

        <!--表格操作-->
        <template #operation>
          <a-button type="primary" @click="modalShow.edit=true">新建</a-button>
          <a-popconfirm content="确定要删除这些数据？" @ok="toDelete">
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
        </template>

        <!--字段信息-->
        <template #columns>
          <a-table-column title="菜单名称" data-index="menuName" :width="200" ellipsis tooltip />
          <a-table-column title="菜单编码" data-index="menuCode" :width="180" ellipsis tooltip />
          <a-table-column title="菜单图标" data-index="menuIcon" :width="120" ellipsis tooltip />
          <a-table-column title="菜单路由" data-index="menuPath" ellipsis tooltip />
          <a-table-column title="排序号" data-index="sortOrder" :width="120" />
          <a-table-column title="操作" :width="80" fixed="right">
            <template #cell="{ record }">
              <a @click="toEdit(record)">编辑</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--新建/编辑-->
  <EditMenu v-if="modalShow.edit" :edit-data="currentEditRow" :current-app="currentApp" :parent-menu-list="treeData" @close="modalShow.edit = false; currentEditRow={}; initList();"/>

  <!--新建/编辑应用-->
  <EditApp v-if="showEditApp" :edit-data="currentApp" @close="showEditApp = false; currentApp = {}; initApps();"/>
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {onMounted, ref, computed} from "vue";
import EditMenu from "./EditMenu.vue";
import {deleteApp, deleteMenu, queryApps, queryMenuTree} from "../../../api/core/menu.js";
import {Message, Modal} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonList from "../../../core/component/CommonList/CommonList.vue";
import EditApp from "./EditApp.vue";
import {deleteUser} from "../../../api/core/user/user.js";

const filterText = ref('');

// 应用数据
const appData = ref([]);
const currentApp = ref({});
const showEditApp = ref(false);

// 树形数据
const treeData = ref([]);

// 搜索过滤
const filteredData = computed(() => {
  if (!filterText.value) return treeData.value;
  const keyword = filterText.value.toLowerCase();
  return filterTree(treeData.value, keyword);
})

// 递归过滤树
function filterTree(nodes, keyword) {
  if (!nodes) return [];
  const result = [];
  for (const node of nodes) {
    const nameMatch = node.menuName && node.menuName.toLowerCase().includes(keyword);
    const codeMatch = node.menuCode && node.menuCode.toLowerCase().includes(keyword);
    const filteredChildren = filterTree(node.children, keyword);
    if (nameMatch || codeMatch || filteredChildren.length > 0) {
      result.push({ ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children });
    }
  }
  return result;
}

// 选中数据ID
const selectRowIds = ref([]);

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false
})

onMounted(()=>{
  initApps();
})

// 查询应用列表
function initApps(){
  queryApps().then(res=>{
    appData.value = res.data;
  })
}

// 删除应用
function onDeleteApp(item){
  Modal.confirm({
    title: `确定要删除数据吗?`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    onOk: ()=>{
      deleteApp([item.id]).then(res=>{
        initApps();
      })
    }
  });
}

// 选中应用
function onSelectApp(item){
  currentApp.value = item;
  initList();
}

// 加载菜单树
function initList(){
  if (!currentApp.value?.id){
    return;
  }

  queryMenuTree({ appId: currentApp.value.id }).then(res => {
    treeData.value = res.data;
  })
}

// 编辑
function toEdit(row){
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 删除
function toDelete(){
  if (!selectRowIds.value || selectRowIds.value.length === 0){
    Message.warning('请选择要删除的数据');
    return;
  }
  deleteMenu(selectRowIds.value).then(()=>{
    Message.success('删除成功');
    initList();
  })
}
</script>

<style scoped>
</style>
