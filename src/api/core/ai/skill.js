import HttpRequest from "../../../utils/request.js";

// 技能：查询列表
export function querySkill(params) {
    return HttpRequest({
        url: "/api/core/ai/skill/query",
        method: "get",
        params
    });
}

// 技能：新增/修改
export function submitSkill(data) {
    return HttpRequest({
        url: "/api/core/ai/skill/submit",
        method: "post",
        data
    });
}

// 技能：批量删除
export function deleteSkill(data) {
    return HttpRequest({
        url: "/api/core/ai/skill/delete",
        method: "post",
        data
    });
}
