# 记录详情补姓名接口选择
苏住房C 选举记录列表补选举人姓名应优先 getAppRecordDetail，而非 getDecisionRecordDetail（可能不返回 decisionPlayerName）。

## 问题根因
- 选举记录列表左侧姓名空白，接口列表无该字段，需详情接口补。
- 同类页面有两详情接口：getDecisionRecordDetail 与 getAppRecordDetail（DecisionRecord 一直用后者），选举场景前者可能不返回 decisionPlayerName。
- 历史反复在 label/value/remark 映射和 record 展开覆盖上改过几轮，次要根因是异步详情对象整体展开覆盖列表已算好的姓名。

## 解决方案
- 补全统一走 getAppRecordDetail 优先、getDecisionRecordDetail 兜底；姓名多候选兜底（decisionPlayerName/username/realName）。
- 补全只填缺失字段，不让异步详情整体展开覆盖列表姓名。
- 新写同类页面直接照抄此链路，避免「列表只有时间」。

## 验证与归属
- 验证：会话 aa7c3d25（2026-08-27，基线 f1939b0）根因第2条，修改含按 decisionResponseId 合并重复记录、扩展姓名解析字段。
- 涉及文件：zhi2-mobile-shimin/src/pages_vote/elect/DecisionResult.vue、decision/common/DecisionRecord.vue、src/api/autonomy.js。
- 所属项目：苏住房C；来源会话ID：aa7c3d25-bd1a-4ca4-bb8f-8c55d6730cc6；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_name_api",
  "source_extraction_id": "43f131e44907422ab73f0bd6432bc67f",
  "version": 1,
  "memory_type": "entities"
}
-->