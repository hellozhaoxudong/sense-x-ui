import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);

app.use(ArcoVue);

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
app.use(ArcoVueIcon);

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'
app.use(VxeUITable)

// 公共状态
const pinia = createPinia()
app.use(pinia)

// 路由
import router from "./router";
import {createPinia} from "pinia";
app.use(router);

app.mount('#app')
