<template>
  <a-drawer :width="900" :visible="true" unmountOnClose :mask-closable="false" :footer="false" title="实时中心" @cancel="emit('close')">
    <div class="monitor-view">
      <div class="views">

      </div>
      <div class="monitors">
        <div class="monitor-type">当前列表</div>
        <div class="monitor-list">
          <CommonLineCard title="123" do-text="移除"/>
        </div>


        <div class="monitor-type">历史查看</div>
        <div class="monitor-list">
          <CommonLineCard title="123" do-text="查看"/>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CommonIconIndexCard from "../../../../core/component/CommonIndexCard/CommonIconIndexCard.vue";
import CommonLineCard from "../../../../core/component/CommonCard/CommonLineCard.vue";

const emit = defineEmits(['close']);

const props = defineProps({
  monitorId: String,
});

const monitorList = ref([]);

onMounted(() => {
  //

  initMonitors();
});

// 初始化监控列表
function initMonitors(){

}


</script>


<style scoped lang="scss">
.monitor-view{
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;

  .views{
    flex: 1;
    min-width: 0;
    height: 100%;
  }

  .monitors{
    width: 240px;
    height: 100%;
    background-color: #1d212910;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 4px;
    box-sizing: border-box;
    gap: 4px;

    .monitor-type{
      background-color: white;
      padding: 2px 8px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: bold;
    }

    .monitor-list{
      width: 100%;
      flex: 1;
      min-height: 0;
      overflow: auto;

    }
  }
}
</style>