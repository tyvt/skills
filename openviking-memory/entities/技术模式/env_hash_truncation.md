# Vite 环境变量哈希截断
`.env` 中未加引号的 URL 若含 `#`，Vite `loadEnv`/dotenv 会把 `#` 之后当注释丢弃，导致 hash 路由丢失。

## 触发条件
- 未加引号值如 `KEY = http://61.177.132.131:3080/#/pages_owner/decision/detail`，实测解析为 `http://61.177.132.131:3080/`。
- 组件随后拼接查询参数会得到 `http://61.177.132.131:3080/?id=xxx#/`，现象是二维码跳到根路由而不是详情页。
- 此类问题容易和「未重新构建」或「构建模式用错」混淆，需以 `loadEnv` 结果和产物实测定性。

## 修复方式
- 给含 `#` 的 URL 加单引号或双引号，例如 `"http://61.177.132.131:3080/#/pages_owner/decision/detail"`。
- 同一配置组中所有 hash URL 都要引号化，例如 `VITE_APP_OWNER_DECISION_DETAIL_URL` 与 `VITE_APP_OWNER_ELECT_DETAIL_URL`。
- 修复后运行生产构建并在 `dist` 中搜索目标路径，确认查询参数拼在 hash 路径之后。

## 防复发
- 清理旧 `dist` 后再重建，避免旧 chunk 残留造成多个不同 URL 同时存在。
- 发布前扫描产物，确认无 `undefined?id=`、无只有根域的旧 URL，并确认存在完整详情页路径。
- 校验应落在产物实测而非仅看 `.env` 文本。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "env_hash_truncation",
  "source_extraction_id": "49213c6f3b7c44fda78dc446b7199b48",
  "version": 1,
  "memory_type": "entities"
}
-->