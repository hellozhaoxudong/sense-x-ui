import {defineStore} from "pinia";
import {checkToken} from "../../api/system/login.js";

export const UserStore =  defineStore('UserStore', {
    state: () => ({
        userInfo: {},   // 用户信息
        appList: [],    // 当前用户可访问的应用列表
        menuList: [],   // 当前用户可访问的菜单列表

        currentAppCode: '', // 当前用户选中的应用
        tabList: [],    // 当前用户打开的标签页列表
    }),

    actions: {
        // 初始化用户信息
        initUserInfo(){
            return checkToken().then(res=>{
                if (res.data){
                    const { appList } = res.data;

                    this.userInfo = res.data;
                    this.appList = appList;
                }
            })
        },

        // 设置当前选中的App编码
        setAppCode(appCode){
            this.currentAppCode = appCode;

            // 获取菜单列表
            this.appList.forEach(item=>{
                if (item.appCode === appCode){
                    this.menuList = item.menuList;
                }
            })
        },

        // 设置默认第一个App编码
        initFirstAppCode(){
            if (this.appList.length > 0) {
                this.setAppCode(this.appList[0].appCode)
            }
        },

        // 根据路由设置当前选中App编码
        setAppCodeByPath(path){
            let app = '';

            // 递归查找菜单
            const findMenu = (menus) => {
                for (const menu of menus) {
                    if (menu.menuPath === path) {
                        return true;
                    }

                    if (menu.children && menu.children.length > 0) {
                        if (findMenu(menu.children)) {
                            return true;
                        }
                    }
                }

                return false;
            };

            // 遍历应用
            for (const item of this.appList) {
                if (findMenu(item.menuList || [])) {
                    app = item.appCode;
                    break;
                }
            }

            if (app){
                this.setAppCode(app);
            }else {
                this.initFirstAppCode();
            }
        },

        // 添加页签
        addTab(menu){
            // 判断是否已存在相同 name
            const exists = this.tabList.some(tab => tab.menuPath === menu.menuPath);
            if (!exists) {
                this.tabList.push(menu);
            }
        },

        // 移除页签
        removeTab(menuPath){
            // 找到被移除页签的索引
            const index = this.tabList.findIndex(tab => tab.menuPath === menuPath);

            if (index === -1) return null; // 没找到，返回 null

            // 移除页签
            this.tabList = this.tabList.filter(tab => tab.menuPath !== menuPath);

            // 返回前一个页签，如果没有前一个，则返回下一个
            if (this.tabList.length === 0) return null;

            if (index > 0) {
                return this.tabList[index - 1]; // 前一个
            } else {
                return this.tabList[0]; // 如果移除的是第一个，就返回新的第一个
            }
        }
    }
})