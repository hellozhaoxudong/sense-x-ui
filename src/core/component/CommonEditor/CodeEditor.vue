<!--
  封装通用代码编辑器
  使用：
    const code = ref('');
    <CodeMirrorEditor
      v-model=code
      init-language='SQL'
    />

 【基础用法】
    参数：
      v-model: 代码内容，双向绑定
      init-language: 初始语言，可选: SQL、Aviator、Java、Python、Shell、JSON、XML、HTML、Javascript、Go
      runAll: 是否启用 [运行全部] 按钮，默认false
      runSelect: 是否启用 [运行选择] 按钮，默认false
      stop: 是否启用 [停止] 按钮，默认false

    事件：
-->
<template>
  <div :class="['code-editor', { dark: currentTheme==='dark' }]">
    <div class="code-editor-tool">
      <div :class="['tool-header', { dark: currentTheme==='dark' }]">代码编辑器</div>
      <!--格式化代码-->
      <a-tooltip content="格式化">
        <div :class="['icon-btn']" @click="onFormat">
          <img v-if="currentTheme==='dark'" src="@/assets/core/format-dark.svg" width="18"/>
          <img v-else src="@/assets/core/format-light.svg" width="18"/>
        </div>
      </a-tooltip>

      <!--停止运行-->
      <a-tooltip content="停止" v-if="stop">
        <div class="icon-btn" >
          <img v-if="currentTheme==='dark'" src="@/assets/core/stop-dark.svg" width="18"/>
          <img v-else src="@/assets/core/stop-light.svg" width="18"/>
        </div>
      </a-tooltip>

      <!--运行全部-->
      <a-tooltip content="运行全部" v-if="runAll">
        <div class="icon-btn" >
          <img v-if="currentTheme==='dark'" src="@/assets/core/run-dark.svg" width="18"/>
          <img v-else src="@/assets/core/run-light.svg" width="18"/>
        </div>
      </a-tooltip>

      <!--运行已选择部分-->
      <a-tooltip content="运行已选择" v-if="runSelect">
        <div class="icon-btn">
          <img v-if="currentTheme==='dark'" src="@/assets/core/run-select-dark.svg" width="18"/>
          <img v-else src="@/assets/core/run-select-light.svg" width="18"/>
        </div>
      </a-tooltip>

      <!--语言切换-->
      <a-select v-model="currentLanguage" size="mini" style="width: 100px" @change="changeLanguage">
        <a-option v-for="item in languageList" :value="item.name">{{item.name}}</a-option>
      </a-select>

      <!--主题切换-->
      <a-switch type="line" size="small" checked-value="light" unchecked-value="dark" v-model="currentTheme" @change="changeTheme">
        <template #checked-icon><icon-sun /></template>
        <template #unchecked-icon><icon-moon-fill /></template>
      </a-switch>
    </div>

    <!--代码编辑器-->
    <div id="code-mirror" class="code-mirror" ref="refCodeMirror"></div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch, nextTick} from "vue";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/autorefresh.js'

// 主题
import 'codemirror/theme/idea.css'; // 白色
import 'codemirror/theme/darcula.css'; // 暗色

// 支持语言
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/go/go.js';

const props = defineProps({
  modelValue: { type: String, default: '' },  // 代码内容
  initLanguage: { type: String, default: 'SQL' }, // 初始语言

  runAll: { type: Boolean, default: false }, // 是否启用运行按钮
  runSelect: { type: Boolean, default: false }, // 是否启用运行选择按钮
  stop: { type: Boolean, default: false }, // 是否启用停止按钮
})

const emit = defineEmits(['update:modelValue']);

// 支持的语言
const languageList = ref([
  { name: 'SQL', title: 'SQL脚本', mode: 'sql' },
  { name: 'Aviator', title: 'Aviator脚本', mode: 'text/x-sh' },
  { name: 'Java', title: 'Java脚本', mode: 'text/x-sh' },
  { name: 'Python', title: 'Python脚本', mode: 'python' },
  { name: 'Shell', title: 'Shell脚本', mode: 'shell' },
  { name: 'JSON', title: 'JSON片段', mode: 'application/json' },
  { name: 'XML', title: 'XML片段', mode: 'application/xml' },
  { name: 'HTML', title: 'HTML片段', mode: 'htmlmixed' },
  { name: 'Javascript', title: 'JS脚本', mode: 'javascript' },
  { name: 'Go', title: 'Go', mode: 'go' },
])

// 当前语言、当前语言模式
const currentLanguage = ref('SQL')
const currentMode = ref('sql')


// 当前主题
const currentTheme = ref('dark')

// 容器引用
const refCodeMirror = ref(null);

let editor = null;

onMounted(()=>{
  // 解析初始化语言模式
  languageList.value.forEach(item=>{
    if (item.name === props.initLanguage){
      currentLanguage.value = item.name;
      currentMode.value = item.mode;
    }
  })

  // 初始化编辑器
  initEditor()
})

// 监听 props.modelValue 的变化，确保内部值与外部 prop 保持同步
watch(() => props.modelValue, (newVal) => {
  if (editor && newVal !== editor.getValue()){
    editor.setValue(newVal)
  }
})

/**
 * 初始化编辑器
 */
function initEditor(){
  // 从缓存获取编辑器主题
  const themeCache = localStorage.getItem('crhms.cdmp.editor.theme');
  if (themeCache === 'dark'){
    currentTheme.value = 'dark'
  }

  editor = CodeMirror(refCodeMirror.value, {
    mode: currentMode.value,     // 编辑器模式
    theme: currentTheme.value==='dark'?'darcula':'idea',       // 主题风格
    lineWrapping: true,       // 是否自动换行
    lineNumbers: true,        // 是否显示行号
    autoCloseBrackets: true,  // 自动闭合括号和引号
    autoCloseTags: true,      // 自动闭合标签
    autoRefresh: true,        // 首次可见时刷新
    styleActiveLine: true,    // 光标所在行高亮
    matchBrackets: true,      // 突出显示匹配括号
    scrollbarStyle: 'null', // 滚动条实现方式
    lint: true,
    foldGutter: true, // 可折叠
    minimap: { scale: 10 },
  });

  nextTick(() => {
    editor.refresh();
  })

  editor.setValue(props.modelValue);

  editor.on('change', onEditorChange)
}

// 编辑器内容切换
function onEditorChange(){
  const code = editor.getValue();
  emit('update:modelValue', code);
}

// 格式化代码
function onFormat(){
  // TODO

}

// 切换主题
function changeTheme(v){
  if (!editor){
    return;
  }

  if (v === 'dark'){
    editor.setOption('theme', 'darcula')
  } else {
    editor.setOption('theme', 'idea')
  }

  // 缓存编辑器主题
  localStorage.setItem('crhms.cdmp.editor.theme', v);
}

// 切换语言
function changeLanguage(v){
  languageList.value.forEach(item=>{
    if (item.name === v){
      currentMode.value = item.mode;

      // 设置到编辑器
      if (editor){
        editor.setOption('mode', item.mode)
      }
    }
  })
}

// 获取选中文本
function getSelection() {
  return editor.getSelection();
}

// 暴露子组件方法
defineExpose({
  getSelection
})

</script>

<style lang="scss">
.code-editor{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #EBECEF;
  display: flex;
  flex-direction: column;

  &.dark{
    background-color: #24272CFF;
  }

  .code-editor-tool{
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 8px;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(236, 239, 244, 0.14);

    .tool-header{
      flex: 1;
      font-size: 12px;
      color: #1D1D1F;
      font-weight: bold;

      &.dark{
        color: rgba(236, 239, 244, 0.84);
      }
    }

    .icon-btn{
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover{
        background-color: #2c3e50;
        border-radius: 4px;
      }
    }
  }

  .code-mirror{
    width: 100%;
    flex: 1;
    min-height: 0;
    border-radius: 4px;
    padding: 0 4px 4px 4px;
    box-sizing: border-box;

    .CodeMirror{
      height: 100%;
    }
  }
}
</style>