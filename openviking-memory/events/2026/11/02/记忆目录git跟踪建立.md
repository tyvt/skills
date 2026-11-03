# Summary
用户询问记忆存储位置并希望建立 git 跟踪。助手核查 ~/.openviking 存储布局后，从零初始化 git 仓库（此前不在任何 git 仓库中），添加 .gitignore（排除 vectordb、_system、sessions、_system/tasks）与 .gitattributes（强制 eol=lf 防止 Windows CRLF 污染记忆文件换行符），于 2026-11-02 完成基线提交 4f822ff（95KB），跟踪 42 个 .md 记忆文件（约 54KB）、4 个配置文件与 23 个目录索引。助手同时提议将仓库推到远程做异地备份，但因记忆含公司项目名需评估是否适合远程托管，待用户确认。
# 2026-11-02 (Monday) ChatLog:
**user**: 记忆存在哪里，我需要先建立git跟踪
**assistant**: 我先精确核查存储布局、各目录的体量，以及哪些是可复现的派生数据；这决定了 git 该跟踪什么。
**assistant**: 关键结论正在成形：真正需要纳入版本控制的是 `viking/` 目录下的 `.md` 文件（共 88 个，合计 130KB，可以人工阅读）。其余内容要么是派生索引，要么是 SQLite 运行时文件，不适合直接提交到 git。我再确认一下 `viking/` 的内部结构。
**assistant**: 存储布局已经清楚。接下来我要确认 `~/.openviking` 是否已在某个 git 仓库内，并查看 `sessions/` 里那 1.5MB 是否含有价值。
**assistant**: 情况已经清楚了：`~/.openviking` 目前**不在任何 git 仓库中**，需要从零建立跟踪。我会先确认一个关键点：`sessions/` 里的 `.jsonl` 是会话原文镜像，约 1.4MB，是否值得纳入版本控制。
**assistant**: `sessions/` 里是原始会话镜像，包含完整对话原文，属于可再生数据，且体量大，不建议提交到 git。现在建立仓库。
**assistant**: 我先检查 `ov.conf` 是否含有敏感凭据。它看起来是纯本地配置，但文件里有一处 `api_key` 字段，因此在提交前我需要确认。
**assistant**: 检查通过：其中没有真实凭据，api_key 只是占位符 `no-key`；`state/` 是日志和运行时身份，应被忽略。现在开始初始化仓库。
**assistant**: 暂存结果暴露了两个需要修正的问题：`_system/tasks/*.json` 是任务日志，不应入库；且 CRLF 转换会污染记忆文件的换行符。我先修正 `.gitignore`。
**assistant**: 现在处理 CRLF 问题：记忆文件是 UTF-8、使用 LF 换行；若 git 自动转换，每份文件都会被改写，会导致无意义的 diff。我加上 `.gitattributes` 固定为 LF。
**assistant**: `_system/tasks` 里的文件仍然被暂存，这说明 `git rm --cached` 没有真正清空索引。我改用标准做法。
**assistant**: 这次清理干净了：暂存文件从 93 个降到 72 个，`_system/tasks` 已全部排除。接下来我验证最终清单。
**assistant**: 42 个记忆 .md 文件全部在内，配置三件套也齐全。我再确认那 23 个「其他数据」不含噪音。
**assistant**: 这些文件是 OpenViking 自动生成的目录索引（`.abstract.md`/`.overview.md`），属于服务重建时会重新生成的派生文件。它们体积极小，并且确实反映了当前知识结构；但会随每次记忆写入而变化，产生一些噪音提交。

这些文件我保留跟踪。它们只有 23 个、每个不到 1KB，保留后能看到知识库的生长轨迹。现在提交。
**assistant**: 基线已提交。我再验证一下：这些记忆文件确实在 git 中可读、行尾正常。
**assistant**: Git 跟踪已建立，基线提交为 `4f822ff`，仓库 95KB。

## 记忆存放在哪

全部在 `C:\Users\Administrator\.openviking\`：之前它**不在任何 git 仓库里**，与 `~/.dsh` 一样属于未纳入版本控制的目录。

真正对应「记忆」的，是**可读的 Markdown 文本**：

```
data/viking/default/user/default/memories/
├── identity.md                    我是谁
├── soul.md                        行为准则
├── entities/                      实体知识卡（ollama、openviking、dsh、园区物管2.0…）
├── events/2026/11/02/             按日期归档的事件记忆
└── preferences/default/           偏好（决策交互方式、沙箱提权）
```

共 **42 个 .md**，合计约 54KB。

## 已纳入跟踪的内容

| 内容 | 数量 | 说明 |
|---|---|---|
| 配置三件套 | 4 | `ov.conf`、`ovcli.conf`、`start-server.bat`、`bge-m3-ov.Modelfile` |
| 记忆正文 | 42 | 上面列出的 entities/events/preferences |
| 目录索引 | 23 | 各级 `.abstract.md` / `.overview.md`，可查看知识库生长轨迹 |

## 刻意排除的内容（关键判断）

`~/.openviking` 总计 11.2MB，但**其中绝大部分不能或不适合入库**：

- `data/vectordb/`（1MB）— 向量索引，二进制文件，可由 `.md` 重新 embedding 生成
- `data/_system/`（8.5MB）— 队列和用量审计的 SQLite 数据库，含 `-wal`、`-shm`，其中 4MB 是正在写入的 WAL 日志
- `sessions/`（1.5MB）— 会话原文镜像，量大且可重新生成
- `_system/tasks/` — 每次 commit 都会生成一条 JSON 日志

**只跟踪排除后剩余的 95KB 文本**，因此 diff 保持可读，也能随时人工审阅每条记忆的变化。

## 附带解决的一个隐患

Windows 的 `core.autocrlf` 会把 LF 自动转成 CRLF，导致每份记忆文件首次提交时全是「整文件改动」，之后每次查看 diff 也满屏假差异。已用 `.gitattributes` 强制 `eol=lf`，实测抽查文件行尾正常。

## 更新跟踪

```powershell
cd ~/.openviking
git add -A && git commit -m "memory: 新增 xxx 记忆"
```

注意：OpenViking 会根据内容重新生成 `.overview.md`，所以几乎每次记忆变动都会伴随几行索引文件的改动，这是正常现象。

是否需要我把这个仓库推到远程做异地备份？跨机器或重装前建议做，但要先确认**记忆里有公司项目名等信息，是否适合放到远程托管**。

<!-- MEMORY_FIELDS
{
  "event_name": "记忆目录git跟踪建立",
  "goal": "建立git版本控制",
  "summary": "用户询问记忆存储位置并希望建立 git 跟踪。助手核查 ~/.openviking 存储布局后，从零初始化 git 仓库（此前不在任何 git 仓库中），添加 .gitignore（排除 vectordb、_system、sessions、_system/tasks）与 .gitattributes（强制 eol=lf 防止 Windows CRLF 污染记忆文件换行符），于 2026-11-02 完成基线提交 4f822ff（95KB），跟踪 42 个 .md 记忆文件（约 54KB）、4 个配置文件与 23 个目录索引。助手同时提议将仓库推到远程做异地备份，但因记忆含公司项目名需评估是否适合远程托管，待用户确认。",
  "ranges": "40-105",
  "source_extraction_id": "a04cc8aa7d93412f9c86d475855cc7a0",
  "version": 1,
  "memory_type": "events"
}
-->