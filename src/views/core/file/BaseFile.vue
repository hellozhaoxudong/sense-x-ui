<template>
  <CommonSplitPage left-width="360px" left-title="业务类型" right-title="文件列表">
    <template #left>
      <CommonList :list="businessTypeList" keyProps="businessType" :show-add="false" titleProps="businessType" descProps="count" @select="onTypeClick">
        <template #image>
          <img src="/src/assets/core/file-type.svg" width="24"/>
        </template>
      </CommonList>
    </template>

    <template #right>
      <CommonLightTable
        :data="fileList.datas"
        :total="fileList.total"
        :page="fileList.page"
        :page-size="fileList.pageSize"
        row-key="oid"
        @page-change="onPageChange"
        @select-row-ids="onSelectIds"
      >
        <template #operation>
          <a-button type="primary" @click="onFileUpload">上传</a-button>
          <a-popconfirm content="确定删除选中文件？" @ok="onDeleteFiles">
            <a-button status="danger" :disabled="selectedIds.length === 0">删除</a-button>
          </a-popconfirm>
        </template>

        <template #columns>
          <a-table-column title="文件唯一ID" data-index="oid" ellipsis tooltip :width="330"/>
          <a-table-column title="文件原始名" data-index="fileName" ellipsis tooltip />
          <a-table-column title="类型" data-index="fileType" ellipsis tooltip :width="120"/>
          <a-table-column title="存储方式" data-index="storeType" ellipsis tooltip :width="120" />
          <a-table-column title="上传时间" data-index="createDate" ellipsis tooltip :width="180" />
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>
</template>

<script setup>

import { onMounted, ref } from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import { queryBusinessTypes, queryFiles, deleteFiles } from "../../../api/base/file.js";
import CommonList from "../../../core/component/CommonList/CommonList.vue";
import {OpenUpload} from "../../../core/component/CommonFile/uploadFile.js";
import { Message } from "@arco-design/web-vue";

// === 左侧：业务类型 ===
const businessTypeList = ref([]);
const currentType = ref({});
const selectedIds = ref([]);

// === 右侧：文件列表 ===
const fileList = ref({
  datas: [],
  total: 0,
  page: 1,
  pageSize: 50,
});

onMounted(() => {
  loadBusinessTypes();
});

// 加载业务类型列表
function loadBusinessTypes() {
  queryBusinessTypes().then(res => {
    businessTypeList.value = res.data || [];
  });
}

// 点击业务类型
function onTypeClick(type) {
  currentType.value = type;
  fileList.value.page = 1;
  loadFileList();
}

// 表格勾选变化
function onSelectIds(ids) {
  selectedIds.value = ids;
}

// 加载文件列表
function loadFileList() {
  if (!currentType.value) return;
  queryFiles({
    businessType: currentType.value.businessType,
    page: fileList.value.page,
    pageSize: fileList.value.pageSize,
  }).then(res => {
    fileList.value.datas = res.data || [];
    fileList.value.total = parseInt(res.headers['x-total-count']) || 0;
  });
}

// 分页切换
function onPageChange(page, pageSize) {
  fileList.value.page = page;
  fileList.value.pageSize = pageSize;
  loadFileList();
}

// 删除文件
function onDeleteFiles() {
  if (selectedIds.value.length === 0) {
    Message.warning('请选择要删除的文件');
    return;
  }
  deleteFiles(selectedIds.value).then(() => {
    Message.success('删除成功');
    selectedIds.value = [];
    loadFileList();
    loadBusinessTypes();
  });
}

// 文件上传
function onFileUpload(){
  OpenUpload({
    fileTypes: ['xls', 'xlsx'],
    businessType: currentType.value.businessType,
  }).then(res=>{
    if (res){
      // res就是上传的oid
      loadFileList();
    }
  })
}

</script>

<style scoped>
.file-type-list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.type-item {
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.type-item:hover {
  background-color: #e8f3ff;
}
.type-item.active {
  background-color: #e8f3ff;
  color: #165dff;
  font-weight: 500;
}
</style>