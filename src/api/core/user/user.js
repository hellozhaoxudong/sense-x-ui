import HttpRequest from "../../../utils/request.js";

export function queryUser(params){
    return HttpRequest({
        url: '/api/core/user/query',
        method: 'get',
        params
    })
}

export function submitUser(data){
    return HttpRequest({
        url: '/api/core/user/submit',
        method: 'post',
        data
    })
}

export function changeMyInfo(data){
    return HttpRequest({
        url: '/api/core/user/my/info/change',
        method: 'post',
        data
    })
}

export function changeMyPassword(params){
    return HttpRequest({
        url: '/api/core/user/my/password/change',
        method: 'get',
        params
    })
}

export function deleteUser(data){
    return HttpRequest({
        url: '/api/core/user/delete',
        method: 'post',
        data
    })
}

// 用户：分配角色
export function distributeUserRole(userId, roleIds){
    return HttpRequest({
        url: '/api/core/user/role/distribute',
        method: 'post',
        params: { userId },
        data: roleIds
    })
}

// 角色：查询（用于下拉/列表，params 可选）
export function queryRole(params){
    return HttpRequest({
        url: '/api/core/role/query',
        method: 'get',
        params
    })
}

// 角色：新增/修改
export function submitRole(data){
    return HttpRequest({
        url: '/api/core/role/submit',
        method: 'post',
        data
    })
}

// 角色：删除（批量）
export function deleteRole(data){
    return HttpRequest({
        url: '/api/core/role/delete',
        method: 'post',
        data
    })
}

// 角色：导出
export function exportRole(){
    return HttpRequest({
        url: '/api/core/role/export',
        method: 'get',
        responseType: 'blob'
    })
}

// 租户：查询
export function queryTenant(params){
    return HttpRequest({
        url: '/api/core/tenant/query',
        method: 'get',
        params
    })
}

// 租户：查询租户管理员
export function queryTenantAdminUser(params){
    return HttpRequest({
        url: '/api/core/tenant/admin/user',
        method: 'get',
        params
    })
}

// 租户：新建
export function createTenant(data){
    return HttpRequest({
        url: '/api/core/tenant/create',
        method: 'post',
        data
    })
}

// 租户：修改
export function submitTenant(data){
    return HttpRequest({
        url: '/api/core/tenant/submit',
        method: 'post',
        data
    })
}

// 租户：删除（批量）
export function deleteTenant(data){
    return HttpRequest({
        url: '/api/core/tenant/delete',
        method: 'post',
        data
    })
}

// 查询组织部门树
export function queryOrganizeTree() {
    return HttpRequest({
        url: `/api/core/organize/tree`,
        method: 'get'
    })
}

// 提交组织部门（新增/修改）
export function submitOrganize(data) {
    return HttpRequest({
        url: `/api/core/organize/submit`,
        method: 'post',
        data
    })
}

// 删除组织部门（批量）
export function deleteOrganize(data) {
    return HttpRequest({
        url: `/api/core/organize/delete`,
        method: 'post',
        data
    })
}

// 查询某组织下的用户
export function queryOrganizeUser(params) {
    return HttpRequest({
        url: `/api/core/user/organize/query`,
        method: 'get',
        params
    })
}

// 向组织添加用户
export function submitOrganizeUser(params, data) {
    return HttpRequest({
        url: `/api/core/user/organize/submit`,
        method: 'post',
        params,
        data
    })
}

// 从组织移除用户
export function deleteOrganizeUser(params, data) {
    return HttpRequest({
        url: `/api/core/user/organize/delete`,
        method: 'post',
        params,
        data
    })
}

// 岗位：查询列表
export function queryPosition(params) {
    return HttpRequest({
        url: '/api/core/position/query',
        method: 'get',
        params
    })
}

// 岗位：新增/修改
export function submitPosition(data) {
    return HttpRequest({
        url: '/api/core/position/submit',
        method: 'post',
        data
    })
}

// 岗位：删除（批量）
export function deletePosition(data) {
    return HttpRequest({
        url: '/api/core/position/delete',
        method: 'post',
        data
    })
}

// 岗位：查询岗位下用户
export function queryPositionUser(params) {
    return HttpRequest({
        url: '/api/core/position/user/query',
        method: 'get',
        params
    })
}

// 岗位：查询岗位未添加用户
export function queryUnPositionUser(params) {
    return HttpRequest({
        url: '/api/core/position/user/unquery',
        method: 'get',
        params
    })
}

// 岗位：向岗位添加用户
export function addPositionUser(params, data) {
    return HttpRequest({
        url: '/api/core/position/user/add',
        method: 'post',
        params,
        data
    })
}

// 岗位：从岗位移除用户
export function removePositionUser(params, data) {
    return HttpRequest({
        url: '/api/core/position/user/remove',
        method: 'post',
        params,
        data
    })
}