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

## 当前参数对照（文档5.1.12）
- arg0=应用appId=jisnzjk（SFB_FACE_APP_ID），与官方文档5.1.12一致
- arg1=用户token=getSfbToken()从入口URL或缓存读取
- arg2=令牌类型='1'（个人用户令牌）
- success回调已绑定，解析retcode/msg；fail回调已绑定，记录日志并reject
- isSfbFaceSuccess以retcode==='000000'为成功主判，另兼容其它返回值
- 当前实现已对照官方文档5.1.12确认参数无误；支付宝容器内仍无法拉起扫脸非参数错误所致

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：3fc0470b-aa98-4e6c-91de-c95f0603e8d3
- 代码基线：7993464
- 涉及文件：sfbFaceAuth.js、h5Context.js、pages/face/face.vue

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_appid_division",
  "source_extraction_id": "801fd2bc9b8d4766aafa742c6fc75b71",
  "version": 2,
  "memory_type": "entities"
}
-->