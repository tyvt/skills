# main.js createInstance 幂等保护
产品2.0 中 zhi2-web-admin 的 `createInstance()` 被多次触发，导致 `registerGlobalComponents(app)` 重复执行、同名全局组件反复注册并报 Vue warn。

## 问题根因
- URL 带 `token` 时先命中 `if (token) createInstance()`，后续又走到 `else { createInstance() }`，同一页面初始化两遍。
- `registerGlobalComponents(app)` 对同一组件反复 `app.component(name, ...)` 注册。

## 解决方案
- `createInstance()` 只允许 mount 一次（若 `instance` 已存在直接返回）。
- 全局组件注册幂等：组件已存在则跳过，避免 Vue warn。

## 验证与归属
- 验证证据：会话 1210ef9d 报 main.js:39 Vue warn；修复见 zhi2-web-admin/src/main.js 34:43 与 183:235。
- 涉及文件：zhi2-web-admin/src/main.js
- 所属项目：2-0；来源会话ID：1210ef9d-24f4-4452-a7cc-89267ce1e575；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mainjs_createinstance_idempotent",
  "source_extraction_id": "464ccee4c19e426fbb67c2365f53421a",
  "version": 1,
  "memory_type": "entities"
}
-->