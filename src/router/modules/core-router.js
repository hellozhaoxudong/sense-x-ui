import Tenant from "../../views/core/tenant/Tenant.vue";
import ManagerLayout from "../../layout/Manager/ManagerLayout.vue";
import Role from "../../views/core/role/Role.vue";
import Organize from "../../views/core/organize/Organize.vue";
import User from "../../views/core/user/User.vue";
import Log from "../../views/core/log/Log.vue";
import Login from "../../views/core/login/Login.vue";
import QaAgent from "../../views/core/agent/qaAgent/QaAgent.vue";
import Model from "../../views/core/model/Model.vue";
import ThirdApps from "../../views/core/third/ThirdApps.vue";
import ThirdAppLayout from "../../layout/ThirdApp/ThirdAppLayout.vue";
import ThreadIfm from "../../views/core/third/ThreadIfm.vue";
import UI from "../../views/core/ui/UI.vue";
import Position from "../../views/core/position/Position.vue";
import Menu from "../../views/core/menu/Menu.vue";
import Company from "../../views/core/company/Company.vue";
import Notice from "../../views/core/notice/Notice.vue";
import Dict from "../../views/core/dict/Dict.vue";
import Map from "../../views/core/map/Map.vue";
import BaseFile from "../../views/core/file/BaseFile.vue";
import Rule from "../../views/base/rule/Rule.vue";
import RuleRunLogPage from "../../views/base/rule/RuleRunLogPage.vue";
import RuleData from "../../views/base/ruleData/RuleData.vue";
import Skill from "../../views/core/ai/skill/Skill.vue";
import SysConfig from "../../views/core/config/SysConfig.vue";

export default [
    {
        component: ManagerLayout,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: User,
                meta: { title: '业务示例页面', menuCode: 'sense.dashboard', icon: 'icon-home' },
            },
        ],
    },
    {
        path: "/base",
        redirect: "/base/company",
        name: "Base",
        component: ManagerLayout,
        meta: { title: '基础配置', menuCode: 'sense.base', icon: 'icon-settings' },
        children: [
            {
                path: "/base/company",
                name: "Company",
                component: Company,
                meta: { title: '企业管理', icon: 'icon-home'},
            },
            {
                path: "/base/notice",
                name: "Notice",
                component: Notice,
                meta: { title: '通知管理', icon: 'icon-notification'},
            },

            {
                path: "/base/map",
                name: "Map",
                component: Map,
                meta: { title: '地图', icon: 'icon-notification', transparentBck: true},
            },
            {
                path: "/base/dict",
                name: "Dict",
                component: Dict,
                meta: { title: '字典配置', icon: 'icon-book', transparentBck: true},
            },
            {
                path: "/base/file",
                name: "File",
                component: BaseFile,
                meta: { title: '文件管理', icon: 'icon-home', transparentBck: true},
            },
        ]
    },
    {
        component: ManagerLayout,
        children: [
            {
                path: "/third-apps",
                name: "ThirdApps",
                component: ThirdApps,
                meta: { title: '第三方系统', menuCode: 'sense.third-apps', icon: 'icon-home' },
            },
        ],
    },

    {
        component: ThirdAppLayout,
        children: [
            {
                path: "/third-ifm/:appId?",
                name: "ThirdIfm",
                component: ThreadIfm,
                hidden: true,
                meta: { title: '第三方系统', menuCode: 'sense.third-ifm', icon: 'icon-home' },
            },
        ],
    },
    {
        path: "/agent",
        redirect: "/agent/qa",
        name: "AiAgent",
        component: ManagerLayout,
        meta: { title: 'AI智能体', menuCode: 'sense.agent', icon: 'icon-settings' },
        children: [
            {
                path: "/agent/qa/:chatId?",
                name: "QaAgent",
                component: QaAgent,
                meta: { title: '智能问答', icon: 'icon-common', transparentBck: true },
            },
            {
                path: "/agent/skill",
                name: "Skill",
                component: Skill,
                meta: { title: '技能管理', icon: 'icon-apps' },
            }
        ]
    },

    {
        path: "/infra",
        redirect: "/infra/organize",
        name: "Infra",
        component: ManagerLayout,
        meta: { title: '组织体系', menuCode: 'sense.infra', icon: 'icon-settings' },
        children: [
            {
                path: "/infra/organize",
                name: "Organize",
                component: Organize,
                meta: { title: '组织部门', icon: 'icon-mind-mapping', transparentBck: true },
            },
            {
                path: "/infra/position",
                name: "Position",
                component: Position,
                meta: { title: '岗位管理', icon: 'icon-user', transparentBck: true},
            },
            {
                path: "/infra/role",
                name: "Role",
                component: Role,
                meta: { title: '角色管理', icon: 'icon-idcard', transparentBck: true},
            },
            {
                path: "/infra/user",
                name: "User",
                component: User,
                meta: { title: '用户管理', icon: 'icon-user-group'},
            },
        ]
    },
    {
        path: "/setting",
        redirect: "/setting/user",
        name: "Setting",
        component: ManagerLayout,
        meta: { title: '系统设置', menuCode: 'sense.setting', icon: 'icon-settings' },
        children: [
            {
                path: "/setting/config",
                name: "Config",
                component: SysConfig,
                meta: { title: '平台配置', icon: 'icon-history'},
            },
            {
                path: "/setting/tenant",
                name: "Tenant",
                component: Tenant,
                meta: { title: '租户管理', icon: 'icon-common' },
            },
            {
                path: "/setting/menu",
                name: "Menu",
                component: Menu,
                meta: { title: '菜单管理', icon: 'icon-menu'},
            },
            {
                path: "/setting/model",
                name: "Model",
                component: Model,
                meta: { title: '模型管理', icon: 'icon-common'},
            },
            {
                path: "/setting/log",
                name: "Log",
                component: Log,
                meta: { title: '日志监控', icon: 'icon-history'},
            },
            {
                path: "/setting/ui",
                name: "UI",
                component: UI,
                meta: { title: 'UI组件库', icon: 'icon-history'},
            },

        ]
    }
]