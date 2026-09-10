<template>
  <CommonLightTable
      title="通知管理"
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
      <SearchItem label="标题"><a-input v-model="table.tableFilter.noticeTitle" size="small"/></SearchItem>
      <SearchItem label="类型">
        <a-select v-model="table.tableFilter.noticeType" allow-clear placeholder="全部" size="small">
          <a-option value="通知">通知</a-option>
          <a-option value="公告">公告</a-option>
          <a-option value="系统消息">系统消息</a-option>
        </a-select>
      </SearchItem>
      <SearchItem label="级别">
        <a-select v-model="table.tableFilter.noticeLevel" allow-clear placeholder="全部" size="small">
          <a-option value="普通">普通</a-option>
          <a-option value="重要">重要</a-option>
          <a-option value="紧急">紧急</a-option>
        </a-select>
      </SearchItem>
      <SearchItem label="状态">
        <a-select v-model="table.tableFilter.noticeStatus" allow-clear placeholder="全部" size="small">
          <a-option value="草稿">草稿</a-option>
          <a-option value="已发布">已发布</a-option>
          <a-option value="已下线">已下线</a-option>
        </a-select>
      </SearchItem>
    </template>

    <!--表格操作-->
    <template #operation>
      <a-button type="primary" @click="modalShow.edit=true"><template #icon><icon-plus /></template>新建</a-button>
      <a-button type="primary" status="danger" @click="onDeleteNotice()"><template #icon><icon-delete /></template>删除</a-button>
    </template>

    <!--字段信息-->
    <template #columns>
      <a-table-column title="标题" data-index="noticeTitle" :width="220" ellipsis tooltip />
      <a-table-column title="类型" data-index="noticeType" :width="100" ellipsis tooltip />
      <a-table-column title="级别" data-index="noticeLevel" :width="80" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.noticeLevel === '紧急'" color="red">紧急</a-tag>
          <a-tag v-else-if="record.noticeLevel === '重要'" color="orange">重要</a-tag>
          <a-tag v-else color="blue">普通</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="状态" data-index="noticeStatus" :width="90" ellipsis tooltip>
        <template #cell="{ record }">
          <a-tag v-if="record.noticeStatus === '已发布'" color="green">已发布</a-tag>
          <a-tag v-else-if="record.noticeStatus === '已下线'" color="gray">已下线</a-tag>
          <a-tag v-else color="blue">草稿</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="置顶" data-index="showTop" :width="70" ellipsis tooltip>
        <template #cell="{ record }">
          <span>{{ record.showTop === 'Y' ? '是' : '否' }}</span>
        </template>
      </a-table-column>
      <a-table-column title="弹窗" data-index="showModal" :width="70" ellipsis tooltip>
        <template #cell="{ record }">
          <span>{{ record.showModal === 'Y' ? '是' : '否' }}</span>
        </template>
      </a-table-column>
      <a-table-column title="发布时间" data-index="publishDate" :width="160" ellipsis tooltip />
      <a-table-column title="过期时间" data-index="expireDate" :width="160" ellipsis tooltip />
      <a-table-column title="操作" data-index="operation" fixed="right" :width="140" ellipsis tooltip>
        <template #cell="{ record }">
          <a @click="onEdit(record)">编辑</a>
        </template>
      </a-table-column>
    </template>
  </CommonLightTable>

  <!--新建/编辑-->
  <NoticeEdit v-if="modalShow.edit" :edit-data="currentEditRow" @close="modalShow.edit = false; currentEditRow={}; initData();" />
</template>

<script setup>
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {onMounted, ref} from "vue";
import NoticeEdit from "./NoticeEdit.vue";
import {deleteNotice, queryNotice} from "../../../api/base/notice.js";
import {Message, Modal} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";

// 表格数据
const table = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 50,
  tableFilter: { noticeTitle: '', noticeType: '', noticeLevel: '', noticeStatus: '' }
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

  queryNotice(params).then(res=>{
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
function onDeleteNotice(){
  if (!selectRowIds.value || selectRowIds.value.length === 0){
    Message.warning('请选择要删除的数据');
    return;
  }

  Modal.confirm({
    title: '操作确认',
    content: '确定要删除吗？',
    onOk: ()=>{
      deleteNotice(selectRowIds.value).then(()=>{
        Message.success('删除成功');
        initData();
      })
    }
  });
}
</script>

<style scoped>
</style>
