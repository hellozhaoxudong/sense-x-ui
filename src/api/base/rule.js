import HttpRequest from "../../utils/request.js";

// 分类：查询列表（不分页）
export function queryRuleFolders(params){
    return HttpRequest({
        url: '/api/base/rule/folder/list',
        method: 'get',
        params
    })
}

// 分类：新增/修改
export function submitRuleFolder(data){
    return HttpRequest({
        url: '/api/base/rule/folder/submit',
        method: 'post',
        data
    })
}

// 分类：删除
export function deleteRuleFolder(data){
    return HttpRequest({
        url: '/api/base/rule/folder/delete',
        method: 'post',
        data
    })
}

// 规则：分页查询
export function queryRules(params){
    return HttpRequest({
        url: '/api/base/rule/page',
        method: 'get',
        params
    })
}

// 规则：新增/修改
export function submitRule(data){
    return HttpRequest({
        url: '/api/base/rule/submit',
        method: 'post',
        data
    })
}

// 规则：删除
export function deleteRule(data){
    return HttpRequest({
        url: '/api/base/rule/delete',
        method: 'post',
        data
    })
}

// 规则：上线
export function onlineRule(id){
    return HttpRequest({
        url: `/api/base/rule/online/${id}`,
        method: 'post',
    })
}

// 规则：运行
export function runRule(id){
    return HttpRequest({
        url: `/api/base/rule/run/${id}`,
        method: 'post',
    })
}

// 规则：查询运行日志（分页，按ruleId）
export function queryRunLogs(params){
    return HttpRequest({
        url: '/api/base/rule/runLog',
        method: 'get',
        params
    })
}

// 规则：运行日志独立页面查询（分页，关联规则+分类）
export function queryRunLogPage(params){
    return HttpRequest({
        url: '/api/base/rule/runLog/page',
        method: 'get',
        params
    })
}
