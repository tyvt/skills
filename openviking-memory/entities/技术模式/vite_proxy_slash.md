
# Vite代理前导斜杠处理（产品2.0）
产品2.0 的 Vite 开发代理 key 必须以 / 开头，但生产环境接口必须是相对路径 api/v2.0（无前导 /），两者对同一环境变量 VITE_APP_BASE_API 的要求冲突。

## 问题现象
- 后端接口全部 404 或返回前端首页，看起来像「代理失效」（proxy context 缺前导斜杠时）
- VITE_APP_BASE_API 写成 api/v2.0（无前导 /）时，代理规则永远不命中
- 若把 env 改成 /api/v2.0 本地代理可用，但生产要求相对路径，直接改 env 会破坏生产部署

## 根因
- Vite 用 doesProxyContextMatchUrl → req.url.startsWith(context) 判定命中
- 浏览器 req.url 必以 / 开头，而 context 为 'api/v2.0' 时 '/api/v2.0/xxx'.startsWith('api/v2.0') 恒为 false
- 请求被当成前端静态资源处理
- Vite server.proxy 匹配 key 要求以 / 开头，生产又不能带前导斜杠，两者对同一个环境变量要求冲突

## 解决方案
- env/.env 保持相对路径 api/v2.0 不动（满足生产 Nginx 部署相对解析需求）
- vite.config.js 里对开发代理单独规范化：`const proxyApiPath = env.VITE_APP_BASE_API?.startsWith("/") ? env.VITE_APP_BASE_API : `/${env.VITE_APP_BASE_API}``，用规范化后的值做 proxy key
- baseApi 为空时回退 /api/v2.0；开发代理与生产 base 路径语义解耦
- 改完必须重启 npm run dev（Vite 仅启动时读配置）；VITE_APP_PROXY_ADDRESS 不带端口走 80，后端在 :8080/:9605 须写完整 host:port

## 排查与验证
- 验证代理生效看响应头 frontend-proxy
- 与已知「env 被 .env.development.local 覆盖」是不同根因，分别排查
- 涉及文件：vite.config.js、env/.env；所属项目：产品2.0；来源会话：317d62ff、dace033e；基线：5a86102、dfe69d6


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_proxy_slash",
  "source_extraction_id": "b2ef880cfdd147c9bc8ecd0a19ff7f54",
  "version": 2,
  "memory_type": "entities"
}
-->