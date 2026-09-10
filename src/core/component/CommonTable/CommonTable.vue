<!--
  封装通用表格组件，用于统一增删改查管理页面的整体样式
  使用：<CommonTable></CommonTable>

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
  插槽：
    #search：查询区域的查询项
    #operation：表格上方的按钮，一般放置：新增、删除等
    #columns：表格列配置，同vxeTable的列配置
-->

<template>
  <div class="common-table">
<!--    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5976EF" background-color="#AFB2BD30" size="20" />-->

    <!--标题-->
    <div v-if="title" class="common-table-title">{{title}}</div>

    <!--查询区域-->
    <div class="search-content" v-if="slots.search">
      <slot name="search"/>
      <div class="search-item search-btn">
        <a-button type="primary" @click="search"><template #icon><icon-search /></template>查询</a-button>
        <a-button @click="resetSearch"><template #icon><icon-refresh /></template>重置</a-button></div>
    </div>

    <!--分割线-->
    <div v-if="slots.search" class="common-table-separator"/>

    <!--按钮操作-->
    <div class="table-operation">
      <div class="operation-btns">
        <slot name="operation"/>
      </div>
      <div class="operation-btns">
        <div class="select-text" v-if="tableSelectRows.length>0">已勾选{{tableSelectRows.length}}条</div>
        <!--重置-->
        <icon-refresh class="operation-icon" @click="search"/>
      </div>
    </div>

    <!--表格-->
    <div class="table-content">
      <div class="vxe-table-div">
        <vxe-table
            :data="data"
            :size=tableSize
            auto-resize
            border
            ref="vxeTableRef"
            height="100%"
            show-overflow="tooltip"
            highlight-current-row
            :tree-config="{childrenField: 'children', rowField: 'id'}"
            @checkbox-change="rowSelect"
            @current-row-change="currentRowChange"
        >
          <vxe-column type="checkbox" width="40" align="center" fixed="left"/>
          <slot name="columns"></slot>
        </vxe-table>
      </div>
    </div>

    <!--分页-->
    <div class="table-footer" v-if="showPage">
      <div>共{{total}}条数据</div>
      <a-pagination v-model:current="props.page" :total="total" :default-page-size="50" show-page-size :page-size-options="[50, 100, 500, 1000]" show-less-items size="small" @change="pageChange" @pageSizeChange="pageSizeChange" />
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, h, useSlots, defineEmits, defineExpose} from 'vue';

const slots = useSlots();

const props = defineProps({
  loading: { type: Boolean, default: false }, // 加载中
  title: { type: String, default: null },     // 标题
  showPage: { type: Boolean, default: true }, // 是否展示分页
  page: { type: Number, default: 1 },         // 页数
  pageSize: { type: Number, default: 50 },         // 页数
  total: { type: Number, default: 0 },        // 总数量
  data: { type: Array, default: () => [] },   // 数据
})

const emit = defineEmits(['search', 'resetSearch', 'selectRows', 'selectRowIds', 'currentRowChange', 'pageChange'])

// 表格
const vxeTableRef = ref();
// 表格大小
const tableSize = ref('small');
// 表格勾选
const tableSelectRows = ref([]);

// 查询
const search = () => {
  emit('search');
}

// 重置查询
const resetSearch = () => {
  emit('resetSearch');
}

// 表格选择
const rowSelect = () => {
  const rows = vxeTableRef.value.getCheckboxRecords();
  tableSelectRows.value = rows;

  emit('selectRows', rows)
  emit('selectRowIds', rows.map(item => item.id))
}

// 高亮行
const currentRowChange = ({row}) => {
  emit('currentRowChange', row)
}

const setCurrentRow = (row) => {
  console.log(row);
  vxeTableRef.value.setCurrentRow(row);
  // vxeTableRef.value.setCurrentRow(vxeTableRef.value.getRowById(id));
}

// 页数切换
const pageChange = (p) => {
  emit('pageChange', p, props.pageSize);
}
const pageSizeChange = (ps) => {
  emit('pageChange', props.page, ps);
}


defineExpose({
  setCurrentRow
})

</script>

<style scoped lang="scss">
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
    gap: 8px 32px;

    ::v-deep(.search-item){
      display: flex;
      align-items: center;
      gap: 4px;
      width: calc((100% - 34px * 3) / 4);

      .search-label{
        width: 84px;
      }
    }

    // 适合放2个查询项
    ::v-deep(.item-2){
      width: calc((100% - 34px * 3) / 3);

      .search-label{
        min-width: 84px;
      }
    }

    // 查询按钮
    .search-btn{
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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

    // 多套一层，解决table不能在flex高度自适应的问题
    position: relative;
    .vxe-table-div{
      position: absolute;
      width: 100%;
      height: 100%;
    }
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