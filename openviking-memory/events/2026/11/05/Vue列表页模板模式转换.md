# Summary
用户在产品2.0项目的 zhi2-web-admin 中将 4 个 Vue 列表页转换为 ListTemplate + listMixins 模式。notice/index.vue（缴款通知书）：moduleName=prefund、businessName=paymentNotice、permsPrefix=finance:notice、apiSuffix=list、primaryKey=noticeId；保留特殊逻辑：paymentType 取自路由名 this.$route.name.split('/')[1]（CONTRACT_PAYMENT_NOTE/DEPOSIT_PAYMENT_NOTE），自定义 getList()（定金用 listChangeNotice、合同用 listNotice），搜索项/列按 paymentType 条件显示，operationButtons 增加导出按钮（finance:notice:export），disableButton 使用 mixin 默认。其余 converted 页面：refund/index.vue、additional/index.vue、adjustmentofAccounts/index.vue。完成于 2026-11-05。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】pattern
【标题】Convert these 4 Vue list p
【内容】4 个列表页已全部转换为 `ListTemplate + listMixins` 模式，摘要如下： --- ### 1. `notice/index.vue`（缴款通知书） | 项 | 值 | |---|---| | **moduleName** | `prefund` | | **businessName** | `paymentNotice` | | **permsPrefix** | `finance:notice` | | **apiSuffix** | `list` | | **primaryKey** | `noticeId` | **保留的特殊逻辑：** - `paymentType` 来自路由 `this.$route.name.split('/')[1]`（`CONTRACT_PAYMENT_NOTE` / `DEPOSIT_PAYMENT_NOTE`） - 自定义 `getList()`：定金用 `listChangeNotice`（`/selectDepositNoticeList`），合同用 `listNotice`（`/list`） - 搜索项/列按 `paymentType` 条件显示 - `operationButtons` 增加**导出**按钮（`finance:notice:export`） - `disableButton` 使用 mixin 默
【验证证据】extracted source=cursor project=产品2.0
【涉及文件】`notice/index.vue ; `refund/index.vue ; `additional/index.vue ; `adjustmentofAccounts/index.vue
【所属项目】产品2.0
【来源会话ID】5db9c51e-2b5e-440b-9222-d5a6f6452a33
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "Vue列表页模板模式转换",
  "goal": "记录列表页重构",
  "summary": "用户在产品2.0项目的 zhi2-web-admin 中将 4 个 Vue 列表页转换为 ListTemplate + listMixins 模式。notice/index.vue（缴款通知书）：moduleName=prefund、businessName=paymentNotice、permsPrefix=finance:notice、apiSuffix=list、primaryKey=noticeId；保留特殊逻辑：paymentType 取自路由名 this.$route.name.split('/')[1]（CONTRACT_PAYMENT_NOTE/DEPOSIT_PAYMENT_NOTE），自定义 getList()（定金用 listChangeNotice、合同用 listNotice），搜索项/列按 paymentType 条件显示，operationButtons 增加导出按钮（finance:notice:export），disableButton 使用 mixin 默认。其余 converted 页面：refund/index.vue、additional/index.vue、adjustmentofAccounts/index.vue。完成于 2026-11-05。",
  "ranges": "18-22",
  "source_extraction_id": "c0b8e6e9aa8c40fba7524c2279972657",
  "version": 1,
  "memory_type": "events"
}
-->