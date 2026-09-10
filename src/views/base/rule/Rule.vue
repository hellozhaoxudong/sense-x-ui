<template>
  <CommonSplitPage left-title="规则分类" right-title="规则列表" left-width="380px">
    <!--左侧：分类列表-->
    <template #left>
      <CommonList
          :list="folderList"
          key-props="id"
          title-props="folderName"
          desc-props="createDate"
          @create="toCreateFolder"
          @select="onFolderSelect"
      >
        <template #item-operation="{ item }">
          <a-doption @click="toEditFolder(item)">编辑</a-doption>
          <a-doption @click="toDeleteSingleFolder(item)">删除</a-doption>
        </template>
      </CommonList>
    </template>

    <!--右侧：规则列表-->
    <template #right>
      <CommonLightTable
          :data="ruleTable.datas"
          :total="ruleTable.total"
          :page="ruleTable.page"
          :page-size="ruleTable.pageSize"
          @page-change="onPageChange"
          @select-row-ids="(ids)=> ruleSelectedIds = ids"
      >
        <template #search>
          <SearchItem label="规则名称">
            <a-input v-model="ruleFilter.ruleName" size="small" allow-clear @change="loadRuleList" />
          </SearchItem>
        </template>

        <template #operation>
          <a-button type="primary" @click="toCreateRule" :disabled="!currentFolder">新建</a-button>
          <a-popconfirm content="确定删除选中规则？" @ok="toDeleteRule">
            <a-button status="danger" :disabled="!currentFolder || ruleSelectedIds.length === 0">删除</a-button>
          </a-popconfirm>
        </template>

        <template #columns>
          <a-table-column title="规则编码" data-index="ruleCode" :width="150" ellipsis tooltip />
          <a-table-column title="规则名称" data-index="ruleName" :width="160" ellipsis tooltip />
          <a-table-column title="状态" data-index="ruleStatus" :width="100">
            <template #cell="{ record }">
              <a-tag v-if="record.ruleStatus === '已上线'" color="green" size="small">已上线</a-tag>
              <a-tag v-else color="orange" size="small">编辑中</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createDate" :width="180" ellipsis tooltip />
          <a-table-column title="操作" :width="180" fixed="right">
            <template #cell="{ record }">
              <a @click="toEditRule(record)" style="margin-right: 8px">编辑</a>
              <a-popconfirm content="确定上线此规则？" @ok="toOnlineRule(record)">
                <a :style="{ color: record.ruleStatus === '已上线' ? '#999' : '', marginRight: '8px' }">上线</a>
              </a-popconfirm>
              <a @click="toRunRule(record)" :style="{ color: record.ruleStatus !== '已上线' ? '#999' : '', marginRight: '8px' }">运行</a>
              <a @click="toShowRunLog(record)">日志</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--分类弹窗-->
  <EditFolder v-if="modalShow.editFolder" :edit-data="currentEditFolder" @close="modalShow.editFolder = false; loadFolderList();" />
  <!--规则弹窗-->
  <EditRule v-if="modalShow.editRule" :edit-data="currentEditRule" @close="modalShow.editRule = false; loadRuleList();" />
  <!--运行日志弹窗-->
  <RuleRunLog v-if="modalShow.runLog" :rule-id="currentLogRuleId" @close="modalShow.runLog = false" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonList from "../../../core/component/CommonList/CommonList.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import EditFolder from "./EditFolder.vue";
import EditRule from "./EditRule.vue";
import RuleRunLog from "./RuleRunLog.vue";
import {queryRuleFolders, deleteRuleFolder, queryRules, deleteRule, onlineRule, runRule} from "../../../api/base/rule.js";
import {Message} from "@arco-design/web-vue";

// === 左侧：分类 ===
const folderList = ref([]);
const currentFolder = ref(null);
const currentEditFolder = ref({});

// === 右侧：规则 ===
const ruleTable = ref({
  datas: [],
  total: 0,
  page: 1,
  pageSize: 50,
});
const ruleFilter = ref({ ruleName: '' });
const ruleSelectedIds = ref([]);
const currentEditRule = ref({});

// 弹窗状态
const modalShow = ref({
  editFolder: false,
  editRule: false,
  runLog: false,
});
const currentLogRuleId = ref(null);

onMounted(()=>{
  loadFolderList();
})

// 查询分类列表
function loadFolderList(){
  queryRuleFolders().then(res=>{
    folderList.value = res.data || [];
    // 如果当前选中分类已不在列表中，清空
    if (currentFolder.value && !folderList.value.find(d => d.id === currentFolder.value.id)){
      currentFolder.value = null;
      ruleTable.value.datas = [];
      ruleTable.value.total = 0;
    }
  })
}

// 选中分类
function onFolderSelect(item){
  currentFolder.value = item;
  ruleTable.value.page = 1;
  loadRuleList();
}

// 新建分类
function toCreateFolder(){
  currentEditFolder.value = {};
  modalShow.value.editFolder = true;
}

// 编辑分类
function toEditFolder(row){
  currentEditFolder.value = row;
  modalShow.value.editFolder = true;
}

// 删除单个分类
function toDeleteSingleFolder(row){
  deleteRuleFolder([row.id]).then(()=>{
    Message.success('删除成功');
    loadFolderList();
  })
}

// 查询规则列表
function loadRuleList(){
  if (!currentFolder.value) return;
  queryRules({
    folderId: currentFolder.value.id,
    ruleName: ruleFilter.value.ruleName,
    page: ruleTable.value.page,
    pageSize: ruleTable.value.pageSize,
  }).then(res=>{
    ruleTable.value.datas = res.data || [];
    ruleTable.value.total = parseInt(res.headers['x-total-count']) || 0;
  })
}

// 分页切换
function onPageChange(page, pageSize){
  ruleTable.value.page = page;
  ruleTable.value.pageSize = pageSize;
  loadRuleList();
}

// 新建规则
function toCreateRule(){
  currentEditRule.value = { folderId: currentFolder.value?.id, ruleStatus: '编辑中' };
  modalShow.value.editRule = true;
}

// 编辑规则
function toEditRule(row){
  currentEditRule.value = row;
  modalShow.value.editRule = true;
}

// 删除规则
function toDeleteRule(){
  if (!ruleSelectedIds.value || ruleSelectedIds.value.length === 0){
    Message.warning('请选择要删除的规则');
    return;
  }
  deleteRule(ruleSelectedIds.value).then(()=>{
    Message.success('删除成功');
    ruleSelectedIds.value = [];
    loadRuleList();
  })
}

// 规则上线
function toOnlineRule(row){
  onlineRule(row.id).then(()=>{
    Message.success('上线成功');
    loadRuleList();
  })
}

// 运行规则
function toRunRule(row){
  if (row.ruleStatus !== '已上线') {
    Message.warning('只有已上线的规则才可运行');
    return;
  }
  runRule(row.id).then(res=>{
    Message.success('运行完成');
  })
}

// 查看运行日志
function toShowRunLog(row){
  currentLogRuleId.value = row.id;
  modalShow.value.runLog = true;
}
</script>

<style scoped>
</style>
