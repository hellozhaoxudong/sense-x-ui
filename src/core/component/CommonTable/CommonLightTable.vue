<!--
  封装通用轻量表格组件（基于 Arco Design a-table），用于统一增删改查管理页面的整体样式
  使用：<CommonLightTable></CommonLightTable>

  传入参数：
    loading：加载状态
    title：表格标题
    showPage：是否展示分页
    page：当前页数，showPage为true时有效
    total：数据总量，showPage为true时有效
    data：数据
  事件：
    @search：当用户点击查询区域的查询按钮、当用户点击表格右上方的刷新按钮时，触发。
    @resetSearch：当用户点击查询区域的重置按钮时，触发。
    @selectRows([数据])：当用户选中数据时，触发
    @selectRowIds([数据ID])：当用户选中数据时，触发
    @currentRowChange([数据])：当用户点击表格某一行时，触发
  API：
    setCurrentRow(数据ID)：主动设置当前高亮行
    setSelectRows([数据ID])：主动设置勾选的行
  插槽：
    #search：查询区域的查询项
    #operation：表格上方的按钮，一般放置：新增、删除等
    #columns：表格列配置，使用 a-table-column
-->

<template>
  <div class="common-table">
    <!--标题-->
    <div v-if="title" class="common-table-title">{{title}}</div>

    <!--查询区域-->
    <div class="search-content" v-if="slots.search">
      <slot name="search"/>
      <div class="search-btn">
        <a-button type="primary" @click="search" size="small"><template #icon><icon-search /></template>查询</a-button>
        <a-button @click="resetSearch" size="small"><template #icon><icon-refresh /></template>重置</a-button></div>
    </div>

    <!--分割线-->
    <div v-if="slots.search" class="common-table-separator"/>

    <!--按钮操作-->
    <div class="table-operation" v-if="slots.operation">
      <div class="operation-btns">
        <slot name="operation"/>
      </div>
      <div class="operation-btns">
        <div class="select-text" v-if="tableSelectKeys.length>0">已勾选{{tableSelectKeys.length}}条</div>
        <!--重置-->
        <icon-refresh class="operation-icon" @click="search"/>
      </div>
    </div>

    <!--表格-->
    <div class="table-content">
      <a-table
          ref="tableRef"
          :loading="loading"
          :data="data"
          :row-key="rowKey"
          :scroll="{ y: '100%' }"
          :pagination="false"
          :hoverable="true"
          :bordered="{cell:true}"
          :row-selection="tableRowSelectionConfig"
          v-model:selectedKeys="tableSelectKeys"
          :highlight-row="true"
          :draggable="dragConfig"
          column-resizable
          @selection-change="onSelectionChange"
          @row-click="onRowClick"
          @change="onChange"
          :row-class="getRowClass"
      >
        <template #columns>
          <slot name="columns"></slot>
        </template>
      </a-table>
    </div>

    <!--分页-->
    <div class="table-footer" v-if="showPage">
      <div>共{{total}}条数据</div>
      <a-pagination v-model:current="props.page" :total="total" :default-page-size="50" show-page-size :page-size-options="[50, 100, 500, 1000]" show-less-items size="small" @change="pageChange" @pageSizeChange="pageSizeChange" />
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, useSlots, defineEmits, defineExpose, watch, nextTick} from 'vue';

const slots = useSlots();

const props = defineProps({
  loading: { type: Boolean, default: false }, // 加载中
  title: { type: String, default: null },     // 标题
  showPage: { type: Boolean, default: true }, // 是否展示分页
  page: { type: Number, default: 1 },         // 页数
  pageSize: { type: Number, default: 50 },    // 每页条数
  total: { type: Number, default: 0 },        // 总数量
  data: { type: Array, default: () => [] },   // 数据
  rowKey: { type: String, default: 'id' },    // 行唯一标识字段
  showCheckBox: { type: Boolean, default: false },     // 是否展示选择框
  showRadioBox: { type: Boolean, default: false },     // 是否展示单选框
  showDrag: { type: Boolean, default: false },     // 是否展示拖拽
})

const emit = defineEmits([
    'search',
  'resetSearch',
  'selectRows',
  'selectRowIds',
  'selectRow',
  'selectRowId',
  'currentRowChange',
  'pageChange',
  'dragRowIds'
])

const tableRef = ref();
const tableRowSelectionConfig = ref({});

// 拖拽配置
const dragConfig = ref(null);

// 表格勾选的key列表
const tableSelectKeys = ref([]);
// 当前选中行
const currentRow = ref({});

watch(()=>props.data, ()=>{
  nextTick(() => {
    tableRef.value?.expandAll(true);
  })
}, { immediate: true });

watch(()=>{ return [props.showCheckBox, props.showRadioBox] }, ()=>{
  if (props.showCheckBox) {
    tableRowSelectionConfig.value = { type: 'checkbox', showCheckedAll: true };
  }
  if (props.showRadioBox) {
    tableRowSelectionConfig.value = { type: 'radio' };
  }
}, { immediate: true, deep: true });

watch(()=>props.showDrag, ()=>{
  if (props.showDrag) {
    dragConfig.value = { type: 'handle', width: 40 };
  } else {
    dragConfig.value = null;
  }
}, { immediate: true });

// 查询
const search = () => {
  emit('search');
}

// 重置查询
const resetSearch = () => {
  emit('resetSearch');
}

// 表格选择变化
const onSelectionChange = (rowKeys) => {
  console.log(rowKeys);

  tableSelectKeys.value = rowKeys;
  const rows = props.data.filter(item => rowKeys.includes(item[props.rowKey]));

  // 如果启用了多选，触发事件
  if (props.showCheckBox) {
    emit('selectRows', rows);
    emit('selectRowIds', rowKeys);
  }
  // 如果启用了单选，触发事件
  if (props.showRadioBox) {
    if (rowKeys.length > 0) {
      emit('selectRow', rows[0]);
      emit('selectRowId', rowKeys[0]);
    } else {
      emit('selectRow', {});
      emit('selectRowId', null);
    }
  }
}

// 监听 selectedKeys 变化来同步 emit
watch(tableSelectKeys, (keys) => {
  const rows = props.data.filter(item => keys.includes(item[props.rowKey]));
  emit('selectRows', rows);
  emit('selectRowIds', keys);
})

// 行点击
const onRowClick = (record) => {
  currentRow.value = record;
  emit('currentRowChange', record);
}

// 主动设置当前高亮行（兼容API）
const setCurrentRow = (row) => {
  // a-table 不支持主动设置高亮行，保留接口兼容
  onRowClick(row);
}

// 主动设置当前选中行
function setSelectRows(rowIds) {
  tableSelectKeys.value = rowIds;
}

function getRowClass(record){
  if (!currentRow.value){
    return '';
  }

  if (currentRow.value[props.rowKey] === record[props.rowKey]){
    return 'current-row';
  }

  return '';
}

// 数据改变：拖拽
function onChange(records){
  if (props.showDrag){
    const ids = records.map(item=>item[props.rowKey]);
    emit('dragRowIds', ids);
  }
}

// 页数切换
const pageChange = (p) => {
  emit('pageChange', p, props.pageSize);
}
const pageSizeChange = (ps) => {
  emit('pageChange', props.page, ps);
}

defineExpose({
  setCurrentRow, setSelectRows
})

</script>

<style scoped lang="scss">
:deep(.current-row) {
  .arco-table-td {
    background-color: #e8f3ff;
  }

  .arco-table-td:first-child {
    border-left: 2px solid #165dff;
  }
}

// 通用表格
.common-table{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // 标题
  .common-table-title{
    font-size: 16px;
    color: rgb(29, 33, 41);
    font-weight: 500;
    margin-bottom: 10px;;
    padding-left: 0px;
  }

  // 查询区域
  .search-content{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;
    gap: 8px 0px;

    // 查询按钮
    .search-btn{
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
    }
  }

  // 分割线
  .common-table-separator{
    border: 0.5px solid rgb(229, 230, 235);
    margin-bottom: 12px;
  }

  // 表格操作
  .table-operation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    // 按钮组
    .operation-btns{
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .select-text{
      font-size: 12px;
    }

    // 图标按钮
    .operation-icon{
      padding: 6px;

      &:hover{
        background-color: rgb(229, 230, 235);
        border-radius: 4px;
      }
    }
  }

  // 表格
  .table-content{
    width: 100%;
    flex: 1;
    min-height: 0;
  }

  // 表格底部
  .table-footer{
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>