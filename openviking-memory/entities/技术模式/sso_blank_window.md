# B端SSO空白窗noopener冲突
B端单点登录先开空白窗再异步换授权URL时，window.open第三个参数带noopener会导致无法编程式跳转。

## 问题现象
- 先 `window.open('about:blank')` 再异步设授权URL的B端SSO，若第三个参数写 `noopener,noreferrer`，父页拿不到可操作的新窗口引用
- `newWindow` 为 null 或无法设 `location`，空白页一直停在 `about:blank`
- 用户手动点链接带URL打开则正常

## 根因与修复
- 去掉 `noopener,noreferrer` 以保留对子窗口的跳转权
- 跳转前 `newWindow.opener = null` 断开与原页关联
- 用 `location.replace(url)` 替代 `href`
- 等待期间显示「正在跳转」占位文案

## 验证与归属
- 验证：010.md 会话 7ffb3be2 用户「直接打开为空白，手动点击打开正常」；结论明确 noopener 导致无法操作新窗口 location，已改为 opener=null + replace
- 涉及文件：zhi2-web-admin/src/views/sso/bTerminalRedirect/index.vue、zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue、zhi2-web-admin/src/api/security/oauth2.js
- 所属项目：惠山二期G；来源会话：7ffb3be2-f8de-4608-8768-cc04a3088249；代码基线：43b1b40
- 区分：与「外链菜单走 InnerLink」「Vite 下 window.open PDF」不同，本条是异步赋址的新窗口与 noopener 的冲突

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sso_blank_window",
  "source_extraction_id": "b8d1b824386849719a7c6ed2c31fbe1a",
  "version": 1,
  "memory_type": "entities"
}
-->