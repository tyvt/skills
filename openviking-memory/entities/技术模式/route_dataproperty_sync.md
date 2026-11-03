# 接口路由改 dataProperty 须同步 moduleName
接口 URL 由 `/maintenance/` 变更为 `/dataProperty/` 后，原 `moduleName: 'maintenance'` 未同步会导致请求路径错误，须全局改 moduleName。

## 问题根因
- 接口 URL 前缀由 `/maintenance/` 变更为 `/dataProperty/`。
- 原代码 `moduleName: 'maintenance'` 未同步，请求路径仍拼错，导致接口 404 或路径错误。

## 解决方案
- 全局排查 `zhi2-web-admin/src/**/*.{vue,js}`，将 `moduleName` 改为 `'dataProperty'` 以匹配 `businessName` 路由。

## 验证与归属
- 验证证据：src=2-0/010.md
- 涉及文件：publicQuery/complex/components/facilityTable.vue、maintenance/facility/index.vue、maintenance/facilityDefinition/facilityDefinitionDialog.vue、maintenance/facilityDefinition/FieldTableDialog.vue
- 所属项目：2-0；来源会话ID：f27111ea-1764-4c3e-9978-077951c4dd1b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_dataproperty_sync",
  "source_extraction_id": "d605c9e3116c40ecab3d74860b526a1f",
  "version": 1,
  "memory_type": "entities"
}
-->