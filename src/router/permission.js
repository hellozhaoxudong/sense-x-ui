import {UserStore} from "../store/core/UserStore.js";
import {Message} from "@arco-design/web-vue";

export function setupPermission(router){
    router.beforeEach(async (to, from, next) => {
        if (to.path === '/login'){
            next();
        }

        // 检查是否有token
        const token = sessionStorage.getItem('sense.access_token');
        if (!token) {
            Message.info('请登录')
            next('/login');
            return;
        }

        // 检查是否有用户信息
        const userStore = UserStore();
        if (!userStore.userInfo?.id) {
            await userStore.initUserInfo();
        }

        next();
    })

    // 路由跳转后执行
    router.afterEach((to, from, next) => {
        const userStore = UserStore();

        // 高亮当前选中的应用
        userStore.setAppCodeByPath(to.path);
    })
}

