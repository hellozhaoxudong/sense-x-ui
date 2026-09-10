<template>
  <CommonModal title="运行日志" width="900px" ok-text="" @close="emit('close')">
    <CommonLightTable
        :data="logTable.datas"
        :total="logTable.total"
        :page="logTable.page"
        :page-size="logTable.pageSize"
        :show-selection="false"
        @page-change="onPageChange"
    >
      <template #columns>
        <a-table-column title="触发时间" data-index="startDate" :width="180" ellipsis tooltip />
        <a-table-column title="结束时间" data-index="endDate" :width="180" ellipsis tooltip />
        <a-table-column title="运行结果" data-index="runResult" ellipsis tooltip />
      </template>
    </CommonLightTable>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {queryRunLogs} from "../../../api/base/rule.js";

const emit = defineEmits(['close'])
const props = defineProps({
  ruleId: { type: [Number, String], required: true },
});

const logTable = ref({
  datas: [],
  total: 0,
  page: 1,
  pageSize: 10,
});

onMounted(()=>{
  loadLogs();
})

function loadLogs(){
  queryRunLogs({
    ruleId: props.ruleId,
    page: logTable.value.page,
    pageSize: logTable.value.pageSize,
  }).then(res=>{
    logTable.value.datas = res.data || [];
    logTable.value.total = parseInt(res.headers['x-total-count']) || 0;
  })
}

function onPageChange(page, pageSize){
  logTable.value.page = page;
  logTable.value.pageSize = pageSize;
  loadLogs();
}
</script>

<style scoped>
</style>
