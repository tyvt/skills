# 选关联回调与跳转读取字段不一致
产品2.0 中表单选关联数据回调写入 companyId，但跳转函数读 companyRecordId 导致点击跳转静默失效。

## 问题现象
- 选人/带出类回调（handlePick 选关联招标备案、setCompany 选招标方）填充企业字段后，点「招标方」跳企业详情页无反应
- if (!companyRecordId) return 静默拦截，companyRecordId 始终为空

## 根因与修复
- 跳转函数读 this.form.companyRecordId，两回调只赋 this.form.companyId，字段名不一致
- 修复：回调里同时写 companyRecordId 与 companyId，或跳转处兜底 this.form.companyRecordId || this.form.companyId
- 教训：为跳转主键引入别名/兼容字段时，所有写入点都要同步，否则静默 return 难察觉

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/propertyTenderPlan/detail.vue
- 所属项目：产品2.0；来源会话：1dbfe5a3-173e-4c2f-b2c8-f27d4a2193ae；代码基线：9dc17bd

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "callback_field_mismatch",
  "source_extraction_id": "4c0f6b4a207146ac99f3be82996d2ef1",
  "version": 1,
  "memory_type": "entities"
}
-->