import HttpRequest from "../../utils/request.js";

// 查询业务类型列表（不分页）
export function queryBusinessTypes(){
    return HttpRequest({
        url: '/api/base/file/businessTypes',
        method: 'get'
    })
}

// 根据业务类型分页查询文件列表
export function queryFiles(params){
    return HttpRequest({
        url: '/api/base/file/page',
        method: 'get',
        params
    })
}

// 上传文件
export function uploadFile(data){
    return HttpRequest({
        url: '/api/base/file/upload',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}

// 批量删除文件
export function deleteFiles(data){
    return HttpRequest({
        url: '/api/base/file/delete',
        method: 'post',
        data
    })
}
