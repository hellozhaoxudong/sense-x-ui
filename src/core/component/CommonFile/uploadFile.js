import {createApp, reactive} from "vue";
import FileUploadModal from "./FileUploadModal.vue";
import ArcoVue from '@arco-design/web-vue'

export const UploadOptions = reactive({
    open: false,    // 是否打开
    options: {},    // 配置
})

/**
 * 打开文件上传弹窗
 */
export function OpenUpload(options = {}){
    UploadOptions.open = true;
    UploadOptions.options = options;

    return new Promise((resolve, reject) => {
        UploadOptions.resolve = resolve
        UploadOptions.reject = reject
    })
}