<template>
  <div class="ui">
    <div class="block">
      <div class="block-title">标题系列</div>
      <CommonTitle title="一级标题"/>
    </div>

    <div class="block">
      <div class="block-title">卡片系列</div>
      <CommonLineCard title="任务名称" desc="2026-01-01" show-do do-text="去执行"/>

      <CommonBigCard title="常规卡片" card-height="100px">
        <template #icon><icon-search/></template>
        <div>卡片内容</div>
      </CommonBigCard>

      <CommonColorCard title="彩色卡片" card-height="100px">
        <template #icon><icon-search/></template>
        <div>卡片内容</div>
      </CommonColorCard>
    </div>

    <div class="block">
      <div class="block-title">指标卡系列</div>
      <CommonIconIndexCard index-name="总人数" index-value="1234"><icon-search /></CommonIconIndexCard>
    </div>

    <div class="block">
      <div class="block-title">弹窗系列</div>

      <div>
        <a-button type="outline" @click="showModal='simple'">打开普通弹窗</a-button>
        <a-button type="outline" @click="showModal='big'">打开普通弹窗</a-button>
      </div>

      <CommonModal v-if="showModal==='simple'" title="普通编辑弹窗" @close="showModal=null"><div>弹窗内容，弹窗随内容高度</div></CommonModal>
      <CommonModal v-if="showModal==='big'" title="超大展示弹窗" width="90%" @close="showModal=null"><div>超大弹窗</div></CommonModal>
    </div>

    <div class="block">
      <div class="block-title">表格系列</div>
      <div style="height: 400px">
        <CommonLightTable />
      </div>
    </div>


    <div class="block">
      <div class="block-title">页面系列</div>
      <CommonRadioPage title1="页签一" title2="页签二" >
        <template #tab1>
          页面一
        </template>
        <template #tab2>
          页面二
        </template>
      </CommonRadioPage>
    </div>


  </div>
</template>

<script setup>

import CommonLineCard from "../../../core/component/CommonCard/CommonLineCard.vue";
import CommonIconIndexCard from "../../../core/component/CommonIndexCard/CommonIconIndexCard.vue";
import CommonColorCard from "../../../core/component/CommonCard/CommonColorCard.vue";
import CommonBigCard from "../../../core/component/CommonCard/CommonBigCard.vue";
import CommonRadioPage from "../../../core/component/CommonPage/CommonRadioPage.vue";
import CommonTitle from "../../../core/component/CommonTitle/CommonTitle.vue";
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import {ref} from "vue";
import CommonLightTable from "../../../core/component/CommonTable/CommonLightTable.vue";

const showModal = ref(null);
</script>


<style scoped>
.ui{
  .block{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    box-sizing: border-box;
    margin-bottom: 32px;
    background-color: #1d212910;

    .block-title{
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>