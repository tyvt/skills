
# 灵锡登录竞态因requestCode未主动触发
惠山二期H5/惠山V1小程序中 `lingxi.js` 的 `waitForLingxiLogin` 在 URL 含 `requestCode` 时主动调用 `ensureLingxiLogin`，消除竞态。

## 实现方式
- `lingxi.js` 的 `waitForLingxiLogin` 在 URL 含 `requestCode` 时主动调用 `ensureLingxiLogin`，消除竞态避免首页误判未登录
- H5 下 `newHome.vue` 与 `complexCard.vue` 取消「请先登录」弹窗，改为监听 `lingxi-login-complete` 或 `onShow` 等待登录后拉取数据

## 涉及文件
- d:/repository/惠山二期H5/惠山V1小程序/src/App.vue
- d:/repository/惠山二期H5/惠山V1小程序/src/api/modules/auth.js
- d:/repository/惠山二期H5/惠山V1小程序/src/api/modules/myhouse.js
- d:/repository/惠山二期H5/惠山V1小程序/src/api/modules/external.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/App.vue
- d:/repository/惠山二期H5/惠山V1小程序/src/utils/index.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/api/security.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/store/user.js

## 验证与归属
- 验证证据：src=惠山二期H5/001.md
- 来源会话ID：605fa942-84e9-4a40-b2f2-1535b9c67767；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_login_race_fix",
  "source_extraction_id": "0b26267c8a824d6cbbc1779587ddb493",
  "version": 1,
  "memory_type": "entities"
}
-->