<template>
  <div>
    <BlockCard/>
  </div>

  <!--新建/编辑-->
  <EditSkill
      v-if="modalShow.edit"
      :edit-data="currentEditRow"
      @close="modalShow.edit = false; currentEditRow={}; initList();"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import BlockCard from "../../../../core/component/CommonCard/BlockCard.vue";
import EditSkill from "./EditSkill.vue";
import {querySkill} from "../../../../api/core/ai/skill.js";

// 表格数据
const table = ref({
  data: [],
  total: 0,
  tableFilter: { skillName: "", skillTag: "" }
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
  initList();
});

// 初始化查询
function initList() {
  const params = {
    skillName: table.value.tableFilter.skillName || undefined,
    skillTag: table.value.tableFilter.skillTag || undefined
  };
  querySkill(params)
      .then(res => {
        const list = res.data || [];
        table.value.data = list;
        table.value.total = list.length;
      });
}

// 重置查询条件
function resetFilter() {
  table.value.tableFilter = { skillName: "", skillTag: "" };
  initList();
}

// 新建
function toCreate() {
  currentEditRow.value = {};
  modalShow.value.edit = true;
}

// 编辑
function toEdit(row) {
  currentEditRow.value = row;
  modalShow.value.edit = true;
}

// 删除
function toDelete() {
  if (!selectRowIds.value || selectRowIds.value.length === 0) {
    Message.warning("请选择要删除的数据");
    return;
  }
  deleteSkill(selectRowIds.value)
      .then(() => {
        Message.success("删除成功");
        initList();
      });
}
</script>

<style scoped>
</style>
