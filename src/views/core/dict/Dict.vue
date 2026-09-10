<template>
  <CommonSplitPage left-title="字典列表" right-title="字典值" left-width="380px">
    <!--左侧：字典列表-->
    <template #left>
      <CommonList
          :list="dictList"
          key-props="id"
          title-props="dictName"
          desc-props="dictCode"
          @create="toCreateDict"
          @select="onDictSelect"
      >
        <template #item-operation="{ item }">
          <a-doption @click="toEditDict(item)">编辑</a-doption>
          <a-doption @click="toDeleteSingleDict(item)">删除</a-doption>
        </template>
      </CommonList>
    </template>

    <!--右侧：字典值列表-->
    <template #right>
      <CommonLightTable
          :data="valueList"
          :show-page="false"
          @selectRowIds="(ids)=> valueSelectedIds = ids"
      >
        <template #operation>
          <a-button type="primary" @click="toCreateValue" :disabled="!currentDict">新建</a-button>
          <a-popconfirm content="确定删除选中字典值？" @ok="toDeleteValue">
            <a-button status="danger" :disabled="!currentDict || valueSelectedIds.length === 0">删除</a-button>
          </a-popconfirm>
        </template>

        <template #columns>
          <a-table-column title="字典值编码" data-index="valueCode" :width="140" ellipsis tooltip />
          <a-table-column title="字典值名称" data-index="valueName" :width="140" ellipsis tooltip />
          <a-table-column title="排序" data-index="sort" :width="70" />
          <a-table-column title="状态" data-index="status" :width="80">
            <template #cell="{ record }">
              <a-tag v-if="record.status === 'Y'" color="green" size="small">启用</a-tag>
              <a-tag v-else color="red" size="small">停用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="70" fixed="right">
            <template #cell="{ record }">
              <a @click="toEditValue(record)">编辑</a>
            </template>
          </a-table-column>
        </template>
      </CommonLightTable>
    </template>
  </CommonSplitPage>

  <!--新建字典-->
  <CreateDict v-if="modalShow.createDict" @close="modalShow.createDict = false; initDictList();" />
  <!--编辑字典-->
  <EditDict v-if="modalShow.editDict" :edit-data="currentEditDict" @close="modalShow.editDict = false; initDictList();" />
  <!--新建字典值-->
  <CreateDictValue v-if="modalShow.createValue" :dict-code="currentDict?.dictCode" @close="modalShow.createValue = false; initValueList();" />
  <!--编辑字典值-->
  <EditDictValue v-if="modalShow.editValue" :edit-data="currentEditValue" @close="modalShow.editValue = false; initValueList();" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonSplitPage from "../../../core/component/CommonPage/CommonSplitPage.vue";
import CommonList from "../../../core/component/CommonList/CommonList.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import CreateDict from "./CreateDict.vue";
import EditDict from "./EditDict.vue";
import CreateDictValue from "./CreateDictValue.vue";
import EditDictValue from "./EditDictValue.vue";
import {queryDict, deleteDict, queryDictValue, deleteDictValue} from "../../../api/base/dict.js";
import {Message} from "@arco-design/web-vue";

// === 左侧：字典 ===
const dictList = ref([]);
const currentDict = ref(null);
const currentEditDict = ref({});

// === 右侧：字典值 ===
const valueList = ref([]);
const valueSelectedIds = ref([]);
const currentEditValue = ref({});

// 弹窗状态
const modalShow = ref({
  createDict: false,
  editDict: false,
  createValue: false,
  editValue: false,
});

onMounted(()=>{
  initDictList();
})

// 查询字典列表
function initDictList(){
  queryDict({ page: 1, pageSize: 500 }).then(res=>{
    dictList.value = res.data || [];
    // 如果当前选中字典已不在列表中，清空
    if (currentDict.value && !dictList.value.find(d => d.id === currentDict.value.id)){
      currentDict.value = null;
      valueList.value = [];
    }
  })
}

// 选中字典
function onDictSelect(item){
  currentDict.value = item;
  initValueList();
}

// 新建字典
function toCreateDict(){
  modalShow.value.createDict = true;
}

// 编辑字典
function toEditDict(row){
  currentEditDict.value = row;
  modalShow.value.editDict = true;
}

// 删除单个字典
function toDeleteSingleDict(row){
  deleteDict([row.id]).then(()=>{
    Message.success('删除成功');
    initDictList();
  })
}

// 查询字典值列表
function initValueList(){
  if (!currentDict.value) return;
  queryDictValue({ page: 1, pageSize: 500, dictCode: currentDict.value.dictCode }).then(res=>{
    valueList.value = res.data || [];
  })
}

// 新建字典值
function toCreateValue(){
  modalShow.value.createValue = true;
}

// 编辑字典值
function toEditValue(row){
  currentEditValue.value = row;
  modalShow.value.editValue = true;
}

// 删除字典值
function toDeleteValue(){
  if (!valueSelectedIds.value || valueSelectedIds.value.length === 0){
    Message.warning('请选择要删除的字典值');
    return;
  }
  deleteDictValue(valueSelectedIds.value).then(()=>{
    Message.success('删除成功');
    initValueList();
  })
}
</script>

<style scoped>
</style>
