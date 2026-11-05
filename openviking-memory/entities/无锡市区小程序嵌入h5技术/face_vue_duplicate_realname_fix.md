# face.vue去除重复实名后端调用修复
苏服办app中业主进投票H5、返回首页再进投票H5时，人脸成功后会误调后端导致重复实名toast，已修复。

## 改动
- face.vue删除syncFaceSuccessToBackend及对handleFaceSuccess的调用
- 删除afterFaceSuccessRealName、userStore的import
- completeFaceVerifySuccess恢复为：提示「人脸认证成功，请选择房屋」→1秒后跳转bdc
- 扫脸成功后不再请求/security/ctUserRealName/handleFaceSuccess，不再弹出「是否存在重复实名账号信息不能为空」

## 验证
- 须实机确认（Android苏服办）：完成扫脸后仅见成功提示、无重复实名toast、能正常进入bdc/不动产/投票流程

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/face/face.vue、src/utils/sfbFaceAuth.js、src/pages/face/bdc.vue
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：a6aaabb6-4559-4143-b37a-e11a1ba37fed

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "face_vue_duplicate_realname_fix",
  "source_extraction_id": "801fd2bc9b8d4766aafa742c6fc75b71",
  "version": 1,
  "memory_type": "entities"
}
-->