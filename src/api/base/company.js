import HttpRequest from "../../utils/request.js";

// 企业：分页查询
export function queryCompany(params){
    return HttpRequest({
        url: '/api/base/company/page',
        method: 'get',
        params
    })
}

// 企业：新增/修改
export function submitCompany(data){
    return HttpRequest({
        url: '/api/base/company/submit',
        method: 'post',
        data
    })
}

// 企业：删除（批量）
export function deleteCompany(data){
    return HttpRequest({
        url: '/api/base/company/delete',
        method: 'post',
        data
    })
}
