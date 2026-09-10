import HttpRequest from "../../utils/request.js";

// 字典：分页查询
export function queryDict(params){
    return HttpRequest({
        url: '/api/base/dict/page',
        method: 'get',
        params
    })
}

// 字典：新增/修改
export function submitDict(data){
    return HttpRequest({
        url: '/api/base/dict/submit',
        method: 'post',
        data
    })
}

// 字典：删除（批量）
export function deleteDict(data){
    return HttpRequest({
        url: '/api/base/dict/delete',
        method: 'post',
        data
    })
}

// 字典值：分页查询
export function queryDictValue(params){
    return HttpRequest({
        url: '/api/base/dict/value/page',
        method: 'get',
        params
    })
}

// 字典值：新增/修改
export function submitDictValue(data){
    return HttpRequest({
        url: '/api/base/dict/value/submit',
        method: 'post',
        data
    })
}

// 字典值：删除（批量）
export function deleteDictValue(data){
    return HttpRequest({
        url: '/api/base/dict/value/delete',
        method: 'post',
        data
    })
}
