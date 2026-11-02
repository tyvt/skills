# E2E 与测试 · 小程序

共 1 条。

其中 🔵 长期有效 0 条（排在最前，属必须遵守的约定）。

---

### x1417 · 冗余薄包装方法宜直接内联调用处

⚪ 模式 ｜ 验证于 小程序 ｜ 无 git 基线，引用前请自行核对

薄包装方法（如 `goLogin`、`persistPortalUserSnapshot`）增加冗余层级。移除此类方法并在调用处直接内联（如 `onGateConfirm` 直调 `startLoginFlow()`），以 `isPortalVerified()` 替代重复实名判断，删除未用 `formatDateYmd`，净减约25行且业务逻辑不变。

> 依据（摘）：extracted source=cursor session=b300def8-6c07-409d-ac21-89114d486c21

文件：`d:/repository/小程序/wygl-wxxcx-dev-slh/pages/webview/externalWebview.vue`、`d:/repository/小程序/wygl-wxxcx-dev-slh/pages/webview/home.vue`
---
