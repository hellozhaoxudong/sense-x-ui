<!--
  封装通用树形组件，用于统一增删改查树形页面的整体样式
  使用：<CommonTree></CommonTree>

 【基础用法】
    参数：
      title: 树标题
      treeData: 树数据，格式为: [{ id: 1, folderName: '文件夹名称', parentId: 0, children: []}]
      nameProp: 'folderName', // 树节点名称属性
    事件:
      @selectFolder(node): 点击某个文件夹触发
      @deleteFolder(node): 删除某个文件夹触发
      @submitFolder(node): 新增/编辑某个文件夹触发
-->
<template>
  <div class="common-tree">
    <div class="tree-header">
      <div class="header-title">{{title}}</div>
      <IconBtn @click="dialogShow.create=true"><Plus /></IconBtn>
    </div>

    <div class="tree-content">
      <a-tree
          ref="treeRef"
          blockNode
          :data="commonTreeData"
          :showLine="true"
          :field-names="{key: 'id', title: 'folderName'}"
          :selected-keys="selectKeys"
          @select="handleSelectNode"
          :checkable="mulSelect"
          :check-strictly="true"
          @check="handleMulSelectNodes"
          :checked-keys="mulSelectKeys"
      >
        <!--图标-->
        <template #icon>
          <img src="@/assets/core/folder.svg" style="width: 16px"/>
        </template>

        <!--标题-->
        <template #title="node">
          <span class="folder-name">{{ node[nameProp] }}</span>
        </template>

        <!--操作-->
        <template #extra="node">
          <a-dropdown v-if="showMore && node.id!==0 && selectKeys.includes(node.id)">
            <IconBtn><icon-more /></IconBtn>
            <template #content>
              <a-doption @click="handleEditFolder(node)">编辑</a-doption>
              <a-doption @click="handleDeleteFolder(node)">删除</a-doption>
              <slot name="item-operation" :item="item" />
            </template>
          </a-dropdown>
        </template>
      </a-tree>
    </div>
  </div>

  <!--  编辑文件夹-->
  <CommonModal v-if="dialogShow.create" title="新建文件夹" @close="closeDialog" @submit="handleSubmitFolder">
<!--    <el-form ref="createFormRef" :model="editData" label-width="120px">-->
<!--      <el-form-item prop="parentId" label="父级文件夹" required>-->
<!--        <el-tree-select-->
<!--            v-model="editData.parentId"-->
<!--            :data="commonTreeData"-->
<!--            node-key="id"-->
<!--            :props="{label: 'folderName', key: 'id'}"-->
<!--            check-strictly-->
<!--            default-expand-all-->
<!--            filterable-->
<!--            clearable-->
<!--            style="width: 100%"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item prop="folderName" label="文件夹名称" required>-->
<!--        <el-input v-model="editData.folderName" />-->
<!--      </el-form-item>-->
<!--    </el-form>-->
  </CommonModal>
</template>

<script setup>
import {nextTick, ref, watch} from "vue";
import IconBtn from "../CommonBtn/IconBtn.vue";
import CommonModal from "../CommonModal/CommonModal.vue";
import {Modal} from "@arco-design/web-vue";

const props = defineProps({
  title: String,  // 标题
  treeData: { type: Array, default: [] },
  nameProp: { type: String, default: 'folderName' },
  showMore: { type: Boolean, default: true },  // 是否展示更多操作

  mulSelect: { type: Boolean, default: false }, // 是否启用多选
  mulSelectIds: { type: Array, default: () => [] }, // 多选的节点ID
})

const treeRef = ref(null);
const commonTreeData = ref([])

watch(()=>props.treeData, (val) => {
  commonTreeData.value = [{id: '0', [props.nameProp]: '所有', children: [...props.treeData]}];
  // 展开所有节点
  nextTick(()=>{
    if (treeRef.value){
      treeRef.value.expandAll(true);
    }
  })
}, { deep: true });

// 外部传入的已勾选列表
watch(()=>props.mulSelectIds, (val) => {
  mulSelectKeys.value = val;
}, { deep: true });

const emit = defineEmits(['selectFolderId', 'selectFolder', 'deleteFolder', 'submitFolder', 'selectFolderIds'])

const createFormRef = ref(null);
const editData = ref({
  parentId: 0,
  [props.nameProp]: null
})

const dialogShow = ref({
  create: false
})

const selectKeys = ref([]);
const mulSelectKeys = ref([]);

// 提交文件夹
function handleSubmitFolder(){
  // 文件夹信息
  emit('submitFolder', editData.value);
  closeDialog();
}

// 编辑文件夹
function handleEditFolder(node) {
  editData.value = {...node};
  dialogShow.value.create = true;
}

// 删除文件夹
function handleDeleteFolder(node){
  Modal.confirm(`确定要删除【${node.folderName}】吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    emit('deleteFolder', node);
    closeDialog();
  })
}

// 点击树节点
function handleSelectNode(keys, { node }){
  selectKeys.value = keys;
  if (keys.length > 0){
    const selectNodeId = keys[0]

    // 单独处理跟节点，ant的bug
    if (selectNodeId === 0){
      // 点击根节点
      emit('selectFolderId', 0);
      emit('selectFolder', {id: 0, [props.nameProp]: '所有'});
      return
    }

    emit('selectFolderId', selectNodeId);
    emit('selectFolder', node);
  }
}

// 多选节点
function handleMulSelectNodes(keys, { checked, node }) {
  if (checked){
    mulSelectKeys.value.push(node.id);
  } else {
    mulSelectKeys.value = mulSelectKeys.value.filter(id => id !== node.id);
  }

  // 处理子节点
  deepCheckChild(node, checked);

  // 将0根节点过滤掉
  const ids = mulSelectKeys.value.filter(id => id !== '0');
  emit('selectFolderIds', ids);
}

// 关闭弹窗
function closeDialog() {
  dialogShow.value.create = false;
  editData.value = { parentId: 0, [props.nameProp]: null };
}


/**
 * 勾选/取消勾选所有子节点
 */
function deepCheckChild(node, checked) {
  if (!node.children){
    return;
  }

  node.children.forEach((item) => {
    // 勾选当前子节点
    if (checked){
      mulSelectKeys.value.push(item.id);
    } else {
      mulSelectKeys.value = mulSelectKeys.value.filter(id => id !== item.id);
    }

    deepCheckChild(item, checked);
  });
}


</script>


<style scoped lang="scss">
.common-tree{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  // 头部
  .tree-header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    // 标题
    .header-title{
      font-size: 16px;
      color: rgb(29, 33, 41);
      font-weight: 500;
    }
  }

  .tree-content{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding-right: 8px;
    box-sizing: border-box;

    // 美化滚动条
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    // 多套一层，解决tree滚动问题
    .tree-div{
      width: 100%;
      height: 100%;

      .folder-name{
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
        overflow: hidden;
      }
      .folder-name.select{
        font-weight: 500;
      }
    }
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

</style>