# 我的决策页面决策人姓名显示修复
苏住房C(zhi2-mobile-shimin)业主端「我的决策→决策记录」因字段映射缺失导致决策人姓名不显示，已修复。

## 问题根因
- `getMaintainResult`返回的`decisionOptionResponseAllList`里选项记录通常不带`decisionPlayerName`，决策人姓名在决策记录详情接口里。

## 修复方案
- `DecisionResult.vue`（列表）：按`decisionResponseId`调用`getDecisionRecordDetail`补全姓名；列表只显示「姓名+时间」；点击记录写入`voteStore`供详情页使用。
- `DecisionRecord.vue`（详情）：合并`voteStore`缓存与接口数据；支持`decisionPlayerName`/`policymaker`等字段回退；`getAppRecordDetail`失败回退到`getDecisionRecordDetail`。
- `autonomy.js`：记录详情接口增加`zs-desensitize-flag: 0`避免姓名脱敏。

## 验证与归属
- 重新编译后查看决策记录应能看到决策人姓名；若仍为空需提供接口JSON。
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`DecisionResult.vue`、`DecisionRecord.vue`、`autonomy.js`、`DecisionList.vue`、`decision/index.vue`、`needToKnow.vue`等
- 来源会话ID：6e6436fe-112d-4645-b690-9d9bb72bae0c；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_record_name_fix",
  "source_extraction_id": "1cce340fb61d44689d381b5141b1cc0e",
  "version": 1,
  "memory_type": "entities"
}
-->