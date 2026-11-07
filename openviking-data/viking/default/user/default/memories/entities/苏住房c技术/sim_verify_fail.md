# 模拟器实名认证不发wechat/verify
苏住房C 居民实名认证在开发者工具/模拟器中完全不发出 /security/ctAuth/wechat/verify 请求，根因为人脸核身 fail 回调而非前端代码问题。

## 现象与根因
- 提交实名认证后只看到 getRepeatByIdTypeAndIdNumber 返回 {hasRepeat:"0", phone:null}，随后弹「认证失败」，且完全没有 wechat/verify 请求
- 认证链路：提交认证 → getRepeatByIdTypeAndIdNumber 校验重复 → uni.startFacialRecognitionVerify 微信人脸核身 → 仅 success 分支才 wx.login 再调 wechat/verify
- 开发者工具/模拟器不支持或无法完成人脸核身，直接走 fail 回调，所以 wechat/verify 永远发不出来
- H5 端直接提示「请在微信小程序中进行实名认证」，同样不调该接口

## 排查与做法
- 实名认证必须在真机微信小程序里验证（开发者工具 → 预览 → 手机扫码），再看 Network 是否出现 wechat/verify
- 排查「接口没发但也没前端报错」类问题，先确认前置异步能力（人脸核身、授权、扫码等）在模拟器是否可用，再怀疑代码
- 遇到微信专有能力报 unexplained fail，优先换真机复测

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话 13ed1683：用户诉求「没有 wechat/verify 请求，是不是模拟器原因？」；结论确认 startFacialRecognitionVerify 在模拟器走 fail 回调，附模拟器/真机/H5 三环境对照表
- 涉及文件：src/api/security.js、pages_my/verification/FormLocal.vue、FormNonLocal.vue、FormManual.vue、utils/constant.js
- 所属项目：苏住房C；代码基线：5f0f4dc；来源会话ID：13ed1683-e44e-4216-95c3-4499d21022e8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sim_verify_fail",
  "source_extraction_id": "2e192de19d9f4bb18647ef27da14cff8",
  "version": 1,
  "memory_type": "entities"
}
-->