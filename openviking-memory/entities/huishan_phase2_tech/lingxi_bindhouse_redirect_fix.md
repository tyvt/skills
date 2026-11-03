
# 灵锡绑房回跳须用真实地址留登录态
惠山二期H5/惠山小程序中绑房回跳因固定 `VITE_BACK_URL` 与真实地址不一致致登录态丢失，修复为使用实际 webview 地址。

## 问题根因
- 固定 `VITE_BACK_URL` 与微信小程序 webview 实际 H5 地址不一致，`authCode` 仅从 `options.query` 取值漏解析 URL search/hash
- 回跳时 `userStore.clear()` 清空 token 致绑房接口失败

## 解决方案
- `backUrl` 改为当前 webview 实际地址，从完整 URL 解析 `authCode` 并在 `onLaunch` 与 `onShow` 处理
- 绑房回跳保留登录态不 `clear()`，成功后 `navigateBack()` 关闭 `externalWebview`

## 涉及文件
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/components/AddHouseDialog/AddHouseDialog.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/utils/index.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/vite.config.ts
- d:/repository/惠山小程序/src/utils/index.js
- d:/repository/惠山小程序/src/App.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/utils/lingxi.js
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/App.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/api/security.js

## 验证与归属
- 验证证据：src=惠山二期H5/002.md
- 来源会话ID：b9f46e5c-31b8-4bcb-a8ee-185ec72988e3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_bindhouse_redirect_fix",
  "source_extraction_id": "0b26267c8a824d6cbbc1779587ddb493",
  "version": 1,
  "memory_type": "entities"
}
-->