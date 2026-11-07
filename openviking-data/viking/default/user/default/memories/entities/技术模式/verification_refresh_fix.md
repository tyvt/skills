# 回单核销删除单据后金额刷新修复
苏住房G项目（含园区公共收益）公共收益回单核销删除单据后基本信息「本次核销金额」未同步，已修复并合入多分支。

## 问题根因
- 删除单据列表后详情页基本信息中的本次核销金额未重新拉取，显示 stale 数据
- table.js 的 handleDelete 只刷新子表列表，不通知父页面
- 详情页 detail.vue 已绑定 @refresh="getDetail"，但删除操作从未触发该事件（删除走 table.js 混入的 handleDelete，成功后只调用 getList()）

## 修复内容
- 修改 src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue
- 新增 deleteSuccessCallback() { this.$emit('refresh') }，删除成功后向父组件发出 refresh 重新拉取详情并同步「本次核销金额」
- 物业模块（仅 suzhufang 分支）收入类也做相应处理
- 提交 7b57d355d（fix: 回单核销删除单据后刷新详情页本次核销金额）

## 涉及分支与合入
- 园区公共收益 zhi2-web-admin（262 分支）修复（来源 dca7c647）
- 已合入 develop/v2.6.1-szRcbBankTrust 分支（本地 commit 未 push）
- 已 cherry-pick 到 261、262、suzhufang 三个分支（来源会话 5bdbdabe）
- 物业模块仅 suzhufang 分支有相关改动

## 涉及文件与归属
- 文件：VerificationReceiptDetailTable.vue、pubVerificationReceipts/detail.vue、table.js
- 所属项目：苏住房G（公共收益模块）
- 来源会话：dca7c647-3133-4108-a280-c82a7ee0abb4；11db51e0-6454-4757-a4be-35e87ddb74de；5bdbdabe-84ea-4974-b2f7-6db72c21377d
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verification_refresh_fix",
  "source_extraction_id": "02759d82d8a9496b98e4adfceff55de0",
  "version": 2,
  "memory_type": "entities"
}
-->