# 表决意见单 PDF 两步获取流程
园区1.0表决页面中，表决意见单（PDF/签章文件）由后端在提交时生成，查询时通过文件 ID 取回，提交接口不直接返回文件流。

## 生成与提交
- 提交触发：`POST /estate/decisionRecord`，参数含 idNumber、voteWay、optionList、signature、faceRecognition、decisionId、decisionRangeId
- 选举同样走 `POST /estate/decisionRecord`
- 前端仅判断 `code == 200`，不处理 PDF 内容；生成逻辑在服务端完成

## 文件 ID 返回与获取
- 点击「决策记录」后，列表接口 `POST /h5decision/decisionRecord` 带回 `mtplOwnerVoteObligeeList[].alfrescoFileUuid`
- 需按 `alfrescoFileUuid` 文件 ID 再取文件，非提交即返回文件流

## 验证与归属
- 验证证据：extracted source=cursor project=园区1.0表决页面
- 涉及文件：src/views/decision/ParticipateIn.vue、src/utils/index.ts、ResultStatistics.vue、DecisionResult.vue、ResultDetail.vue
- 来源会话：c01ceb33-3a8e-412b-b7c4-7ee892caff45
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "园区1.0表决页面技术",
  "name": "decision_pdf_flow",
  "source_extraction_id": "e7203c14d7e247789c5f671924f6fef1",
  "version": 1,
  "memory_type": "entities"
}
-->