import request from "../../utils/request.js";

// 查询系统信息
export function queryOs() {
    return request({
        url: `/api/os/query`,
        method: 'get'
    });
}

export function queryOsUsage() {
    return request({
        url: `/api/os/usage`,
        method: 'get'
    });
}


export function queryHisCmd() {
    return request({
        url: `/api/docker/command`,
        method: 'get'
    });
}
