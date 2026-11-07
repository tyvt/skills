# 选项表决列表详情补全缺失
苏住房C 小程序选项表决（OPTION）分支未同步一般表决/选举的列表详情补全逻辑，导致「我的决策/决策记录」仅显示时间、决策人与选项名空白。

## 问题现象
- 「我的表决—选项表决—我的决策」页面「最近一次决策」「决策记录」只显示时间戳，决策人与选项名全空
- 点「决策详情」进入后空白，因 detail.decisionResponseId 取不到，跳转携带记录 ID 为空
- 列表接口只返轻字段（投票时间），未做详情补全的分支整体空白且不报错

## 根因
- 选项表决走 optional/DecisionResult.vue 直接消费列表行，未像一般表决/选举页那样接「记录详情」补全
- 投票类列表接口仅保证返回时间，决策人/签字/选项摘要/记录 ID 需二次详情接口取
- 凡是列表页直接渲染未补全分支，接口不返字段就整体空白

## 解决方案
- 在 optional/DecisionResult.vue 增 pickResponseId（按 decisionResponseId→recordId→行内候选字段解析）、fetchRecordDetail、enrichRecordList 三函数，逐条并发补全 merge 回行
- 用 onShow 而非 onLoad 触发刷新，保证从详情返回数据最新
- 跳详情前将补全后行数据写本地缓存，详情页优先读缓存再接口兜底；详情页 selectOptdec 空时回退 optionList
- common/DecisionResult.vue「最近一次决策」同样走详情补全
- 排查同类「只显时间/空白」先比对同模块已修兄弟页面有无 pickResponseId+详情补全逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 2d84eea4（基线 8fc3cc5）用户报「我的表决—选项表决-我的决策内容看不到，一般表决和选举改过」
- 涉及文件：pages_vote/decision/optional/DecisionResult.vue、DecisionRecord.vue、detail.vue、common/DecisionResult.vue、api/autonomy.js
- 所属项目：苏住房C；来源会话ID：2d84eea4-83d0-4cd8-82b5-903f4772c353；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optional_decision_enrich",
  "source_extraction_id": "ed684869517947daa729ceb5239a72e0",
  "version": 1,
  "memory_type": "entities"
}
-->