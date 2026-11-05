# 选项表决我的决策页空白修复
苏住房C小程序选项表决「我的决策」页因未同步数据补全逻辑显示空白，已参照选举页补齐。

## 问题根因
- 选项表决（OPTION）走 optional/DecisionResult.vue，原实现较简单
- 直接用 detail.decisionResponseId 取记录 ID，字段缺失时决策详情链接无效
- 列表只用 el.decisionPlayerName，接口未返回时仅剩时间戳
- 未像选举页调用 getAppRecordDetail / getDecisionRecordDetail 补全详情
- optional/detail.vue 因 CardList/CardCell 在微信小程序分包中渲染异常，仅显示标题不显示内容
- selectOptdec 只解构 rows，接口返回 data 数组时拿不到选项列表
- voteStore 缓存匹配问题：从决策详情跳转时可能读取到其他记录缓存

## 修复内容
- optional/DecisionResult.vue 增加 pickResponseId、fetchRecordDetail、enrichRecordList，正确解析 recordId 补全决策人、选项摘要，onShow 刷新数据，跳转详情写入缓存，跳转前补充写入 decisionPlayerName、summary 保证详情页显示决策人
- optional/DecisionRecord.vue 从缓存+详情接口补全决策人、签字、时间，selectOptdec 无数据时回退 optionList
- optional/detail.vue 改为与 common/DecisionRecord.vue 相同的 view/text 模板结构确保小程序稳定渲染，兼容 rows/data 两种接口返回格式，优化缓存读取逻辑优先匹配当前 recordId，增加 summary 字段作为决策内容兜底
- goLatestDetail 跳转前将摘要、签字、时间等写入 voteStore 和本地缓存
- detail.vue 补齐与 DecisionRecord.vue 一致的数据加载逻辑，支持三级回退：1. selectOptdec 接口返回的选项列表 2. getAppRecordDetail / getDecisionRecordDetail 的 optionList 3. 缓存中的 value 摘要（按、拆分展示）
- detail.vue 新增「决策信息」卡片展示决策人、签字、决策时间

## 涉及文件与归属
- 涉及文件：optional/DecisionResult.vue、optional/DecisionRecord.vue、optional/detail.vue、common/DecisionRecord.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：2d84eea4-83d0-4cd8-82b5-903f4772c353、e45253dc-68ce-40ba-b3ff-5949e2df65d4、30045e67-bafd-468a-a56a-1f3d2ed7b2fe；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "option_vote_blank_fix",
  "source_extraction_id": "0842d2bc9d344262a3fdeea27c8b4603",
  "version": 3,
  "memory_type": "entities"
}
-->