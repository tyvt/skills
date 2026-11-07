# 通过常量函数构建测绘变更的新增 payload
`surveyChangeConstants.js` 添加 `buildSurveyChangeAddPayload` 用于映射表单字段到 v1.9 接口参数。

## 行为
- 强校验字段（`projectName`、`region` 等）为必填；可选字段若存在则发送
- `detail.vue` 的 `getForm()` 在新增场景下调用该函数；编辑时仅保留 `{ id, changeReason }`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3/261.md
- 涉及文件: surveyChangeConstants.js, presale/surveyChange/detail.vue, 接口文档, e2e/fixtures/presale-survey-change-helpers.js, permitCancel/detail.vue, entrustSale/detail.vue, permitExtend/detail.vue, e2e/presale/presale-survey-change-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; 会话: cd5819ca-3f99-45cb-b786-bfcca981ec48

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：cd5819ca-3f99-45cb-b786-bfcca981ec48


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_add",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->
