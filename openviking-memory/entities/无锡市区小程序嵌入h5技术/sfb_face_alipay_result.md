# 苏服办人脸支付宝 success 误判失败修复
无锡市区小程序嵌入H5中支付宝容器内扫脸 SDK 回调 success 却被判失败的修复约定。

## 现象
- 支付宝容器内扫脸 SDK 已回调 success（日志含 result:"true", msg:"成功"），业务页仍显示人脸识别失败，失败文案甚至是「成功」。
- 从支付宝返回后还可能无法再次唤起。

## 根因
- 成功判断只认 retcode==="000000" 或 msg==="认证成功"，未兼容支付宝返回的 result 字符串 "true" 与 msg "成功"，会 reject(new Error(msg))。

## 配套约束
- 支付宝场景不要用 getTicket 换票，须用原始苏服办 token（tokenType=1）。
- SDK success 时先把结果写入 sessionStorage，在 onShow/visibilitychange 读取暂存完成后续跳转，避免跨应用返回导致 Promise 链断裂。
- 调试时在 success 日志打印 accepted:true/false。

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：d303f251-dbaf-4d2c-8f51-16248a0b7e3d
- 验证会话：d303f251-dbaf-4d2c-8f51-16248a0b7e3d（基线 afd47ed），用户提供 success 日志 {"result":"true","appId":"jisnzjk","msg":"成功"}，结论对照表说明旧版未判断 result/msg 导致 reject(Error("成功"))，并补充 sessionStorage 与支付宝 token 策略。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue、src/pages/verifyUser/index.vue、src/store/user.js。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_alipay_result",
  "source_extraction_id": "a7ccb2bad8e148e3977562a553bc29a0",
  "version": 1,
  "memory_type": "entities"
}
-->