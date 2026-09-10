import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import coreRouter from "./modules/core-router.js";
import {setupPermission} from "./permission.js";
import Login from "../views/core/login/Login.vue";
import Page404 from "../views/core/login/Page404.vue";
import ManagerLayout from "../layout/Manager/ManagerLayout.vue";
import ruleRouter from "./modules/rule-router.js";


// 应用路由
const appRouters = [
    { path: "/", redirect: "/dashboard", hidden: true },
    { path: "/login", name: "Login", component: Login, hidden: true },
    { component: ManagerLayout, children : [ { path: "/404", name: "Page404", component: Page404, hidden: true } ] },
    { path: "/:pathMatch(.*)*", redirect: "/404", hidden: true },

    ...coreRouter,
    ...ruleRouter
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: appRouters,
});

setupPermission(router);

export default router;