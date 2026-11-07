
# C端埋点经src/utils/track队列批量上报
惠山二期H5 的 C 端埋点通过 `src/utils/track` 队列防抖批量上报，避免频繁请求。

## 实现方式
- `src/api/analytics.js` 配置 `POST /appAnalytics/track/events/batch` 且 `noReject: true`
- `src/utils/track/` 实现防抖 2s、满 10 条 flush、最多 50 条、失败 requeue
- `src/App.vue` 的 `onLaunch` 与 `onHide` 触发 `initTrackSession` 和 `flushTrack`
- 业务埋点分布于 `pages/login/index.vue` 与 `utils/lingxi.js`

## 涉及文件
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/api/index.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages.json
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages/login/index.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/detail.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/form.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/App.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/api/security.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/house/automaticAdd.vue

## 验证与归属
- 所属项目：惠山二期H5
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证证据：src=惠山二期H5/001.md
- 来源会话ID：d17cb678-ebbf-4f71-be88-1e5cc9646c10；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "track_queue_batch",
  "source_extraction_id": "0b26267c8a824d6cbbc1779587ddb493",
  "version": 1,
  "memory_type": "entities"
}
-->