# 苏服办人脸识别回调JSON字符串修复
苏服办SDK的success回调返回JSON字符串而非对象，导致人脸识别被误判失败，已在sfbFaceAuth.js修复。

## 问题根因
- 苏服办SDK的success回调返回JSON字符串（如{"retcode":"000000","msg":"认证成功"}）而非对象
- 原代码直接读data.retcode得到undefined，被误判为失败

## 修复方案
- sfbFaceAuth.js新增normalizeSfbFaceResponse：若返回值为字符串先JSON.parse再判断
- isSfbFaceSuccess满足retcode==='000000'或msg==='认证成功'任一即视为成功
- 识别成功后正常走goBdc()并带verifyResult=true跳转不动产授权页

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 所属项目：无锡市区小程序嵌入H5；来源会话：9641a1de-5bbe-4afe-a7ab-487324afb826
- 涉及文件：src/utils/sfbFaceAuth.js、src/pages/face/bdc.vue、src/pages/face/face.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_auth_json_fix",
  "source_extraction_id": "9d334abc52e0456abf2471f8e4566102",
  "version": 1,
  "memory_type": "entities"
}
-->