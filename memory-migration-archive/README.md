# memory-migration 原始导出归档（蒸馏前源文件）

本目录存放 **cursor / workbuddy / opencode 等外部会话工具的原始导出**，即经
`memory-migration` 管线**蒸馏导入 OpenViking 之前**的原始材料。它与仓库里的
`openviking-data/`（OpenViking 的派生状态镜像：memories/sessions + vectordb）**刻意分开**，
实现“完整内容 + 溯源”的备份目标：

- **原始源**（本目录）vs **派生状态**（`openviking-data/`）边界清晰；
- 重新蒸馏、排查记忆质量、或整体恢复时，二者互不干扰；
- `openviking-data/` 保持“纯镜像”契约（只含 `viking/` + `vectordb/`）。

## 来源与同步

| 项 | 说明 |
|----|------|
| 源目录 | `%USERPROFILE%\Documents\deepseek-harness\default-workspace\memory-migration\out`（可用环境变量 `MIGRATION_OUT` 覆盖） |
| 同步脚本 | `scripts/snapshot-memory-migration-archive.mjs` |
| 触发 | 由 `scripts/run-openviking-snapshots.ps1` 每日 03:00 自动调用（与 data/memory 快照一起） |

同步采用 `robocopy /MIR`（镜像：新增/变更复制，源已删除则清理），并带与 vectordb
相同的守护：当源文件数异常偏少（<10 或 < 上次基线的 50%）时跳过 `/PURGE`，避免瞬时
或受损的源清空归档。源目录不存在时**不**擦除已有归档，仅照常记录。

`.snapshot-meta.json` 记录最近一次同步时间、文件数、字节数与来源路径，便于审计。
