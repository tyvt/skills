# OpenViking 用户 data 快照（知识层）

本目录是 `%USERPROFILE%\.openviking\data\viking\default\user\default\` 的 **Git 备份**，与运行时 VikingFS **不是符号链接**；恢复时需复制回对应路径并由 OpenViking 服务重载 / 重建索引。

## 包含（影响记忆质量）

| 路径 | 说明 |
|------|------|
| `viking/.../memories/` | 实体 / 事件 / 偏好等长期记忆 `.md` |
| `viking/.../peers/*/memories/` | 按仓库 peer 分区的记忆 |
| `viking/.../.overview.md`、`.abstract.md` | 用户根摘要 |

## 故意不包含

| 路径 | 原因 |
|------|------|
| `sessions/` | DSH 会话原文镜像（~120MB），可由本地会话重新镜像 |
| `data/vectordb/` | 向量索引，可由 embedding 从 `.md` 重算 |
| `data/_system/` | SQLite 运行时锁/队列 |

若还需 **会话原文** 灾备，请单独备份 `sessions/` 或 DSH `~/.dsh/sessions/`。

## 与 `openviking-memory/` 的区别

- **`openviking-memory/`**：仅 `memories/` 扁平快照（历史约定，便于 diff）。
- **`openviking-data/`**：完整用户知识树 + **peers**，更贴近磁盘真源，利于整树恢复。

## 同步

```powershell
cd D:\repository\skills
node .\scripts\snapshot-openviking-data.mjs
node .\scripts\snapshot-openviking-data.mjs --commit --push --reason manual
```

可与 `snapshot-openviking-memory.mjs` 同跑；导入大批量结束后建议两者都 `--commit --push`。

元数据：`.snapshot-meta.json`。
