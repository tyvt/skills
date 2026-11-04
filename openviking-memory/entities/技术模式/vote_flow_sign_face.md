# 表决流程签字与人脸识别为必经步骤
太仓一网通办H5 的参与表决页面定义了四步流程，签字与人脸识别均已接入且为提交前的强制步骤。

## 流程步骤
- ParticipateIn.vue 定义4步：选择（StepChooseCommon）、确认（StepConfirm）、签字（StepSign）、人脸识别（FaceStep）
- 四步均实际使用，人脸识别依赖外部小程序

## 提交依赖
- 最终提交接口仅在人脸识别成功后才会调用
- 签字步骤为必经环节，与确认步骤共同构成完整表决

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/decision/ParticipateIn.vue、src/views/decision/components/StepSign.vue、src/views/decision/components/FaceStep.vue
- 所属项目：太仓一网通办H5；来源会话：cbc17960-f384-48d7-9b4e-db2e42efe692；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_flow_sign_face",
  "source_extraction_id": "924a0db299a54a6195a4b0d68cc0e945",
  "version": 1,
  "memory_type": "entities"
}
-->