# 苏服办人脸SDK成功响应JSON字符串缺陷
控制台打印苏服办返回成功JSON，业务仍判失败。

## 问题根因
- livenessFaceAuth的success有时给字符串（如retcode为000000的JSON字符串）
- 直接读data.retcode为undefined

## 解决方案
- sfbFaceAuth.js增加normalizeSfbFaceResponse（字符串先JSON.parse）
- isSfbFaceSuccess兼容retcode==='000000'或msg==='认证成功'
- 不动产授权回跳在goBdc()拼接verifyResult=true
- 生产人脸入口基址为https://wygl.wxwgzx.com:8989/szh5，对方跳转不带token时用己方已解析的苏服办登录态

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话9641a1de截图显示SDK成功JSON被误判
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue、src/pages/face/bdc.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：9641a1de-5bbe-4afe-a7ab-487324afb826；代码基线：3fb9434

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sufu_json_bug",
  "source_extraction_id": "adced483888e4affbfd1ba77e6e3ce85",
  "version": 1,
  "memory_type": "entities"
}
-->