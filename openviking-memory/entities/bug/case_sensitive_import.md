# 构建失败：Windows与Linux文件名大小写差异
产品2.0 的 zhi2-web-admin 在 GitLab Runner（Linux）构建失败，根因为 import 路径大小写与实际文件名不一致。

## 问题根因
- `buildinginfo/detail.vue` 中 import 路径为 `./components/unitTable.vue`（小写 u）
- 实际文件名为 `UnitTable.vue`（大写 U）
- Windows 本地不区分大小写可正常构建，Linux CI 区分大小写导致 Rollup 无法解析

## 修复方案
- 将 import 路径改为与实际文件名一致：`./components/UnitTable.vue`
- 本地 `npm run build` 已通过（exit code 0），提交后 CI 应能正常构建

## 验证与归属
- 验证：cursor 会话 77670b3d 提取，本地构建通过
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue
- 所属项目：产品2.0；来源会话：77670b3d-757c-4c9b-81a1-088b6d675376；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "case_sensitive_import",
  "source_extraction_id": "f665265909c84349965a107959cf0fa9",
  "version": 1,
  "memory_type": "entities"
}
-->