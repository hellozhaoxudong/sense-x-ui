<template>
  <CommonLightTable
      title="运行日志"
      :data="table.data"
      :total="table.total"
      :page="table.page"
      :page-size="table.pageSize"
      :show-selection="false"
      @search="initList"
      @pageChange="(p, s)=>{ table.page = p; table.pageSize = s; initList(); }"
      @resetSearch="resetFilter"
  >
    <!--查询区域-->
    <template #search>
      <SearchItem label="规则编码"><a-input v-model="table.tableFilter.ruleCode" size="small" allow-clear/></SearchItem>
      <SearchItem label="规则名称"><a-input v-model="table.tableFilter.ruleName" size="small" allow-clear/></SearchItem>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="规则分类" data-index="folderName" :width="140" ellipsis tooltip />
      <a-table-column title="规则编码" data-index="ruleCode" :width="150" ellipsis tooltip />
      <a-table-column title="规则名称" data-index="ruleName" :width="160" ellipsis tooltip />
      <a-table-column title="触发时间" data-index="startDate" :width="180" ellipsis tooltip />
      <a-table-column title="结束时间" data-index="endDate" :width="180" ellipsis tooltip />
      <a-table-column title="运行结果" data-index="runResult" ellipsis tooltip />
      <a-table-column title="传入参数" data-index="ruleParams" :width="160" ellipsis tooltip />
    </template>
  </CommonLightTable>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import {queryRunLogPage} from "../../../api/base/rule.js";

const table = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 50,
  tableFilter: { ruleCode: '', ruleName: '' }
});

onMounted(()=>{
  initList();
})

function initList(){
  queryRunLogPage({
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...table.value.tableFilter,
  }).then(res=>{
    table.value.data = res.data || [];
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

function resetFilter(){
  table.value.tableFilter = { ruleCode: '', ruleName: '' };
  initList();
}
</script>

<style scoped>
</style>
