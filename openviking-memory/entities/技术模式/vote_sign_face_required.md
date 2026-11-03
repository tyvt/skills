# 表决流程签字与人脸识别均接入且为必经步骤
太仓一网通办H5 的参与表决页定义四步流程，签字与人脸识别均为实际接入的必经步骤。

## 流程说明
- ParticipateIn.vue 定义选择、确认、签字、人脸识别 4 步流程
- StepSign 与 FaceStep 组件均实际使用
- 最终提交接口仅在 FaceStep 人脸识别成功后方调用

## 验证与归属
- 验证证据：extracted source=cursor session=cbc17960-f384-48d7-9b4e-db2e42efe692
- 涉及文件：src/views/decision/ParticipateIn.vue、src/views/decision/components/StepSign.vue、src/views/decision/components/FaceStep.vue、src/store/vote.js、src/views/decision/common/StepChoose.vue、src/views/decision/DecisionDetail.vue、src/router/index.ts、src/views/decision/common/faceSuccess.vue
- 所属项目：太仓一网通办H5；来源会话：cbc17960-f384-48d7-9b4e-db2e42efe692；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_sign_face_required",
  "source_extraction_id": "ce2fc0065fb543bc9d68e84262ae7ddf",
  "version": 1,
  "memory_type": "entities"
}
-->