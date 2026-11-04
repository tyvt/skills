
# C端批量埋点上报功能
惠山二期H5 已完成 C 端批量埋点接入，由 `src/utils/track/` 队列与 `src/api/analytics.js` 接口共同实现。

## 基础设施
- `src/api/analytics.js` 提供 `POST /appAnalytics/track/events/batch`，设 `noReject: true`
- `src/utils/track/` 实现队列、防抖（2s）、满 10 条立即 flush、单次最多 50 条，失败 requeue 一次，兼容 `noReject` 返回的 Promise 包装响应
- `src/App.vue` 的 `onLaunch` 调 `initTrackSession()`，`onHide` 调 `flushTrack()`

## 业务埋点
- 登录 PV / 登录提交：`pages/login/index.vue`
- 绑房 PV（H5 灵锡）：`utils/lingxi.js` → `goAddRaw`
- 绑房提交：`handleLingxiH...`

## 涉及文件
- src/api/analytics.js
- src/App.vue
- pages/login/index.vue
- utils/lingxi.js

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话ID：d17cb678-ebbf-4f71-be88-1e5cc9646c10；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "c_end_batch_track",
  "source_extraction_id": "59ff5c92ec0d437c8dd9b0e558026b29",
  "version": 1,
  "memory_type": "entities"
}
-->