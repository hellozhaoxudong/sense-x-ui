import HttpRequest from "../../../utils/request.js";

export function queryMyChat(params){
    return HttpRequest({
        url: '/api/cbi/smart/chat/query',
        method: 'get',
        params
    })
}

export function queryChatMessage(params){
    return HttpRequest({
        url: '/api/cbi/smart/chat/message/query',
        method: 'get',
        params
    })
}

export function saveChatMessage(data){
    return HttpRequest({
        url: '/api/cbi/smart/chat/message/create',
        method: 'post',
        data
    })
}