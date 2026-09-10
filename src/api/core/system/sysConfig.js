import request from "../../../utils/request.js";

// 查询配置
export function queryConfig() {
    return request({
        url: `/api/core/sys/config/query`,
        method: 'get',
    });
}

// 查询配置
export function queryConfigMap(params) {
    return request({
        url: `/api/core/sys/config/map/query`,
        method: 'get',
        params: params,
    });
}


// 提交配置
export function submitConfig(data) {
    return request({
        url: `/api/core/sys/config/submit`,
        method: 'post',
        data: data,
    });
}
