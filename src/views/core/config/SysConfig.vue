<template>
  <div class="sys-config">
    <SysConfigItem config-name="系统标题：">
      <a-input v-model="configData.SYSTEM_TITLE" :disabled="!editKeys.includes('SYSTEM_TITLE')" />
      <template #operation>
        <div v-if="!editKeys.includes('SYSTEM_TITLE')" @click="editConfigItem('SYSTEM_TITLE')">编辑</div>
        <div v-if="editKeys.includes('SYSTEM_TITLE')" @click="onSubmitConfig('SYSTEM_TITLE')">保存</div>
      </template>
    </SysConfigItem>


    <SysConfigItem config-name="系统图标：">
      <CommonUpload handType="link" v-model="configData.SYSTEM_ICON" @success="onSubmitConfig('SYSTEM_ICON')"/>
    </SysConfigItem>
  </div>
</template>
<script setup>
import CommonUpload from "../../../core/component/CommonFile/CommonUpload.vue";
import SysConfigItem from "./component/SysConfigItem.vue";
import {onMounted, ref} from "vue";
import {queryConfig, submitConfig} from "../../../api/core/system/sysConfig.js";

const configData = ref({
  SYSTEM_TITLE: '', // 系统标题
  SYSTEM_ICON: '',  // 系统图标
});

// 编辑中的配置项
const editKeys = ref([]);

onMounted(() => {
  initConfig();
})

// 编辑配置项
function editConfigItem(key){
  editKeys.value.push(key);
}

function initConfig(){
  queryConfig().then(res=>{
    if (res.data){
      res.data.forEach((item)=>{
        configData.value[item.configKey] = item.configValue;
      })
    }
  })
}

// 提交配置
function onSubmitConfig(key){
  submitConfig({
    configKey: key,
    configValue: configData.value[key]
  }).then(res=>{
    // 移除key
    editKeys.value = editKeys.value.filter(item => item !== key);
  })
}
</script>

<style scoped>
.sys-config{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 120px;
  box-sizing: border-box;
}
</style>