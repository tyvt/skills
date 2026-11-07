
# 灵锡绑房回跳修复
惠山二期H5 修复了第三方灵锡绑定房屋回跳时的地址、authCode 解析与登录态丢失问题。

## 问题原因
- `backUrl` 用固定 `VITE_BACK_URL`，与微信小程序 webview 实际 H5 地址可能不一致
- 仅从 `options.query.authCode` 取授权码，H5 回跳时 authCode 常在 URL 的 search 或 hash 里导致未解析到
- 回跳时 `userStore.clear()` 清掉 token，绑房接口需 token 导致静默失败

## 修改内容
- `backUrl` 改为当前 webview 实际地址（与跳转前页面一致）
- 从完整 URL 解析 `authCode`，并在 `onLaunch` + `onShow` 都处理
- 绑房回跳时保留登录态，不再 `clear()`
- 绑房成功后 `navigateBack()` 关闭 `externalWebview` 回到原 H5 页面
- 增加 `[灵锡回调]` / `[灵锡绑房回跳]` 日志方便排查

## 涉及文件
- src/components/AddHouseDialog/AddHouseDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话ID：b9f46e5c-31b8-4bcb-a8ee-185ec72988e3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_bindhouse_callback",
  "source_extraction_id": "59ff5c92ec0d437c8dd9b0e558026b29",
  "version": 1,
  "memory_type": "entities"
}
-->