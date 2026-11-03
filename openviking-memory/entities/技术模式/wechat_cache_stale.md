# 旧编译缓存致已移除变量引用报错
微信开发者工具热更新缓存旧编译产物，执行已移除 isOffline 等引用的旧 index.js，需清缓存重导。

## 问题现象
- 微信开发者工具热更新缓存旧编译产物，执行已移除 isOffline 等引用的旧 index.js

## 解决方案
- 停止 dev 服务，清缓存重新导入项目编译
- 源码 src/pages_owner/payment/index.vue 已无相关引用

## 验证与归属
- 验证证据：src=i-H5/001.md
- 涉及文件：index.js、src/pages_owner/payment/index.vue
- 所属项目：i-H5；代码基线 none；来源会话 2acd9711-2f9b-410a-bf4b-dc8c613c647f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wechat_cache_stale",
  "source_extraction_id": "7bf82be17f474ef1b475cb00d486216c",
  "version": 1,
  "memory_type": "entities"
}
-->