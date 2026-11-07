# 测绘变更选楼幢跳过在途楼幢
苏州市房地产监测V3 的 E2E 辅助文件 `presale-survey-change-helpers.js` 实现选楼幢弹窗中跳过在途楼幢的逻辑。
## 行为说明
- 打开选楼幢弹窗后用详情 `projectId` / `projectName` 调 `/presale/surveyChange/page`（最多500条）
- 收集 `bizState` 为 `0`（待提交）或 `1`（审核中）的 `buildingId`，与弹窗接口楼幢列表求交集，避免误伤其他项目
- 排除接口行上 `selectable` / `hasActiveSurveyChange` 等不可用标记
- 按楼幢号勾选第一个可用行；无可用行则关弹窗返回 `false`（用例 `test.skip('无可选楼幢')`）
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 本地复跑：`cd zhi2-web-admin && npx playwright test e2e/presale/presale-survey-change-real-api-flow.spec.js`
- 涉及文件：`e2e/fixtures/presale-survey-change-helpers.js`、`e2e/presale/presale-survey-change-real-api-flow.spec.js`、`src/styles/index.scss`
- 所属项目：苏州市房地产监测V3；来源会话ID：917bcc72-bb40-4ee4-a078-26ffa623d83b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_skip_building",
  "source_extraction_id": "ecb2c916fe7a444b9f3afc876a11bd7c",
  "version": 1,
  "memory_type": "entities"
}
-->