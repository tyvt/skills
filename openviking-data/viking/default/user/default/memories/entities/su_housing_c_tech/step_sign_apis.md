# 业主决策签字提交接口链路
苏住房C 小程序业主决策/选举表单「选择→确认→签字」提交时，依次调用上传签名、查询决策范围、提交决策三类接口。

## 提交流程
- 点击「提交」先执行签名上传：`POST /file/file/upload`，封装 `fileUpload()`（`src/api/file.js`），返回 `fileSite` 存入 `voteStore.signUrl`
- 签名上传成功后进入 `submit()`，先调用 `GET /autonomy/AppDecision/listDecisionRangeId`，参数 `{ decisionId }`，封装 `listDecisionRangeId()`（`src/api/autonomy.js`）
- 拿到 `decisionRangeIds` 后调用主接口 `POST /autonomy/decisionResponse`，封装 `decisionResponse()`（`src/api/autonomy.js`）

## 涉及组件
- 流程位于 `StepSign.vue`，对应业主决策/选举表单页而非民意调查列表页

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`StepSign.vue`、`src/api/file.js`、`src/api/autonomy.js`
- 来源会话ID：b84da848-f75a-4ee3-8fc5-7e4346f247b5

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "step_sign_apis",
  "source_extraction_id": "e393299e4a9740aba5960facd459a397",
  "version": 1,
  "memory_type": "entities"
}
-->