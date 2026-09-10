import HttpRequest from "../../../utils/request.js";

export function queryThirdApp(){
    return HttpRequest({
        url: '/api/core/third/app/query',
        method: 'get',
    })
}

export function queryAppById(params){
    return HttpRequest({
        url: '/api/core/third/app/queryById',
        method: 'get',
        params
    })
}