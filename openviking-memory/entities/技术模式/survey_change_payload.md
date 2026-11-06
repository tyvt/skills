# 测绘变更add接口入参经映射函数构造
在 `surveyChangeConstants.js` 新增 `buildSurveyChangeAddPayload` 将 form 字段映射为 API 入参，强校验含 `projectName`、`region` 等。

## 实现要点
- 在 `surveyChangeConstants.js` 新增 `buildSurveyChangeAddPayload` 将 form 字段映射为 API 入参
- 强校验字段：`projectName`、`region`、`projectLocation`、`enterpriseCreditCode`、`buildingNo` 等
- 有就传：`enterpriseId`、`enterpriseName`、`oldTotalUnits`、`oldTotalArea`、`newTotalUnits`、`newTotalArea`
- `detail.vue` 的 `getForm()` 新增时调用该函数
- 编辑仅传 `{ id, changeReason }`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/061.md
- 涉及文件：测绘变更-前端对接文档(1).md、surveyChange/detail.vue、surveyChangeConstants.js、presale-survey-change-helpers.js、permitCancel/detail.vue、entrustSale/detail.vue、permitExtend/detail.vue、presale-survey-change-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：cd5819ca-3f99-45cb-b786-bfcca981ec48；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_payload",
  "source_extraction_id": "b6235e8c83234c6da6eb786bbea65930",
  "version": 2,
  "memory_type": "entities"
}
-->