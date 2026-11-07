# 苏服办人脸识别支付宝成功回调修复
无锡市区小程序嵌入H5中支付宝扫脸已成功却被旧逻辑判定为失败的前端修复约定。

## 现象
- 支付宝扫脸 SDK success 回调正常触发，但页面显示「人脸识别失败」，失败原因却是「成功」。
- 日志确认：[苏服办人脸识别] success: {"result":"true","appId":"jisnzjk","msg":"成功"}。

## 根因
- 旧版成功判断仅认 msg==="认证成功" 与 retcode==="000000"，未兼容支付宝返回的 result==="true" 与 msg==="成功"。
- 字段不一致导致旧代码走到 reject(new Error("成功"))。

## 解决方案
- 成功判断兼容 result === "true" 与 msg === "成功"。
- 支付宝容器不调 getTicket，必须使用原始苏服办 token（tokenType=1），不可用票据 token。
- 回跳结果暂存于 SDK success 回调，避免成功态丢失。

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：d303f251-dbaf-4d2c-8f51-16248a0b7e3d
- 验证会话：d303f251-dbaf-4d2c-8f51-16248a0b7e3d（基线 none）。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/api/security.js、src/pages/verifyUser/index.vue、src/store/user.js。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sufuban_face_alipay_success",
  "source_extraction_id": "ce14f25e28424c1cbcaa4b9b10c2ae95",
  "version": 1,
  "memory_type": "entities"
}
-->