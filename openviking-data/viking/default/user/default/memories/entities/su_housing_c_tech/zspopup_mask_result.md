# ZsPopup缺遮罩开关且结果页未铺满
苏住房C 中 `ZsPopup` 缺少遮罩控制属性，且各类 `DecisionResult` 页面未铺满灰色背景，导致留白与交互问题。

## 问题根因
- `ZsPopup` 缺少遮罩控制属性
- 各类 `DecisionResult` 页面未铺满灰色背景

## 修复要点
- 为 `ZsPopup` 新增 `showMask` 属性（弃权弹窗设 false）
- 选中背景改为 `rgba(19, 84, 190, 0.08)`
- 为 `common/optional/sort` 的 `DecisionResult` 加 `min-height: 100vh` 及统一 `page` 灰底

## 涉及文件
- src/pages_vote/decision/form.vue
- src/pages_vote/decision/common/DecisionRecord.vue
- src/pages_vote/decision/components/RadioGroup.vue
- src/pages.json
- src/pages_vote/decision/common/DecisionResult.vue
- src/pages_owner/decision/optional/StepChoose.vue
- src/pages_vote/decision/optional/StepChoose.vue
- src/pages_vote/decision/common/StepChoose.vue

## 验证与归属
- 验证证据：extracted source=cursor session=4b874d91-6178-415b-b2f9-76dd5a75acdc
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：4b874d91-6178-415b-b2f9-76dd5a75acdc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_mask_result",
  "source_extraction_id": "41104766f2154919ae35cea9ede14f5c",
  "version": 1,
  "memory_type": "entities"
}
-->