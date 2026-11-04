# 将 backUrl 传入 Vue Router 3 的待办返回
在 zhi2-web-admin 项目（Huishan Fase 2G）中，在“flowable 待办 → 业务详情 → 返回”场景下，定义如何将 backUrl 字符串有效且安全地传递给 Vue Router 3。

## 上下文
- `utils/ruoyi.js` 中的 `navigateToTodoTask` 记录 `query.backUrl`；`main.js`/`OperationBtnGroup` 中的 `goBack` 使用 `resolveBackNavigationPath` + `router.push({ path, query: { type: 'back' } })`。
- `utils/ruoyi.js` 中的 `resolveBackNavigationTarget` 已修正，以正确返回列表、补充 `backUrl`、识别 `directDetail` 路由并统一详情路径。

## 问题与修正
- 问题 1（Vue Router 3 解析）：带有 `?pageNum=2` 的地址原始插入 `path` 会导致失败或 404；在 push 之前按 `?`/`#` 分割或使用 `new URL(backUrl, origin)`，或者禁止 backUrl 中包含 query 并在入口处校验。
- 问题 2（安全性）：未校验的 `query.backUrl`/`options.backUrl` 允许恶意重定向（`//evil.com`、scheme）；仅接受以单个 `/` 开头的内部路径（拒绝 `//`、`:`、`http`），否则忽略并通过路径返回。
- 问题 3（状态丢失 MEDIUM）：`navigateToTodoTask` 仅记录 `current.path` 而不含 query，返回带有筛选/分页的列表时会丢失状态；应使用 `fullPath` 或序列化 query 以完整恢复。
- 特定 Bug（session 1f86f5fa）：首页待办通过 `navigateToTodoTask` 进入详情时未带 `backUrl`；旧的 `lastIndexOf('/')` 裁剪了 `detail/{id}` 导致进入无 ID 的空壳页面引发参数错误；未识别 `directDetail` 路由。已在 `utils/ruoyi.js` 的 `resolveBackNavigationTarget` 中修正，以返回列表、添加 `backUrl`、识别 `directDetail` 并统一详情路径。

## 涉及文件
- utils/ruoyi.js, main.js, components/OperationBtnGroup/index.vue
- views/autonomy/record/components/detail.vue, components/detail-template/detail-template.vue, views/autonomy/record/components/directDetail.vue, mixins/detailMixins.js, mixins/form.js

## 验证与归属
- 会话：26959102（router.push 与 query 不兼容 HIGH；backUrl 未校验 HIGH；query 丢失 MEDIUM），1f86f5fa-6621-449b-b902-a3be952fcbd5（backUrl 待办 bug）
- 所属项目: Huishan Fase 2G; 代码基线: adccd7e（新的为 none）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_backurl_router",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 2,
  "memory_type": "entities"
}
-->