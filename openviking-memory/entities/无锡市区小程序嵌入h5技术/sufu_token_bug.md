# 苏服办livenessFaceAuth令牌失效缺陷
加forceFresh+getTicket后苏服办/支付宝均报「用户扫脸核验令牌已失效」，清理缓存后更严重。

## 问题根因
- SDK要求arg1为苏服办用户token、arg2为'1'（用户token类型）
- 默认换票会把tokenType改成'0'，与SDK预期不符

## 解决方案
- sfbFaceAuth.js默认不走getTicket，仅显式forceFresh:true时才尝试
- face.vue去掉强刷票据
- 勿在每次调起前清faceAppid缓存
- 仍失效时让用户完全退出苏服办从入口重进以拿新URL token，并对照[苏服办人脸识别]日志

## 验证与归属
- 验证证据：会话2a5dc010用户反馈支付宝与苏服办均令牌失效
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：2a5dc010-d890-4a11-a627-83db6d26d2b6；代码基线：afd47ed

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sufu_token_bug",
  "source_extraction_id": "adced483888e4affbfd1ba77e6e3ce85",
  "version": 1,
  "memory_type": "entities"
}
-->