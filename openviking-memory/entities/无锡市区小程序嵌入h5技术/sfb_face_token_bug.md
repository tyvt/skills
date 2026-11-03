# 苏服办人脸核验默认换票改类型致令牌失效
苏服办SDK人脸核验要求传入用户token及tokenType='1'，原默认走getTicket换票据并改tokenType为'0'导致令牌失效。

## 现象
- 苏服办人脸核验调用失败，令牌失效
- face.vue与sfbFaceAuth.js默认改tokenType导致校验不通过

## 根因
- 原face.vue与sfbFaceAuth.js默认走getTicket换票据并改tokenType为'0'
- 苏服办SDK要求tokenType='1'，类型被改后令牌失效

## 解决方案
- face.vue去除forceFresh:true直接传token
- sfbFaceAuth.js默认不走getTicket且保留faceAppid缓存
- 须保证传入tokenType='1'而非'0'

## 验证与归属
- 验证来源：无锡市区小程序嵌入H5/006.md；来源会话2a5dc010-d890-4a11-a627-83db6d26d2b6
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/index/home.vue、newHome.vue、webview/home.vue、utils/sfbFaceAuth.js、pages/face/face.vue、utils/h5Context.js、src/main.ts、src/App.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_token_bug",
  "source_extraction_id": "3527dbc6cabc42928f2894d85a85de59",
  "version": 1,
  "memory_type": "entities"
}
-->