# Summary
2026-11-07，助手将 snapshot-openviking-data.mjs 扩展为备份完整 user/default 树（含 memories、peers、sessions、skills、resources、privacy、摘要）以及 vectordb/ 与 backend_meta.json，并推送到 tyvt/skills 的 origin/main（提交 4cdcd7bf），共约 20154 文件 / 213 MB；备份 vectordb 时短暂停止 openviking-server 释放 LevelDB 文件锁后自动重启，/health 恢复正常。
# 2026-11-07 (Saturday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 所有影响记忆质量的数据都要备份到git
**assistant [peer=deepseek-harness-default-workspace]**: 梳理 OpenViking 全量 data 树，扩展快照脚本以纳入 sessions、vectordb 等影响记忆质量的路径。
**assistant [peer=deepseek-harness-default-workspace]**: 正在将快照扩展为完整镜像：`user/default`（含 sessions）与 `vectordb`。
**assistant [peer=deepseek-harness-default-workspace]**: vectordb 被运行中的 OpenViking 锁定。正在为复制加入重试，并对 vectordb 使用 robocopy。
**assistant [peer=deepseek-harness-default-workspace]**: ## 已扩展为「所有影响记忆质量」的 data 全量 Git 备份

按你的要求，[`snapshot-openviking-data.mjs`](D:/repository/skills/scripts/snapshot-openviking-data.mjs) 现已备份 **质量相关整包**，并成功推到 **`tyvt/skills` `origin/main`**。

### 现在 `openviking-data/` 包含什么

| 内容 | 规模（本次） | 作用 |
|------|----------------|------|
| **`viking/.../user/default/` 整树** | 20106 文件 / ~133 MB | `memories`、`peers`、**`sessions`（抽取输入原文）**、`skills`、`resources`、`privacy`、摘要 |
| **`vectordb/`** | 48 文件 / ~80 MB | 向量索引（检索一致性，不必全量重算） |
| **`backend_meta.json`** | 若有则同步 | 后端元数据 |

**仍不入库**（纯运行时）：`data/_system/`、锁文件、`pending/`、`state/`。

### 远程提交

- **`4cdcd7bf`** — `chore(openviking-data): 全量质量快照 sessions+vectordb (full-quality-data-2026-11-07)`
- 合计约 **20154 文件 / 213 MB**

### 行为说明

1. **vectordb 备份**：复制前会**短暂停止** `openviking-server`（LevelDB 文件锁），完成后已**自动再起**；当前 `/health` 正常。
2. **校验**：仅对**正文记忆** `.md`（不含 `.overview.md` 等隐藏文件）做 NUL / `MEMORY_FIELDS` 尾块检查。
3. **仓库根** 增加 [`.gitattributes`](D:/repository/skills/.gitattributes)（`*.ldb` 等为 binary，避免换行污染）。

### 日常命令

```powershell
cd D:\repository\skills
# 全量质量 data（会短停服务以拷 vectordb）
node .\scripts\snapshot-openviking-data.mjs --commit --push --reason manual
# 扁平 memories diff（可选）
node .\scripts\snapshot-openviking-memory.mjs --commit --push --reason manual
```

说明见 [`openviking-data/README.md`](D:/repository/skills/openviking-data/README.md)。

### 与 `~/.openviking/.git` 的关系

本机 `~/.openviking` 仍有本地 git，但**无 remote**；**异地备份以 `tyvt/skills` 为准**。今后「所有影响记忆质量的数据」都走 **`openviking-data/`** 这一条线即可。

若还要把**定时任务**改成每天同时跑 `snapshot-openviking-data`（而不只 memory），可以说一声我改 [`register-openviking-memory-schedule.ps1`](D:/repository/skills/scripts/register-openviking-memory-schedule.ps1)。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking全量质量Git备份",
  "goal": "执行全量质量备份",
  "summary": "2026-11-07，助手将 snapshot-openviking-data.mjs 扩展为备份完整 user/default 树（含 memories、peers、sessions、skills、resources、privacy、摘要）以及 vectordb/ 与 backend_meta.json，并推送到 tyvt/skills 的 origin/main（提交 4cdcd7bf），共约 20154 文件 / 213 MB；备份 vectordb 时短暂停止 openviking-server 释放 LevelDB 文件锁后自动重启，/health 恢复正常。",
  "ranges": "15-79",
  "source_extraction_id": "d77069f405a44d43835d5fb3341af9df",
  "version": 1,
  "memory_type": "events"
}
-->