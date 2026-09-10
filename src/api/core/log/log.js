import HttpRequest from "../../../utils/request.js";

export function queryLog(params, data){
    return HttpRequest({
        url: '/api/core/log/query',
        method: 'post',
        params,
        data
    })
}