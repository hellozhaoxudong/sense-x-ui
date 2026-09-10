<template>
  <CommonModal title="添加用户" width="700px" @ok="submit" @close="emit('close')">
    <div style="height: 400px;">
      <CommonLightTable
          :data="unUserList"
          :show-page="false"
          @search="loadUnUsers"
          @selectRowIds="(ids)=> selectedIds = ids"
          @resetSearch="filterText=''; loadUnUsers();"
      >
        <template #search>
          <SearchItem label="用户名"><a-input v-model="filterText" size="small" allow-clear/></SearchItem>
        </template>
        <template #columns>
          <a-table-column title="用户名" data-index="username" :width="120" ellipsis tooltip />
          <a-table-column title="姓名" data-index="name" :width="100" ellipsis tooltip />
          <a-table-column title="手机号" data-index="phone" :width="130" ellipsis tooltip />
          <a-table-column title="邮箱" data-index="email" ellipsis tooltip />
        </template>
      </CommonLightTable>
    </div>
  </CommonModal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {queryUnPositionUser, addPositionUser} from "../../../api/core/user/user.js";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";
import SearchItem from "../../../core/component/SearchItem/SearchItem.vue";
import {Message} from "@arco-design/web-vue";

const emit = defineEmits(['close'])
const props = defineProps({
  positionId: { type: Number, required: true },
});

const unUserList = ref([]);
const selectedIds = ref([]);
const filterText = ref('');

onMounted(()=>{
  loadUnUsers();
})

function loadUnUsers(){
  queryUnPositionUser({ positionId: props.positionId, username: filterText.value || undefined }).then(res=>{
    unUserList.value = res.data;
  })
}

function submit(){
  if (!selectedIds.value || selectedIds.value.length === 0){
    Message.warning('请选择要添加的用户');
    return;
  }
  addPositionUser({ positionId: props.positionId }, selectedIds.value).then(()=>{
    Message.success('添加成功');
    emit('close');
  })
}
</script>

<style scoped>
</style>
