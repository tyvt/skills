# 业务申请编号查询mSouseCode拼写错误
在guaranteeDeposit组件中查询参数误写为mSouseCode，后端实际接收mSourceCode导致查询失效。

## 问题根因
- guaranteeDeposit/components/index.vue的getQueryParams中params.mSouseCode字段名拼写错误
- 后端接口期望字段为mSourceCode，字段不匹配导致业务申请编号查询无效

## 解决方案
- 将params.mSouseCode改为params.mSourceCode以匹配后端字段
- 涉及文件：src/views/maintenance/guaranteeDeposit/components/index.vue、guaranteeDepositAccount/components/AccountDetailTable.vue

## 验证与归属
- 验证证据：src=产品2.0/080.md
- 来源会话ID：8e75823d-70d8-480e-aee1-0a132b175de7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_msourcecode_bug",
  "source_extraction_id": "d9a197141e654eb98942cde621312789",
  "version": 1,
  "memory_type": "entities"
}
-->