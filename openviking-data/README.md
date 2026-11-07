# OpenViking data 全量快照（记忆质量相关）

本目录镜像 `%USERPROFILE%\.openviking\data\` 中**影响记忆抽取、检索与上下文质量**的部分，提交到 `tyvt/skills` 做异地版本备份。**非符号链接**；恢复时复制回 `~/.openviking\data\` 对应路径并重启 OpenViking 服务。

## 包含

| 路径 | 说明 |
|------|------|
| `viking/default/user/default/**` | **整棵用户树**：`memories/`、`peers/`（含各 peer 记忆）、`sessions/`（DSH 镜像原文，抽取输入）、`skills/`、`resources/`、`privacy/`、`.overview.md`、`.abstract.md` |
| `vectordb/**` | 向量索引（检索质量与重算成本） |
| `viking/default/backend_meta.json` | 后端元数据（若存在） |

## 不包含（运行时噪声）

| 路径 | 原因 |
|------|------|
| `data/_system/` | SQLite 锁/队列，无知识价值 |
| `data/.openviking.lock` | 进程锁 |
| `pending/`、`state/` | 导入队列与进程状态 |

## 与 `openviking-memory/`

- **`openviking-memory/`**：仅 `memories/` 扁平副本，便于人工 diff。
- **`openviking-data/`**：**全量质量相关 data**（含 sessions + vectordb），用于灾备与整树恢复。

## 同步

```powershell
cd D:\repository\skills
node .\scripts\snapshot-openviking-data.mjs --commit --push --reason manual
node .\scripts\snapshot-openviking-memory.mjs --commit --push --reason manual
```

导入大批量或质量治理后建议两者都跑。元数据：`.snapshot-meta.json`。

## 体积说明

典型约 **200MB+**（含 sessions 与 vectordb）。推送较慢属正常；仓库已用 `.gitattributes` 将 `*.ldb` 等标为 binary。
