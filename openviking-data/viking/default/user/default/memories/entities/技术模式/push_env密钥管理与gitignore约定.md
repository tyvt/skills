# push_env密钥管理与gitignore约定
投资推送项目中含 SERVERCHAN_SENDKEY 的 push.env 不得入库，若历史泄露需轮转密钥，并规范 .gitignore 覆盖。

## 密钥管理
- 含 `SERVERCHAN_SENDKEY` 的 `push.env` 不得进 git（README 亦要求）
- 若曾在 `init` 等提交中入库，本地 `git rm --cached` 后仍视为密钥已泄露，应在 Server酱 重新生成 SendKey

## gitignore 规范
- 宜覆盖：`.venv-*/`、`config/push.env`、`config/cache/`、`config/data/`、`*.parquet`、回测输出与 `*.bak`/`*.tmp`
- 本地量化仓另须忽略：`rqalpha_env/`（`scripts/setup_rqalpha_env.bat` 生成）、`.code-review-graph/`（MCP graph.db）、`*.duckdb`、`*.pkl`、`*.log`、`.env`/`.env.*`（保留 `push.example.env`）、`.pytest_cache`/`.mypy_cache`/`.ruff_cache/`
- 若 `rqalpha_env` 曾被 `git add`，需 `git rm -r --cached rqalpha_env/`；`push.env` 一旦被跟踪，`.gitignore` 不生效，含 Server酱 密钥时应 `git rm --cached push.env`
- 模板保留 `push.example.env`

## 验证与归属
- 验证证据：会话 9c1154a6 更新 .gitignore 并从索引移除 push.env；指出 da7019c init 曾提交 SendKey，建议远程仓库轮转密钥
- 验证证据：会话 628f2f3e 更新 .gitignore 并从索引移除约 9000 个 rqalpha_env 文件；文档说明 push.env 可选后续
- 涉及文件：.gitignore、push.env、push.example.env、config/env.py、README.md、scripts/setup_rqalpha_env.bat
- 所属项目：投资推送；来源会话ID：9c1154a6-3e96-4992-aec9-9cc0b44fae86, 628f2f3e-f633-4050-b7b3-9dc33474f216

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "push_env密钥管理与gitignore约定",
  "source_extraction_id": "15fba428076444a7ac67605e839d5e2d",
  "version": 2,
  "memory_type": "entities"
}
-->