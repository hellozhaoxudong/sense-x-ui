import HttpRequest from "../../utils/request.js";

// 登录
export function login(data) {
    return HttpRequest({
        url: `/api/sense/oauth/token`,
        method: 'post',
        data
    });
}

// 检查token是否正常
export function checkToken() {
    return HttpRequest({
        url: `/api/sense/oauth/check_token`,
        method: 'get'
    });
}