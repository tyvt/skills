# 变更编辑页按钮精简修复
产品2.0 的 toB 企业变更记录编辑页仅保留「保存」按钮，移除「提交审核」。

## 问题根因
- `toB/companyRecord/detail.vue` 原同时存在「保存」与「提交审核」按钮及重复提交逻辑
- E2E 用例因固定等待导致耗时过长

## 解决方案
- 移除「提交审核」按钮及相关逻辑，保存统一走 `updateCompanyRecordChange`
- 去掉重复的 `submitCompanyRecordChangeByLogin` 调用
- E2E `company-record-change.spec.js` 改为点「保存」并仅等待 `update` 接口响应

## 验证与归属
- 编辑页最终仅「保存」按钮由 `operation-btn-group` 内置渲染
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`toB/companyRecord/detail.vue`、`e2e/company/company-record-change.spec.js`、`e2e/fixtures/company-helpers.js`、`auth-helpers.js`
- 来源会话：f7bf284e-5e74-49da-969a-742d7d983d0f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_record_btn",
  "source_extraction_id": "b7c4512054fb4b70bf552a713aed3145",
  "version": 1,
  "memory_type": "entities"
}
-->