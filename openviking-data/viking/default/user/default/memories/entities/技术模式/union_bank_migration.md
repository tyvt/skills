# 银行代码接口迁移至 unionBank 模块
前端将银行代码接口统一为 `/system/unionBank/page` (通过 `VITE_APP_BASE_API=/api/v3.0`)。

## 变更
- 新增 `zhi2-web-admin/src/api/system/unionBank.js` 导出 `pageUnionBank()`
- `yhlhhgl.js` 将 `listYhlhhgl` 改为调用 `pageUnionBank()`；旧的 CRUD `unionCodeManage/*` 保留

## 文件
- company/companyApply/detail.vue
- company/companyManagement/components/bankTable.vue
- company/companyRegister/components/bankTable.vue
- company/relatedUnitRecord/components/relatedUnitRecordBank.vue
- company/companyManagement/components/detail.vue
- company/companyApplyAudit/detail.vue
- company/companyManagement/components/CompanyBasicInfoForm.vue
- property/pubMerchantApply/detail.vue

## 验证
- 验证证据: src=苏州市房地产监测V3/029.md
- 会话: 6ce24e16-f765-47a3-bfb6-b6b8daf87b3a

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6ce24e16-f765-47a3-bfb6-b6b8daf87b3a


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "union_bank_migration",
  "source_extraction_id": "c7ea67c41536451ea2f1166b9de5c647",
  "version": 1,
  "memory_type": "entities"
}
-->
