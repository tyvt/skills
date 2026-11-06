# Vite 环境变量加载优先级（代理修改不生效根因）
苏州市房地产监测V3 本地 `npm run dev` 代理修改不生效的根因已定位为 Vite 环境变量优先级。

## 问题原因
- 修改的是 `env/.env`，但开发模式实际使用的是更高优先级的 `env/.env.development.local`，其代理地址会覆盖 `.env`

## 加载机制
- `vite.config.js` 从仓库根下 `env/` 目录加载环境变量（`loadEnv(mode, rootDir + "/env")`，`envDir: rootDir + "/env"`）
- Vite 合并顺序（后者覆盖前者）：1. `env/.env` 2. `env/.env.local`（若有） 3. `env/.env.development`（若有） 4. `env/.env.development.local`（若有，优先级最高）

## 涉及文件
- `zhi2-web-admin/vite.config.js`
- `env/.env`、`env/.env.development.local`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：d5d06cba-323d-42cc-97f2-d132fd10ba5c
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_env_priority",
  "source_extraction_id": "b73fb50eba434aa79e3d0fcfb2358295",
  "version": 1,
  "memory_type": "entities"
}
-->