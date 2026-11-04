# 昆山市民人脸识别机制与使用场景
昆山市民小程序存在两套人脸识别实现，当前实际生效仅实名认证场景。

## 正在使用：微信小程序实名认证
- 技术方案：`uni.startFacialRecognitionVerify` + 后端 `/estate/weChatOauth/faceRecognition`
- 入口页面：`pages/verifyUser/`，首次实名需填姓名、身份证号并同意
- 流程：调用微信人脸核验 → 提交 verifyResult、code、姓名、身份证号至后端 → `faceRecognition == 1` 成功并更新用户信息
- 触发入口：首页未实名提示跳转（home.vue/home.js）、个人中心「实名认证」（personal.vue）

## 已停用：投票/选举提交前核验
- 技术方案：`useFaceVerify`（通过 App 原生桥接调用苏政通拍照）
- 当前状态：代码已注释，未实际调用

## 验证与归属
- 所属项目：昆山市民；来源会话ID：cbf090fd-dbf7-4699-9af7-6c33b203af19；代码基线：none
- 涉及文件：verifyUser/index.vue、home.vue、home.js、personal.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "face_recognition_mechanisms",
  "source_extraction_id": "6cbdc70be8eb43dc9c57c1104ea75c4c",
  "version": 1,
  "memory_type": "entities"
}
-->