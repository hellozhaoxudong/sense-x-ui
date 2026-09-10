<template>
  <CommonLightTable
      title="企业管理"
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
      <SearchItem label="企业名称"><a-input v-model="table.tableFilter.companyName" size="small"/></SearchItem>
      <SearchItem label="企业编码"><a-input v-model="table.tableFilter.companyCode" size="small"/></SearchItem>
      <SearchItem label="信用代码"><a-input v-model="table.tableFilter.socialCreditCode" size="small"/></SearchItem>
    </template>

    <!--表格操作-->
    <template #operation>
      <a-button type="primary" @click="modalShow.edit=true"><template #icon><icon-plus /></template>新建</a-button>
      <a-button type="primary" status="danger" @click="onDeleteCompany()"><template #icon><icon-delete /></template>删除</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="企业名称" data-index="companyName" :width="180" ellipsis tooltip />
      <a-table-column title="企业编码" data-index="companyCode" :width="140" ellipsis tooltip />
      <a-table-column title="统一社会信用代码" data-index="socialCreditCode" :width="200" ellipsis tooltip />
      <a-table-column title="法人" data-index="legalPerson" :width="120" ellipsis tooltip />
      <a-table-column title="联系人" data-index="contactName" :width="120" ellipsis tooltip />
      <a-table-column title="联系电话" data-index="contactPhone" :width="140" ellipsis tooltip />
      <a-table-column title="省份" data-index="province" :width="100" ellipsis tooltip />
      <a-table-column title="城市" data-index="city" :width="100" ellipsis tooltip />
      <a-table-column title="状态" data-index="status" :width="80" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.status === 1" color="green">启用</a-tag>
          <a-tag v-else color="red">停用</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="operation" fixed="right" :width="140" ellipsis tooltip>
        <template #cell="{ record }">
          <a @click="onEdit(record)">编辑</a>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>

  <!--新建/编辑-->
  <CompanyEdit v-if="modalShow.edit" :edit-data="currentEditRow" @close="modalShow.edit = false; currentEditRow={}; initData();" />
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {onMounted, ref} from "vue";
import CompanyEdit from "./CompanyEdit.vue";
import {deleteCompany, queryCompany} from "../../../api/base/company.js";
import {Message, Modal} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";

// 表格数据
const table = ref({
  data: [], // 数据
  total: 0, // 总数
  page: 1,  // 显示第几页
  pageSize: 50, // 每页显示多少条
  tableFilter: { companyName: '', companyCode: '', socialCreditCode: '' } // 表格筛选
});

// 选中数据ID
const selectRowIds = ref([]);

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false
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

  queryCompany(params).then(res=>{
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

// 编辑
function onEdit(row){
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 删除
function onDeleteCompany(){
  if (!selectRowIds.value || selectRowIds.value.length === 0){
    Message.warning('请选择要删除的数据');
    return;
  }

  Modal.confirm({
    title: '操作确认',
    content: '确定要删除吗？',
    onOk: ()=>{
      deleteCompany(selectRowIds.value).then(()=>{
        Message.success('删除成功');
        initData();
      })
    }
  });
}
</script>

<style scoped>
</style>
