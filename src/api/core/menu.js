import HttpRequest from "../../utils/request.js";

// 应用：查询
export function queryApps(){
    return HttpRequest({
        url: '/api/core/sys/app/query',
        method: 'get'
    })
}

// 应用：新增/修改
export function submitApp(data){
    return HttpRequest({
        url: '/api/core/sys/app/submit',
        method: 'post',
        data
    })
}

// 应用：删除
export function deleteApp(data){
    return HttpRequest({
        url: '/api/core/sys/app/delete',
        method: 'post',
        data
    })
}

// 菜单：查询菜单树（树形结构）
export function queryMenuTree(params){
    return HttpRequest({
        url: '/api/core/sys/menu/tree',
        method: 'get',
        params: params,
    })
}

// 菜单：查询全部应用菜单树
export function queryAllAppMenu(params){
    return HttpRequest({
        url: '/api/core/sys/menu/tree/all',
        method: 'get',
        params: params,
    })
}

// 菜单：查询租户内应用菜单树
export function queryTenantMenu(params){
    return HttpRequest({
        url: '/api/core/sys/menu/tree/tenant',
        method: 'get',
        params: params,
    })
}

// 菜单：查询所有（平铺列表，用于下拉选择/菜单分配）
export function queryAllMenus(){
    return HttpRequest({
        url: '/api/core/sys/menu/list',
        method: 'get'
    })
}

// 菜单：根据父菜单ID查询子菜单
export function queryMenuByParentId(parentId){
    return HttpRequest({
        url: '/api/core/sys/menu/listByParentId',
        method: 'get',
        params: { parentId }
    })
}

// 菜单：新增/修改
export function submitMenu(data){
    return HttpRequest({
        url: '/api/core/sys/menu/submit',
        method: 'post',
        data
    })
}

// 菜单：删除（批量）
export function deleteMenu(data){
    return HttpRequest({
        url: '/api/core/sys/menu/delete',
        method: 'post',
        data
    })
}
