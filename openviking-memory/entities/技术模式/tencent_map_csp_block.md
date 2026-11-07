# 腾讯地图脚本CSP拦截排查
园区公共收益 Web 后台 ZsTencentMap 动态加载腾讯地图 SDK 被部署层 CSP 拦截时，需先查 script-src 白名单。

## 问题根因
- 浏览器控制台报 Refused to load the script ... map.qq.com ... violates Content Security Policy 且随后 TMap is not defined
- 根因通常是 Nginx/网关返回的 Content-Security-Policy 仅允许 script-src 'self' 'unsafe-eval' 'unsafe-inline'，未放行腾讯地图域名，与前端业务代码无关

## 排查与修复
- 排查：Network 里看 HTML 响应头的 Content-Security-Policy
- 修复时在现有策略上增补（勿重复叠多条 CSP），至少包含 script-src 的 https://map.qq.com、connect-src 的 https://apis.map.qq.com，以及瓦片/图标所需 img-src 腾讯域名

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：会话 e06cd774 用户问是否 nginx 配置问题；结论为部署层 CSP 拦截外部脚本，项目内未找到 CSP 配置
- 涉及文件：zhi2-web-admin/src/components/ZsTencentMap/mapLoader.js
- 所属项目：园区公共收益；来源会话：e06cd774-da4c-488e-81ae-850c6386e4e3；代码基线：4236087

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_map_csp_block",
  "source_extraction_id": "819e5a7101104283bab49fe88e924f5a",
  "version": 1,
  "memory_type": "entities"
}
-->