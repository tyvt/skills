# 苏服办包裹页appId与人脸API appId不可混用
无锡智慧物业苏服办链路中存在两个 appId，误用会导致支付宝等容器间歇性拉不起扫脸。

## Description
- 包裹页/轻应用跳转使用 wxzhwyypbjl（getTicket、打开 H5）
- lightAppJssdk.face.livenessFaceAuth 文档 5.1.12 要求 arg0 为 jisnzjk
- 曾误用 wxzhwyypbjl 作人脸 arg0，导致间歇失败

## 兼容与排查
- 成功以 retcode===000000 为准
- 支付宝经 my.postMessage 回传可能无标准 retcode，需兼容 result/msg 字段
- 排查日志关注 tokenFromUrl（入口新 token）与 tokenStale（需重新从苏服办进入）

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：3fc0470b-aa98-4e6c-91de-c95f0603e8d3
- 代码基线：7993464
- 涉及文件：sfbFaceAuth.js、h5Context.js、pages/face/face.vue

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_appid_division",
  "source_extraction_id": "d81982be12fb49649927c1f09cdc1a12",
  "version": 1,
  "memory_type": "entities"
}
-->