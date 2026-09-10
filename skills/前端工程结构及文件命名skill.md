### 一、Skill 说明
本文档用于约束 sense-ui 项目的前端文件目录结构、文件命名、模块归属以及 API 文件组织方式。
AI 在创建、修改或补充前端代码时，必须遵循本 Skill。

核心原则：
页面按应用和业务模块归类，API 与页面保持对应关系，公共能力统一放置，禁止随意创建目录和文件。

### 二、项目整体目录结构
- sense-x-ui/src/api: API接口，按应用分子目录
- sense-x-ui/src/views: 页面文件，按应用分子目录
- sense-x-ui/src/core/component: 通用组件，所有页面均应使用这些通用组件
- sense-x-ui/src/router: 路由文件，应用分子文件，通过index.js统一引入
- sense-x-ui/src/utils: 工具函数

### 三、应用模块
- core: 核心模块，用户体系、登录等
- base: 基础模块，数据管理、通用功能等
- data: 数据模块，数据中台相关功能

### 四、页面定义及命名规范
页面必须按照：应用/模块/功能进行组织，标准结构：
- 主页面：sense-x-ui/src/views/应用名/模块名//功能名/功能名.vue
- 编辑弹窗：sense-x-ui/src/views/应用名/模块名/功能名/功能名Edit.vue
- 详情弹窗：sense-x-ui/src/views/应用名/模块名/功能名/功能名Detail.vue
- 其他子组件：sense-x-ui/src/views/应用名/模块名/功能名/components/功能下其他子组件.vue

例如核心模块-基础设置-用户管理：
- 用户列表：sense-x-ui/src/views/core/system/user/User.vue
- 编辑用户：sense-x-ui/src/views/core/system/user/UserEdit.vue
- 用户详情：sense-x-ui/src/views/core/system/user/UserDetail.vue
- 分配角色弹窗：sense-x-ui/src/views/core/system/user/components/UserRoleEdit.vue

### 五、API命名规范
应将一个功能所有的api请求封装到一个js文件中，按照：应用/模块/功能.js进行组织，标准结构：
- sense-x-ui/src/api/应用名/模块名/功能名.js
例如核心模块-基础设置-用户管理：
- sense-x-ui/src/api/core/system/user.js

请求js中，应使用封装好的request.js发送请求，例如：
```shell
import HttpRequest from "../../../utils/request.js";
export function queryUser(params){
    return HttpRequest({
        url: '/api/core/user/query',
        method: 'get',
        params
    })
}
```

请求方法命名规范：
- 查询方法: query功能名(params)
- 查询详情方法: query功能名Detail(params)
- 提交方法: submit功能名(data)
- 删除方法: delete功能名(params)
- 导入方法：import功能名(data)
- 导出方法：export功能名(data)

### 六、页面内方法命名规范
- 常见情况下，页面加载时查询数据，应放在一个function initData()中，onMounted中调用这个方法
- 新增按钮方法命名：无需独立方法，直接 @click="showEdit = true;"
- 表格行内编辑方法命名：无需独立方法，直接 @click="current = row; showEdit = true;"
- 删除按钮方法命名：onDelete功能名()
- 编辑页提交按钮方法命名：onSubmit()
- 导入按钮方法命名：onImport功能名()
- 导出按钮方法命名：onExport功能名()

### 七、页面内其他规范
- 严禁自行创建loading，框架层已提供通用loading效果；
- 严禁使用computed进行数据转换

