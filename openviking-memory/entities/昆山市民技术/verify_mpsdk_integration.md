# 腾讯人脸核身 SDK 集成与冗余清理
昆山市民小程序已移除重复的云核身 SDK 副本，保留实际运行目录与调用封装，调用 init 方法初始化。

## 已删除冗余
- src/utils/cloud-faceid-micro-sdk-v1.0.37/（81 个文件）为 SDK 原始副本，集成时已复制到运行目录，项目无任何引用，属重复文件

## 保留并在用
- src/wxcomponents/verify_mpsdk/ — SDK 实际运行目录
- src/pages/verify/index.vue — 核身承载页
- src/utils/useTencentFaceVerify.js — 调用封装（调用 init 方法初始化）
- 相关接入文件：src/pages/verifyUser/index.vue、src/App.vue、src/main.js、src/pages.json、src/manifest.js

## 验证与归属
- 来源会话ID：d204db33-771f-44d5-97bb-400ec850e59f
- 代码基线：none
- 验证证据：extracted source=cursor project=昆山市民


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "verify_mpsdk_integration",
  "source_extraction_id": "cd2cbfa87b0543bc8dc543511d49c208",
  "version": 1,
  "memory_type": "entities"
}
-->