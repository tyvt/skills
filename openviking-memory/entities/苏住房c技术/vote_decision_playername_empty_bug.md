# 投票选举结果记录姓名与决策人空bug
选举记录列表与详情决策人姓名空白，根因是分组只留首行且enrich展开覆盖已取字段。

## 现象
- 接口 decisionOptionResponseAllList 返回 decisionPlayerName:"李*丹"，但选举记录列表左侧姓名空白，详情「决策人」也空。

## 根因
- pages_vote/elect/DecisionResult.vue 的 groupRecordRows 按 decisionResponseId 分组只保留同组第一条，未合并其它行 decisionPlayerName。
- enrichRecordList 对列表项做 ...record 展开，把已从接口取好的姓名冲掉。

## 修复方案
- 分组/合并遍历同组所有记录，逐个字段取第一个非空值（至少合并 decisionPlayerName）。
- 新增 buildRecordList，与决策模块 decision/common/DecisionResult.vue 同一取数口径：先从 decisionOptionResponseAllList 取姓名与选项再渲染。
- enrichRecordList 只异步补充选项摘要，禁止整体展开 record 覆盖已有字段。
- 详情页 ResultRecord.vue 自己按 ID 拉取决策人姓名，不依赖列表传参；选举与决策同构双份改一处同步另一处。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；代码基线：f1939b0；来源会话ID：35a00989-4b03-4dae-8d47-d5841ef5d71f。
- 涉及文件：zhi2-mobile-shimin/src/pages_vote/elect/DecisionResult.vue、pages_vote/decision/common/DecisionResult.vue、pages_vote/elect/ResultRecord.vue、components/CardList/CardList.vue、api/autonomy.js。
- 验证：会话贴出 detail 接口完整响应含 decisionPlayerName，结论归因分组丢字段与覆盖。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "vote_decision_playername_empty_bug",
  "source_extraction_id": "70fc14d1e2ea42d0bf2f14201419d722",
  "version": 1,
  "memory_type": "entities"
}
-->