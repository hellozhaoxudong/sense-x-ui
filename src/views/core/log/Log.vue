<template>
  <CommonLightTable
      title="日志管理"
      :data="table.data"
      :total="table.total"
      @search="initList"
      @selectRowIds="(ids)=>selectRowIds = ids"
      :page="table.page"
      :page-size="table.pageSize"
      @pageChange="(p, s)=>{ table.page = p; table.pageSize = s; initList(); }"
      @resetSearch="resetFilter"
  >
    <!--查询区域-->
    <template #search>
      <SearchItem label="用户名称"><a-input v-model="table.tableFilter.username" size="small"/></SearchItem>
      <SearchItem label="请求类型"><a-input v-model="table.tableFilter.name" size="small"/></SearchItem>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="日志ID" data-index="id" :width="140" ellipsis tooltip />
      <a-table-column title="用户名" data-index="userName" :width="140" ellipsis tooltip />
      <a-table-column title="用户IP" data-index="userIp" :width="100" ellipsis tooltip />
      <a-table-column title="操作时间" data-index="logDate" :width="155" ellipsis tooltip />
      <a-table-column title="请求状态码" data-index="repStatus" :width="90" ellipsis tooltip />
      <a-table-column title="请求耗时(ms)" data-index="repCost" :width="100" ellipsis tooltip />
      <a-table-column title="请求类型" data-index="reqMethod" :width="70" ellipsis tooltip />
      <a-table-column title="请求URL" data-index="reqUrl" :width="220" ellipsis tooltip />
      <a-table-column title="日志信息" data-index="logMsg" :width="400" ellipsis tooltip />
    </template>
  </CommonLightTable>
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {onMounted, ref} from "vue";
import {queryLog} from "../../../api/core/log/log.js";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";

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

onMounted(()=>{
  initList();
})

// 初始化查询
function initList(){
  const params = {
    page: table.value.page,
    pageSize: table.value.pageSize,
  }

  queryLog(params, {...table.value.tableFilter}).then(res=>{
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

// 重置查询条件
function resetFilter(){
  table.value.tableFilter = { username: '', name: '', email: '', phone: '' };
  initList();
}
</script>


<style scoped>

</style>