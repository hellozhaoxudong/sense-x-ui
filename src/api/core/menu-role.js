import HttpRequest from "../../utils/request.js";

// 查询角色已分配的菜单ID列表
export function queryMenuIdsByRoleId(roleId){
    return HttpRequest({
        url: '/api/core/sys/menu/role/menuIds',
        method: 'get',
        params: { roleId }
    })
}

// 为角色分配菜单
export function assignMenusToRole(data){
    return HttpRequest({
        url: '/api/core/sys/menu/role/assign',
        method: 'post',
        data
    })
}

// 从角色移除菜单
export function removeMenusFromRole(data){
    return HttpRequest({
        url: '/api/core/sys/menu/role/remove',
        method: 'post',
        data
    })
}

// 清空角色所有菜单
export function clearRoleMenus(roleId){
    return HttpRequest({
        url: '/api/core/sys/menu/role/clear',
        method: 'post',
        params: { roleId }
    })
}

// 查询角色已分配的菜单树（带别名）
export function queryRoleMenuTree(roleId){
    return HttpRequest({
        url: '/api/core/sys/menu/role/menuTree',
        method: 'get',
        params: { roleId }
    })
}

// 批量更新角色菜单别名
export function updateRoleMenuAlias(data){
    return HttpRequest({
        url: '/api/core/sys/menu/role/updateAlias',
        method: 'post',
        data
    })
}
