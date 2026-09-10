import HttpRequest from "../../utils/request.js";

// 通知公告：分页查询
export function queryNotice(params){
    return HttpRequest({
        url: '/api/base/notice/page',
        method: 'get',
        params
    })
}

// 通知公告：新增/修改
export function submitNotice(data){
    return HttpRequest({
        url: '/api/base/notice/submit',
        method: 'post',
        data
    })
}

// 通知公告：删除（批量）
export function deleteNotice(data){
    return HttpRequest({
        url: '/api/base/notice/delete',
        method: 'post',
        data
    })
}
