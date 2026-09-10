import ManagerLayout from "../../layout/Manager/ManagerLayout.vue";
import Company from "../../views/core/company/Company.vue";
import Notice from "../../views/core/notice/Notice.vue";
import Map from "../../views/core/map/Map.vue";
import Rule from "../../views/base/rule/Rule.vue";
import RuleData from "../../views/base/ruleData/RuleData.vue";
import RuleRunLogPage from "../../views/base/rule/RuleRunLogPage.vue";

export default [
    {
        path: "/rule",
        redirect: "/rule/setting",
        name: "Rule",
        component: ManagerLayout,
        meta: { title: '规则引擎', menuCode: 'sense.rule', icon: 'icon-settings' },
        children: [
            {
                path: "/rule/setting",
                name: "RuleSetting",
                component: Rule,
                meta: { title: '规则配置', icon: 'icon-home', transparentBck: true },
            },
            {
                path: "/rule/data",
                name: "RuleData",
                component: RuleData,
                meta: { title: '规则数据', icon: 'icon-storage', transparentBck: true },
            },
            {
                path: "/rule/log",
                name: "RuleLog",
                component: RuleRunLogPage,
                meta: { title: '运行日志', icon: 'icon-home' },
            }
        ]
    }
]