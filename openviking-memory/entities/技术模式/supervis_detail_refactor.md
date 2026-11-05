# 产品2.0 zhi2-web-admin supervis 六个 detail.vue 改造
产品2.0 中 zhi2-web-admin 的 6 个 `detail.vue` 已按新版框架改造，子表组件权限同步更新。

## 改造汇总
- 6 个 `detail.vue` 均已按新版框架改造
- 子表组件权限也已同步更新

## 各文件 moduleName / businessName / permsPrefix
- `notice/detail.vue`：moduleName=`prefund`、businessName=`paymentNotice`、permsPrefix=`finance:notice`
- `refund/detail.vue`：moduleName=`prefund`、businessName=`refundNotice`、permsPrefix=`finance:refund`
- `additional/detail.vue`：moduleName=`prefund`、businessName=`additional`、permsPrefix=`additional:additional`
- `adjustmentofAccounts/detail.vue`：moduleName=`prefund`、businessName=`manualReconciliation`、permsPrefix=`adjustment:Accounts`
- `contractmain/detail.vue`：moduleName=`finance`、businessName=`contractmain`、permsPrefix=`finance:contract`

## 验证与归属
- 涉及文件：`detail.vue`、`notice/detail.vue`、`refund/detail.vue`、`additional/detail.vue` 等
- 所属项目：产品2.0；来源会话ID：c9f9ee80-42f1-4371-b5be-6b97ed6f2f85
- 验证证据：extracted source=cursor project=产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervis_detail_refactor",
  "source_extraction_id": "b12861a579a6400884413657f5f2a484",
  "version": 1,
  "memory_type": "entities"
}
-->