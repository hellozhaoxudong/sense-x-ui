import HttpRequest from "../../utils/request.js";

// 规则数据：查询列表（不分页）
export function queryRuleDataList(params){
    return HttpRequest({
        url: '/api/base/ruleData/list',
        method: 'get',
        params
    })
}

// 规则数据：新增/修改
export function submitRuleData(data){
    return HttpRequest({
        url: '/api/base/ruleData/submit',
        method: 'post',
        data
    })
}

// 规则数据：删除
export function deleteRuleData(data){
    return HttpRequest({
        url: '/api/base/ruleData/delete',
        method: 'post',
        data
    })
}

// 数据详情：分页查询
export function queryRuleDataDetailPage(params){
    return HttpRequest({
        url: '/api/base/ruleDataDetail/page',
        method: 'get',
        params
    })
}

// 数据详情：导出（返回blob文件流）
export function exportRuleDataDetail(params){
    return HttpRequest({
        url: '/api/base/ruleDataDetail/export',
        method: 'get',
        params,
        responseType: 'blob'
    })
}

// 数据详情：清空
export function clearRuleDataDetail(ruleDataId){
    return HttpRequest({
        url: '/api/base/ruleDataDetail/clear',
        method: 'post',
        params: { ruleDataId }
    })
}
