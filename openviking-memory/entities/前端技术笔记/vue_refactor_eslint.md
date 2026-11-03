# Vue批量重构ESLint解析错误模式
批量重构数百个 .vue 文件后，pre-commit 的 ESLint 常因 SFC 结构破坏报 Parsing error，业务逻辑无误。

## 高发模式
- computed 属性未正确闭合，return 后误写 `],` 而非 `},`
- return 语句后多逗号（如 `return 'list',`）
- computed 块未闭合就直接进入 methods（缺 `},`）
- 注释掉的 computed 留下孤立 `},` 或破坏数组结构
- 对象属性漏逗号

## 收口做法
- 不要逐文件人眼看报错，按五类模式对全部变更的 .vue 文件做全量扫描（曾重扫 507 个变更文件确认无残留）
- 重新暂存提交；若提交时 SIGKILL 是内存不足，减少单次暂存文件数或调高 NODE_OPTIONS=--max-old-space-size

## 验证与归属
- 验证：会话 5fbf0b20 提交失败，15 文件命中模式，全量重扫 507 个变更 .vue 后无剩余 Parsing error
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountQuery/index.vue、budget/index.vue、report/projectSummary/components/index.vue
- 所属项目：园区物管2.0；代码基线 8f4427ecd；来源会话 5fbf0b20-9378-4a13-8296-bd55786a876a

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "vue_refactor_eslint",
  "source_extraction_id": "732ef96d5bf7463e9ae98e333c3decbd",
  "version": 1,
  "memory_type": "entities"
}
-->