# 批量埋点接口401需skip401避免误登出
惠山二期H5 全局 401 处理未区分埋点接口，导致批量埋点返回 401 时误清 session 并跳转「我的」。

## 问题根因
- 全局 401 处理未区分埋点接口，src/api/analytics.js 批量埋点返回 401 时触发清 session 并跳转

## 解决方案
- 在 src/api/index.js 增加 skip401 判断
- 为批量埋点请求添加 skip401: true，使其静默失败重入队列且不跳转

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证：src=惠山二期H5/005.md
- 涉及文件：src/api/index.js、src/api/analytics.js、src/utils/track/client.js、src/store/user.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：73b006e7-ce1b-4f15-8ff8-b6623e838eb0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "skip401_analytics_batch",
  "source_extraction_id": "8c4a40e76b8e480d92d361435c8d6a78",
  "version": 1,
  "memory_type": "entities"
}
-->