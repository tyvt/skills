# 决策记录姓名显示修复（DecisionResult.vue）
苏住房C(zhi2-mobile-shimin)业主端决策页DecisionResult.vue因字段映射缺失导致决策人姓名不显示，已通过CardList的label/value/remark映射修复。

## 问题根因
- `CardList`左侧显示`label`、右侧显示`value`，原实现将`createTime`映射到`value`却未设置`label`（决策人姓名），列表仅见时间。

## 修复内容
- 将`decisionPlayerName`映射到`label`（左侧显示姓名，如「田*」「李*丹」）
- 将`createTime`映射到`value`（右侧显示时间，保持原布局）
- 将决策选项（弃权/同意）映射到`remark`（显示在下方）
- 参考选举页补充记录详情接口作为姓名兜底，扩展`resolvePlayerName`字段匹配
- 修复后每条记录显示：「田* 2026-08-27 18:33:41 > 弃权」

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_vote/decision/common/DecisionResult.vue`、`resolvePlayerName`相关
- 来源会话ID：6fda2373-f0d5-4e0d-87d7-0f8c4b8cbc61；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "decision_result_name_fix",
  "source_extraction_id": "1d5777e127fe4ad7ad19ecf01a6caf1e",
  "version": 1,
  "memory_type": "entities"
}
-->