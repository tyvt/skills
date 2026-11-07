# 苏住房G
苏住房G 是一个前端 Web 管理后台代码仓库（zhi2-web-admin）。

## Description
- 仓库路径为 `d:\repository\苏住房G\zhi2-web-admin`
- 包含企业（company）相关 6 个页面，位于 `src/views/company/` 下
- 前端路由由后端菜单动态注册，文件路径即路由路径（如 `company/companyManagement/property`）

## Architecture
- 列表/详情通过 mixin（`src/mixins/table.js`）拼接 REST 路径：`/${moduleName}/${businessName}/${apiSuffix}`
- 无独立 `src/api/company/*.js` 接口定义文件
- 业务状态字典来自全局 store（`main.js` 注入 `bizStateOptions`）
- 列表 `bizState` 列使用 tag 渲染

## Key Components
- 费用申报批量导入组件 `src/views/property/feeDeclare2/components/bulkImportDialog.vue` 的导入参数含必填 `feeMode`
- `src/utils/request.js` 的 401 拦截逻辑含 `isLoggingOut` 标志，主动退出时抑制过期弹窗
- `src/utils/resolveServerAssetUrl.js` 提供按当前页面地址解析的资源 URL 方法，适配子路径部署
- `src/views/publicQuery/monthlyReport/index.vue` 的「是否提交」列使用 `dictUrl: 'monthly_report_submitted'`

## Relations
- 涉及模块：物业服务企业等公司管理模块

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "苏住房G",
  "source_extraction_id": "d04d4dc7431546908ac70fda3a11aba5",
  "version": 2,
  "memory_type": "entities"
}
-->