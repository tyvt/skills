# 外链型菜单组件规范化
产品2.0中配置指向https地址的B端SSO跳转菜单组件（sso/bTerminalRedirect/index）必须走 InnerLink 同款外链规范化，否则报「没有授权菜单」。

## 问题根因
- 动态路由组装时 InnerLink 有专门外链规范化逻辑，但其他跳转外壳组件未走，Vue Router无法注册https开头path
- 侧边栏用<a target=_blank>打开绕过SSO跳转，触发404守卫报未授权

## 解决方案
- 在 permission.js 动态路由组装处，把该外壳组件与 InnerLink 一起纳入「外链组件」判定（component字符串匹配），统一做 normalizeExternalLinkRoute
- 组件内从 meta.link 解析真实跳转地址
- 菜单配置：组件路径 sso/bTerminalRedirect/index、路由地址填https链接、业务编码填对应clientId；配置后需重新登录刷新动态路由

## 验证与归属
- 验证证据：permission.js 新增 isBTerminalRedirectComponent + normalizeExternalLinkRoute，将 bTerminalRedirect 纳入与 InnerLink 相同外链路径规范化
- 涉及文件：zhi2-web-admin/src/store/modules/permission.js、zhi2-web-admin/src/views/sso/bTerminalRedirect/index.vue
- 所属项目：产品2.0；来源会话：f702fc2e-fea8-44f2-ac57-30fa5c4f7b79；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_redirect_fix",
  "source_extraction_id": "972b21df6a454c439c8db1320a0d9503",
  "version": 1,
  "memory_type": "entities"
}
-->