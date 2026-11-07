# 投票选举页 recordId 解析来源
苏住房C 投票选举页 DecisionResult 取 recordId 不能只从 decisionOptionResponseList[0] 取，选举场景该数组为空导致候选人整块不渲染。

## 问题根因
- 原逻辑只从 decisionOptionResponseList[0] 读 decisionResponseId 当 recordId，选举场景接口常把记录放 decisionOptionResponseAllList，前者为 null 或元素无响应 ID，致 recordId 空、候选人列表接口未发。
- 与「decisionPlayerName 缺失」不同根因：本次是主键来源，症状同为页面空白。

## 解决方案
- recordId 解析改双源合并：先遍历 decisionOptionResponseAllList 取 decisionResponseId（按 decisionResponseId 分组去重汇总），为空再降级 decisionOptionResponseList。
- 两源都无 recordId 时用 decisionOptionResponseList 选项名直接兜底展示，不留纯空。
- 改动落到共享工具/构造器（decision/*/DecisionResult 共用），不只补 elect 一处。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 aa7c3d25（2026-08-27，基线 f1939b0）用户报「最近一次选举没展示，选举人姓名没展示」，根因第1条。
- 涉及文件：zhi2-mobile-shimin/src/pages_vote/elect/DecisionResult.vue、decision/common/DecisionResult.vue、src/api/autonomy.js。
- 所属项目：苏住房C；来源会话ID：aa7c3d25-bd1a-4ca4-bb8f-8c55d6730cc6；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elect_recordid_parse",
  "source_extraction_id": "43f131e44907422ab73f0bd6432bc67f",
  "version": 1,
  "memory_type": "entities"
}
-->