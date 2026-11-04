
# bTerminalRedirect 路由与保活
无锡市区G（zhi2-web-admin）的 sso/bTerminalRedirect/index 组件，原先未纳入 InnerLink 的路由规范化导致配 HTTPS 菜单路径时 404，后实现 iframe 视图池保活。

## 路由规范化（修复 404）
- 根因：菜单 path 配成 https://... 时 Vue Router 无法匹配内部路由，落到兜底 path:'*' 重定向 /404，守卫提示「页面未授权或不存在」
- 仅 InnerLink 组件在 permission.js 做路径规范化：HTTPS 写入 meta.link，path 转为内部路由（如 https://b.example.com/callback → b/example/com/callback）
- 修复：permission.js 把 bTerminalRedirect 纳入与 InnerLink 相同的内嵌 iframe 路由规范化；侧边栏 RecursiveMenu 对该组件改走 router-link，不再当纯外链新开窗口
- 涉及文件：permission.js、src/api/security/oauth2.js、src/views/sso/bTerminalRedirect/index.vue

## iframe 视图池保活
- bTerminalRedirect 页签保活采用与 InnerLink 相同的 iframe 视图池（v-show 常驻 DOM），而非 Vue keep-alive
- src/utils/innerLink.js 新增 isBTerminalRedirectRoute、isIframePoolRoute
- src/utils/bTerminalRedirect.js 抽取 OAuth 取址逻辑 fetchBTerminalIframeSrc
- src/store/modules/permission.js 为 sso/bTerminalRedirect/index 设置 meta.bTerminalRedirect = true
- src/layout/components/iframeToggle/BTerminalRedirectFrame.vue 等集成视图池

## 验证与归属
- 来源会话：2c02c8f7-aee0-47dd-b23d-d8d8f94a007a、47301bc4-8faf-4838-b33c-54afa184fa11；所属项目：无锡市区G；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_redirect",
  "source_extraction_id": "00f35b17a60448048352f53a0dbe42f3",
  "version": 3,
  "memory_type": "entities"
}
-->