# 苏服办人脸识别arg0网关ID错误导致支付宝扫脸拉不起
苏住房C居民端(zhi2-mobile-shimin)在支付宝苏服办中点人脸认证，SDK调不起扫脸，根因为livenessFaceAuth的arg0误填业务网关szffluzm，须为jisnzjk。

## 问题根因
- 苏服办人脸JSSDK livenessFaceAuth的arg0是人脸识别网关ID，必须传jisnzjk
- 当前项目错填业务API网关ID szffluzm，两者均为苏服办侧appId但用途不同，传错不报错只是拉不起
- 参考项目zhi2-mobile-admin-h5-c-unlimited中arg0=jisnzjk正常，证明非环境问题

## 移植对齐清单
- 人脸appId默认'jisnzjk'，允许VITE_APP_SFB_FACE_APP_ID覆盖
- 支付宝端必须恢复my.onMessage桥接转发扫脸结果，漏了即使拉起也拿不到结果
- 超时后不要清pending，保留状态供回跳恢复
- 回跳token同时解析URL search与hash
- index.html支付宝UA检测包含AliApp匹配
- 排错过滤控制台"[苏服办人脸识别]"，看appId/hasPostMessage/调起失败日志

## 判别口诀
- 前端「能调起但没结果」查桥接，「完全调不起」先看arg0是否拿错网关ID

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C(zhi2-mobile-shimin)
- 来源会话：8cccd282-23de-4677-8488-fd1b2de11ef6
- 代码基线：d43894b
- 涉及文件：src/utils/sfb.js、src/hooks/useFaceVerify.js、src/pages/common/face.vue、zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、zhi2-mobile-admin-h5-c-unlimited/src/pages/face/face.vue、zhi2-mobile-admin-h5-c-unlimited/src/pages/face/verify.vue、zhi2-mobile-admin-h5-c-unlimited/src/utils/h5Context.js、zhi2-mobile-admin-h5-c-unlimited/index.html及参考项目对应文件

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_arg0_bug",
  "source_extraction_id": "0303e6fbd99640a4aad5dc2a1e3e3234",
  "version": 2,
  "memory_type": "entities"
}
-->