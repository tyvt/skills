# i淮安公版 ResultStatistics 跳转携带 rangeId
i淮安公版投票/决策相关页面跳转 ResultStatistics 时携带 `rangeId`（接口字段 `decisionRangeId`）的改动记录。

## 改动说明
- `decision/index.vue`：列表映射加 `rangeId: el.decisionRangeId`；跳转 common/optional/sort/multipleForm 追加 `&rangeId=...`。
- `elect/index.vue`：列表映射加 `rangeId`；统计结果跳转 `ResultStatistics?id=...&rangeId=...`。
- `ViewOptionsList.vue`：多议题「查看投票结果」优先 `item.decisionRangeId`，否则调 `listDecisionRangeId` 后跳转 `multiple/ResultStatistics`。
- `common/ResultStatistics.vue`、`multiple/ResultStatistics.vue`：补充 `rangeId` 读取与入参（`selectMaintainResult` 入参补 `decisionRangeId`）。

## 涉及文件
- decision/index.vue、elect/index.vue、ViewOptionsList.vue、common/ResultStatistics.vue。
- 所属项目：i淮安公版；来源会话：b0e15d5b-76cd-410c-ac70-649129353a28。

<!-- MEMORY_FIELDS
{
  "category": "i淮安公版技术",
  "name": "result_rangeid_jump",
  "source_extraction_id": "278ce1504f244ed5ae52916d18ff2312",
  "version": 1,
  "memory_type": "entities"
}
-->