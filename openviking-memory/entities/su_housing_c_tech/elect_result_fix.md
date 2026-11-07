# 选举结果页展示问题修复
苏住房C小程序中 pages_vote/elect/DecisionResult.vue 修复了选举记录加载与姓名缺失问题。

## 问题根因
- 最近一次选举为空时仅从 decisionOptionResponseList[0] 取 decisionResponseId，导致 recordId 为空、候选人列表无法加载
- 选举记录缺少选举人姓名，仅用 getDecisionRecordDetail 可能不返回 decisionPlayerName
- 未从 decisionOptionResponseAllList 汇总 decisionResponseId

## 修复内容
- 从 decisionOptionResponseList 和 decisionOptionResponseAllList 解析 recordId
- 用 getAppRecordDetail 获取记录详情（含选举人姓名），与 DecisionRecord 一致
- 按 decisionResponseId 合并重复记录

## 涉及文件与归属
- 涉及文件：pages_vote/elect/DecisionResult.vue、ResultDetail.vue、ResultRecord.vue 等
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：aa7c3d25-bd1a-4ca4-bb8f-8c55d6730cc6

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elect_result_fix",
  "source_extraction_id": "630b378ab64046fd979a5f252bb10a6b",
  "version": 1,
  "memory_type": "entities"
}
-->
