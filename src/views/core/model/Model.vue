<template>
  <CommonLightTable
      title="模型管理"
      :data="table.data"
      :total="table.total"
      :show-page="false"
      @search="initData"
      @selectRowIds="(ids)=>selectRowIds = ids"
      :page="table.page"
      :page-size="table.pageSize"
      @pageChange="(p, s)=>{ table.page = p; table.pageSize = s; initData(); }"
  >
    <!--查询区域-->
    <template #search>
      <SearchItem label="模型类型">
        <a-select v-model="table.tableFilter.modelType" allow-clear placeholder="请选择模型类型" size="small">
          <a-option value="Chat">Chat</a-option>
          <a-option value="Embedding">Embedding</a-option>
        </a-select>
      </SearchItem>
    </template>

    <!--表格操作-->
    <template #operation>
      <a-button type="primary" @click="currentEditRow={}; modalShow.edit = true"><template #icon><icon-plus /></template>新建</a-button>
      <a-button type="primary" status="danger" @click="onDeleteModel()"><template #icon><icon-delete /></template>删除</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="模型类型" data-index="modelType" ellipsis tooltip />
      <a-table-column title="模型标题" data-index="modelTitle" ellipsis tooltip />
      <a-table-column title="模型名称" data-index="modelName" ellipsis tooltip />
      <a-table-column title="调用地址" data-index="baseUrl" ellipsis tooltip />
      <a-table-column title="是否启用" data-index="enable" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.enable === 'Y'" color="green">启用</a-tag>
          <a-tag v-else color="red">停用</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="operation" :width="140" fixed="right" ellipsis tooltip>
        <template #cell="{ record }">
          <a @click="onEdit(record)">编辑</a>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>

  <!--新建/编辑-->
  <ModelEdit
      v-if="modalShow.edit"
      :edit-data="currentEditRow"
      @close="modalShow.edit = false; currentEditRow={}; initData();"
  />
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import { onMounted, ref } from "vue";
import ModelEdit from "./ModelEdit.vue";
import { deleteModel, queryModel } from "../../../api/core/agent/model.js";
import { Message, Modal } from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";


// 表格数据
const table = ref({
  data: [], // 数据
  total: 0, // 总数（本页数据量，用于展示）
  page: 1,  // 显示第几页（暂未启用分页）
  pageSize: 50, // 每页显示多少条
  tableFilter: { modelType: "" } // 表格筛选
});

// 选中数据ID
const selectRowIds = ref([]);

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false
});

onMounted(() => {
  initData();
});

// 初始化查询
function initData() {
  const params = {
    modelType: table.value.tableFilter.modelType || undefined
  };

  queryModel(params)
      .then(res => {
        const list = res.data || [];
        table.value.data = list;
        table.value.total = list.length;
      });
}

// 编辑
function onEdit(row) {
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 删除
function onDeleteModel() {
  if (!selectRowIds.value || selectRowIds.value.length === 0) {
    Message.warning("请选择要删除的数据");
    return;
  }

  Modal.confirm({
    title: '操作确认',
    content: '确定要删除吗？',
    onOk: ()=>{
      deleteModel(selectRowIds.value)
          .then(() => {
            Message.success("删除成功");
            initData();
          });
    }
  });
}
</script>

<style scoped>
</style>

