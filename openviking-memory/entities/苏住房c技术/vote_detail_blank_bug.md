# 决策详情空白三层根因
苏住房C 中 pages_vote/decision/optional/detail 页只显示标题、内容全空，因分包组件渲染不稳、数据解构不全、缓存串单三层叠加。

## 问题根因
- 模板用主包 CardList/CardCell，在 pages_vote 分包里渲染/样式隔离不稳定（同项目 013.md 已记录 CardCell 渲染异常）。
- selectOptdec 只解构 rows，接口可能把数组放在 data，拿不到选项。
- 跳转时把摘要写进 voteStore 但没做记录级匹配，缓存有其他记录就直接用了，偶发串单。

## 解决方案
- 详情页改与同目录 DecisionRecord.vue 一致的 view/text 平铺结构，样式写当前页并开 styleIsolation:shared，不再依赖 CardCell。
- 列表解析同时兼容 rows / data，并补 summary 字段兜底。
- 缓存读取必须先按当前 recordId 精确匹配再取，未命中才回落缓存。
- 上游 DecisionResult.vue 跳转前把 decisionPlayerName、summary 一并写进 voteStore。

## 验证与归属
- 验证：会话 e45253dc（基线 8fc3cc5）用户贴图详情不显示内容，按三层根因修复。
- 涉及文件：src/pages_vote/decision/optional/detail.vue、common/DecisionRecord.vue、optional/DecisionResult.vue、src/store/vote.js、src/api/autonomy.js。
- 所属项目：苏住房C；来源会话ID：e45253dc-68ce-40ba-b3ff-5949e2df65d4；代码基线：8fc3cc5。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "vote_detail_blank_bug",
  "source_extraction_id": "f87d2cf27ae64c63b44413b81e23b987",
  "version": 1,
  "memory_type": "entities"
}
-->