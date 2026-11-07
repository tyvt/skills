# 批量导入必填 feeMode 拦截模式
苏住房G 项目批量导入场景需在 bulkImportDialog.vue 的 excelImport params 中显式包含必填 feeMode，未选收费模式时前端拦截提示且不发起导入请求。
## 问题背景
- 批量导入（如费用申报、减免记录）缺少收费模式 feeMode 会导致后端数据异常或失败
## 解决方案
- bulkImportDialog.vue 的 excelImport params 已包含必填 feeMode 字段
- 未选收费模式时拦截并提示用户，不发起导入请求
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/051.md
- 涉及文件：feeDeclare2/components/bulkImportDialog.vue、reduceRecordTable.vue、feeBindScopeTable.vue、feeDeclare2/index.vue、declare/components/upload.vue
- 所属项目：苏住房G；来源会话ID：8f44dfe2-7e91-48e0-b0d2-eb247b076f7b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "bulk_import_feemode",
  "source_extraction_id": "7980eb58e83f45239abd1fe75908ad68",
  "version": 1,
  "memory_type": "entities"
}
-->