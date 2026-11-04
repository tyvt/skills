# Analytics接口401不跳转登录态
惠山二期H5中批量埋点接口返回401时不登出、不跳转，由flushTrack静默失败重入队列。

## 行为说明
- src/api/index.js 全局401处理增加 skip401 判断：未设置 skip401 时才清session并switchTab到「我的」
- src/api/analytics.js 批量埋点请求（/appAnalytics/track/events/batch）增加 skip401:true（与 noReject:true 同用）
- 其它业务接口401仍清登录态并跳转
- 后续在 analytics.js 新增 /appAnalytics/** 接口需同样加 skip401:true

## 验证与归属
- 验证：会话 73b006e7-ce1b-4f15-8ff8-b6623e838eb0 完成修改
- 涉及文件：src/api/index.js、src/api/analytics.js、src/utils/track/client.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "analytics_401_skip_login",
  "source_extraction_id": "1807f7f40b37437882a8c1d8884b1b34",
  "version": 1,
  "memory_type": "entities"
}
-->