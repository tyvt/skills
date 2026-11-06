# 园区公共收益 腾讯地图脚本被CSP拦截诊断
园区公共收益项目腾讯地图 JS 被部署层 CSP 策略拦截导致 TMap is not defined，属 Nginx/网关配置问题而非前端代码。

## 问题原因
- 控制台报错 Refused to load script 'map.qq.com/...' 违反 CSP directive: script-src 'self' 'unsafe-eval' 'unsafe-inline'
- 当前站点 CSP 仅允许同源脚本，不允许从 map.qq.com 加载外部脚本
- 腾讯地图脚本被拦截后 `TMap is not defined`

## 解决方向
- 在 Nginx 配置里为 CSP 添加 map.qq.com 白名单（add_header Content-Security-Policy）
- 也可能在统一网关 / WAF / 负载均衡器设置

## 涉及文件
- ZsTencentMap/mapLoader.js
- 部署层 Nginx / 网关配置（项目代码无 CSP 配置）

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：e06cd774-da4c-488e-81ae-850c6386e4e3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nginx_csp_map",
  "source_extraction_id": "d0846b77e3174058abe8f842a0c0bb59",
  "version": 1,
  "memory_type": "entities"
}
-->