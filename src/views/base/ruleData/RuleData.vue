<template>
  <CommonSplitPage left-title="规则数据" right-title="数据详情" left-width="380px">
    <!--左侧：规则数据列表-->
    <template #left>
      <CommonList
          :list="ruleDataList"
          key-props="id"
          title-props="dataName"
          desc-props="dataCode"
          @create="toCreateRuleData"
          @select="onRuleDataSelect"
      >
        <template #item-operation="{ item }">
          <a-doption @click="toEditRuleData(item)">编辑</a-doption>
          <a-doption @click="toDeleteRuleData(item)">删除</a-doption>
        </template>
      </CommonList>
    </template>

    <!--右侧：数据详情列表-->
    <template #right>
      <CommonLightTable
          :data="detailTable.datas"
          :total="detailTable.total"
          :page="detailTable.page"
          :page-size="detailTable.pageSize"
          @search="loadDetailList"
          @resetSearch="loadDetailList"
          @page-change="onPageChange"
      >
        <template #operation>
          <!--导入按钮：通过 a-upload 直接上传-->
          <a-upload
              v-if="currentRuleData"
              :action="`/api/base/ruleDataDetail/import?ruleDataId=${currentRuleData.id}`"
              :headers="{ Authorization: token }"
              :show-file-list="false"
              accept=".json"
              @success="onImportSuccess"
              @error="onImportError"
          >
            <template #upload-button>
              <a-button type="primary" :disabled="!currentRuleData">导入</a-button>
            </template>
          </a-upload>
          <a-button v-else type="primary" disabled>导入</a-button>

          <a-button :disabled="!currentRuleData" @click="toExport">导出</a-button>

          <a-popconfirm content="确定清空该规则数据下的所有详情？" @ok="toClear">
            <a-button status="danger" :disabled="!currentRuleData">清空</a-button>
          </a-popconfirm>
        </template>

        <template #columns>
          <a-table-column title="ID" data-index="id" :width="80" ellipsis tooltip />
          <a-table-column title="数据内容" data-index="dataContent" ellipsis tooltip />
          <a-table-column title="创建时间" data-index="createDate" :width="180" ellipsis tooltip />
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--新建/编辑规则数据弹窗-->
  <EditRuleData v-if="modalShow.editRuleData" :edit-data="currentEditRuleData" @close="modalShow.editRuleData = false; loadRuleDataList();" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonList from "../../../core/component/CommonList/CommonList.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import EditRuleData from "./EditRuleData.vue";
import {queryRuleDataList, deleteRuleData, queryRuleDataDetailPage, exportRuleDataDetail, clearRuleDataDetail} from "../../../api/base/ruleData.js";
import {Message} from "@arco-design/web-vue";

// token（用于 a-upload 请求头鉴权）
const token = ref(sessionStorage.getItem('sense.access_token'));

// === 左侧：规则数据 ===
const ruleDataList = ref([]);
const currentRuleData = ref(null);
const currentEditRuleData = ref({});

// === 右侧：数据详情 ===
const detailTable = ref({
  datas: [],
  total: 0,
  page: 1,
  pageSize: 50,
});

// 弹窗状态
const modalShow = ref({
  editRuleData: false,
});

onMounted(() => {
  loadRuleDataList();
})

// 查询规则数据列表
function loadRuleDataList() {
  queryRuleDataList().then(res => {
    ruleDataList.value = res.data || [];
    // 如果当前选中项已不在列表中，清空
    if (currentRuleData.value && !ruleDataList.value.find(d => d.id === currentRuleData.value.id)) {
      currentRuleData.value = null;
      detailTable.value.datas = [];
      detailTable.value.total = 0;
    }
  })
}

// 选中规则数据
function onRuleDataSelect(item) {
  currentRuleData.value = item;
  detailTable.value.page = 1;
  loadDetailList();
}

// 新建规则数据
function toCreateRuleData() {
  currentEditRuleData.value = {};
  modalShow.value.editRuleData = true;
}

// 编辑规则数据
function toEditRuleData(row) {
  currentEditRuleData.value = row;
  modalShow.value.editRuleData = true;
}

// 删除规则数据（单条）
function toDeleteRuleData(row) {
  deleteRuleData([row.id]).then(() => {
    Message.success('删除成功');
    loadRuleDataList();
  })
}

// 查询数据详情列表
function loadDetailList() {
  if (!currentRuleData.value) return;
  queryRuleDataDetailPage({
    ruleDataId: currentRuleData.value.id,
    page: detailTable.value.page,
    pageSize: detailTable.value.pageSize,
  }).then(res => {
    detailTable.value.datas = res.data || [];
    detailTable.value.total = parseInt(res.headers['x-total-count']) || 0;
  })
}

// 分页切换
function onPageChange(page, pageSize) {
  detailTable.value.page = page;
  detailTable.value.pageSize = pageSize;
  loadDetailList();
}

// 导入成功回调
function onImportSuccess() {
  Message.success('导入成功');
  loadDetailList();
}

// 导入失败回调
function onImportError() {
  Message.error('导入失败，请确认文件格式为 JSON 数组');
}

// 导出
function toExport() {
  if (!currentRuleData.value) return;
  exportRuleDataDetail({ ruleDataId: currentRuleData.value.id }).then(res => {
    const blob = new Blob([res.data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentRuleData.value.dataName}_数据导出.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    Message.success('导出成功');
  })
}

// 清空详情
function toClear() {
  if (!currentRuleData.value) return;
  clearRuleDataDetail(currentRuleData.value.id).then(() => {
    Message.success('清空成功');
    loadDetailList();
  })
}
</script>

<style scoped>
</style>
