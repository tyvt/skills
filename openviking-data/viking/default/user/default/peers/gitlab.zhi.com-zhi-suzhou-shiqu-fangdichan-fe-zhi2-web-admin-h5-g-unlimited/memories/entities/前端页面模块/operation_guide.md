# 操作指引页面（operationGuide）
门户 H5 首页的「操作指引」页面模块，按角色页签展示入网与业务操作步骤。

## 位置与结构
- 代码位于 `src/views/home/operationGuide/`，内容配置为 `operationGuideContent.js`，渲染组件为 `OperationGuideBody.vue`。
- 页面访问使用 hash 路由：`/#/operation-guide`（普通 path 会被路由守卫重定向到登录页）。
- 原有版式包含 callout（入网提示块）、卡片与按钮渲染分支；2026-11-24 新增 `flow` 九步流程版式。

## 版式与样式
- `flow` 版式：两行 5+4 共九步流程，圆圈序号、蓝顶边白卡、浅蓝箭头连接，底部为「开发企业入网」按钮。
- 样式为 scoped SCSS，插入在既有 `.og-callout` 样式块之前；窄屏下需收缩换行。

## 构建与部署
- 本地验证不使用 dev server，改用本机 nginx 静态部署；门户站点端口为 8090–8094。
- 8092 端口服务最新门户 dist 构建；8099 端口是太仓项目的旧构建，与本模块无关。
- 2026-11-24 的基线构建与改动后构建均通过（exit 0），新 dist 已生效于 8092。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "前端页面模块",
  "name": "operation_guide",
  "source_extraction_id": "6907e66607ed4e49816fa81e93c64489",
  "version": 1,
  "memory_type": "entities"
}
-->