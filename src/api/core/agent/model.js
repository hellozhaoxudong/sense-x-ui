import HttpRequest from "../../../utils/request.js";

// 模型：查询（按类型，可选）
export function queryModel(params) {
    return HttpRequest({
        url: "/api/cbi/smart/model/query",
        method: "get",
        params
    });
}

// 模型：查询（按类型，可选）
export function queryChatModel() {
    return HttpRequest({
        url: "/api/cbi/smart/model/chat/query",
        method: "get"
    });
}

// 模型：新增/修改
export function submitModel(data) {
    return HttpRequest({
        url: "/api/cbi/smart/model/submit",
        method: "post",
        data
    });
}

// 模型：删除（批量）
export function deleteModel(data) {
    return HttpRequest({
        url: "/api/cbi/smart/model/delete",
        method: "post",
        data
    });
}

