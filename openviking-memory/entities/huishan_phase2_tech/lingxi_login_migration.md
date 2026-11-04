
# 灵锡自动登录与H5弹窗修复
惠山二期H5 修复了灵锡自动登录竞态，并让 H5 端在未登录时不再弹出「请先登录」弹窗。

## 登录竞态修复
- `lingxi.js` 的 `waitForLingxiLogin` 在 URL 含 `requestCode` 时主动触发 `ensureLingxiLogin`，不再因登录未启动就提前返回
- 测试版从灵锡打开走 URL 中 `requestCode` 自动登录，不再出现「请先登录」弹窗

## H5弹窗去除
- 首页 `newHome.vue`：H5 下未登录不再弹窗，改为等待灵锡自动登录，完成后监听 `lingxi-login-complete` 自动刷新数据
- 小区卡片 `complexCard.vue`：H5 下同样不弹登录窗，`onShow` 时先等待灵锡登录再拉取房屋信息
- 微信小程序逻辑不变，未登录仍会弹窗

## 涉及文件
- src/utils/lingxi.js
- src/pages/index/newHome.vue
- src/components/complexCard.vue
- 惠山V1小程序/src/App.vue
- 惠山V1小程序/src/api/modules/auth.js
- 惠山V1小程序/src/api/modules/myhouse.js
- 惠山V1小程序/src/api/modules/external.js

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话ID：605fa942-84e9-4a40-b2f2-1535b9c67767；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_login_migration",
  "source_extraction_id": "59ff5c92ec0d437c8dd9b0e558026b29",
  "version": 1,
  "memory_type": "entities"
}
-->