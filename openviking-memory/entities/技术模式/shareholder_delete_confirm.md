# 删除股东需确认
在 Suzhou Real Estate Monitoring V3 中，股东删除（单行和批量）现在需要确认弹窗，以避免意外删除。

## 组件变更
- `Step4Shareholders.vue` 添加 `confirmDelete(message)`，调用 Element UI 的 `$confirm`
- 单行和批量删除在执行前确认

## helper 变更
- `register-helpers.js` 添加 `confirmDeleteDialog(page)`
- `deleteShareholderByName` 和 `batchDeleteShareholders` 在执行前确认

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-rest/125.md 和 src=苏州市房地产监测V3/169.md
- 涉及文件: Step4Shareholders.vue, register-helpers.js, detailMixins.js, shareholderTable.vue, permit/detail.vue, company-register-branch.spec.js, shareholder/index.vue, listMixins.js
- 会话: be083398-3966-4e2a-b4e7-52daef8b2c73; baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：be083398-3966-4e2a-b4e7-52daef8b2c73


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_delete_confirm",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 2,
  "memory_type": "entities"
}
-->
