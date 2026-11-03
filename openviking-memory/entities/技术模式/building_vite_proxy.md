# 本地联调 building 接口 Vite 代理模板
淮安物管 zhi2-web-admin 本地将 /api/2.0/building 代理到联调机的 Vite 配置写法约定。

## 场景
- `zhi2-web-admin` 本地把 `/api/2.0/building` 指到联调机。

## 写法
- 对齐 maintenance 代理：`target` + `rewrite`（`/api/2.0/building` → `/2.0/building`）+ `changeOrigin: true`。
- `bypass` 里写 `req.headers['zhi-project-id']='homeland'` 并 `res.setHeader('full-url', target+rewrittenUrl)`。

## 注意
- 上游若要求保留 `/api` 前缀则不要 strip `/api`，按后端真实路径改 rewrite。
- target IP/端口随环境替换。

## 验证与归属
- 验证：会话 05e9d9be 用户要求 /api/2.0/building 代理 192.168.1.158:9603 并参考 maintenance 配置。
- 涉及文件：zhi2-web-admin/vite.config.js、env/.env
- 所属项目：淮安物管；来源会话：05e9d9be-749c-4320-b671-df76d21301bb；代码基线：a87b1e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_vite_proxy",
  "source_extraction_id": "c5852556bbb845f685ba8e45ddb255f3",
  "version": 1,
  "memory_type": "entities"
}
-->