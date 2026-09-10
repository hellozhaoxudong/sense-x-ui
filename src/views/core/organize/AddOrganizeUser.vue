<template>
  <a-modal :visible="true" title="添加用户" @ok="submit" @cancel="emit('close')" width="900px" :body-style="{height: '400px'}">
    <CommonLightTable
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
        <SearchItem label="登录名称"><a-input v-model="table.tableFilter.username" size="small"/></SearchItem>
        <SearchItem label="用户姓名"><a-input v-model="table.tableFilter.name" size="small"/></SearchItem>
        <SearchItem label="手机号"><a-input v-model="table.tableFilter.phone" size="small"/></SearchItem>
      </template>

      <!--字段信息-->
      <template #columns>
        <a-table-column title="登录名" data-index="username" ellipsis tooltip />
        <a-table-column title="用户姓名" data-index="name" ellipsis tooltip />
        <a-table-column title="性别" data-index="sex" :width="60" ellipsis tooltip />
        <a-table-column title="手机号" data-index="phone" :width="120" ellipsis tooltip />
        <a-table-column title="邮箱" data-index="email" :width="200" ellipsis tooltip />
        <a-table-column title="操作" data-index="operation" fixed="right" :width="140" ellipsis tooltip>
          <template #cell="{ record }">
            <a @click="toEdit(record)">编辑</a>
          </template>
        </a-table-column>
      </template>
    </CommonLightTable>
  </a-modal>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {queryUser, submitOrganize, submitOrganizeUser} from "../../../api/core/user/user.js";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import {Message} from "@arco-design/web-vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";

const emit = defineEmits(['close']);
const props = defineProps({
  organizeId: { type: String, default: '' }
})

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

// 编辑中的一行
const currentEditRow = ref({});

// 弹窗
const modalShow = ref({
  edit: false
})

onMounted(()=>{
  initList();
})

// 初始化查询
function initList(){
  const params = {
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...table.value.tableFilter
  }

  queryUser(params).then(res=>{
    table.value.data = res.data;
    table.value.total = res.headers['x-total-count'] ? Number(res.headers['x-total-count']) : 0;
  })
}

// 重置查询条件
function resetFilter(){
  table.value.tableFilter = { username: '', name: '', email: '', phone: '' };
  initList();
}

function submit(){
  submitOrganizeUser({ organizeId: props.organizeId }, selectRowIds.value).then(res=>{
    Message.success('添加成功');
    emit('close');
  })
}
</script>

<style scoped>
</style>