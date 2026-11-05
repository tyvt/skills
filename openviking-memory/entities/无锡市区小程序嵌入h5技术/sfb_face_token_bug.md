# 苏服办人脸核验默认换票改类型致令牌失效
苏服办SDK人脸核验要求传入用户token及tokenType='1'，原默认走getTicket换票据并改tokenType为'0'导致令牌失效，曾引发苏服办与支付宝扫脸均报「用户扫脸核验令牌已失效」。

## 现象
- 苏服办人脸核验调用失败，提示令牌失效
- 清理 faceAppid 缓存后问题更严重
- 支付宝容器扫脸亦受默认换票逻辑影响

## 根因
- 原 face.vue 与 sfbFaceAuth.js 默认走 getTicket 换票据并把 tokenType 改为 '0'
- 苏服办SDK要求 arg1 为苏服办用户token、arg2 为 '1'（用户token类型），类型被改后校验不通过

## 解决方案
- face.vue 去除 forceFresh:true 直接传用户token
- sfbFaceAuth.js 默认不走 getTicket，仅显式传 forceFresh:true 时才尝试
- 保留 faceAppid 缓存，勿在每次调起前清除
- 须保证传入 tokenType='1' 而非 '0'

## 排查指引
- 仍失效时让用户完全退出苏服办从入口重进以拿新URL token
- 对照控制台 `[苏服办人脸识别]` 日志定位

## 验证与归属
- 验证来源：无锡市区小程序嵌入H5/006.md；会话 2a5dc010-d890-4a11-a627-83db6d26d2b6 用户反馈苏服办与支付宝均令牌失效
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue、src/pages/index/home.vue、newHome.vue、webview/home.vue、utils/h5Context.js、src/main.ts、src/App.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_token_bug",
  "source_extraction_id": "d627421ec49c4bd58fa21558c5e6d07e",
  "version": 2,
  "memory_type": "entities"
}
-->