# 股东信息删除确认提示修复
苏州市房地产监测V3 项目修复股东信息删除确认提示，统一使用 Element UI $confirm 确认框。

## 改动内容
- `Step4Shareholders.vue` 新增 `confirmDelete(message)`，使用 Element UI `$confirm`，样式与 `table.js` 一致
- 单行删除弹「是否确认删除该股东信息？」，确认后再删除；批量删除弹「是否确认删除已选的数据项?」
- 点击「取消」时不执行删除

## 测试辅助
- `register-helpers.js` 新增 `confirmDeleteDialog(page)`，处理 `.el-message-box` 确认框
- `deleteShareholderByName`、`batchDeleteShareholders` 在点击删除后先确认再继续断言

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- `company-register-branch.spec.js`「步骤返回与股东维护」用例通过（含单行、批量删除流程）
- 涉及文件：`Step4Shareholders.vue`、`table.js`、`register-helpers.js`、`company-register-branch.spec.js`
- 所属项目：苏州市房地产监测V3；来源会话：be083398-3966-4e2a-b4e7-52daef8b2c73；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_del_confirm",
  "source_extraction_id": "62dedeb762f4419ea3e8f6efbbe1b55c",
  "version": 1,
  "memory_type": "entities"
}
-->