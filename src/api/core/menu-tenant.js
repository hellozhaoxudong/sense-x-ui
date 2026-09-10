import HttpRequest from "../../utils/request.js";

// 查询租户已分配的菜单ID列表
export function queryMenuIdsByTenantId(tenantId){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/menuIds',
        method: 'get',
        params: { tenantId }
    })
}

// 为租户分配菜单
export function assignMenusToTenant(data){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/assign',
        method: 'post',
        data
    })
}

// 从租户移除菜单
export function removeMenusFromTenant(data){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/remove',
        method: 'post',
        data
    })
}

// 清空租户所有菜单
export function clearTenantMenus(tenantId){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/clear',
        method: 'post',
        params: { tenantId }
    })
}

// 查询租户已分配的菜单树（带别名）
export function queryTenantMenuTree(tenantId){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/menuTree',
        method: 'get',
        params: { tenantId }
    })
}

// 批量更新租户菜单别名
export function updateMenuAlias(data){
    return HttpRequest({
        url: '/api/core/sys/menu/tenant/updateAlias',
        method: 'post',
        data
    })
}
