# 全局 zs/el 模板标签不匹配修复
苏州市房地产监测V3 中 `zs-table-column` 与 `zs-form-item` 闭合标签错配已全局修复并加防复发脚本。

## 问题
- 多处使用 `</el-table-column>`、`</el-form-item>` 但无对应 `zs-` 开标签，导致标签不匹配

## 修复要点
- 50 个文件 53 处 `</el-table-column>` 改为 `</zs-table-column>`（含 BankSelectionDialog.vue、noticeTable.vue）
- 1 个文件 7 处 `</el-form-item>` 改为 `</zs-form-item>`（specialcontract/detail.vue）
- 新增 `scripts/scan-tag-mismatch.js` 防复发扫描脚本

## 涉及文件
- zhi2-web-admin/src/views/supervision/agreement/account/components/BankSelectionDialog.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/specialcontract/detail.vue
- zhi2-web-admin/scripts/scan-tag-mismatch.js
- noticeTable.vue 等

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 来源会话：87be2e49-0b05-4693-a268-9e74acd77f29；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tag_mismatch_fix",
  "source_extraction_id": "6e590f142e9a49449b6145ec50c5ca14",
  "version": 1,
  "memory_type": "entities"
}
-->