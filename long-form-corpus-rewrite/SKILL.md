# long-form-corpus-rewrite

**在“大量分片笔记/译文/词条文件”上做批量改写时使用。** 典型场景：译文分章分片（`ch008_seg00.md`、`ch008_seg03.md`…）、词条库、术语表、原型文案清单——一个目录里几百到几千个 `.md`，需要逐片改写/校对/规范化。

这类任务的 token 杀手不是“改得多”，而是**一个会话里硬撑到底**：goal 自动续跑十几轮、上下文反复 compaction 失败、同一片被反复整读 + 多次 edit、每轮重发巨长的目标与清单。实测一个这样的会话消耗 10.5M 未命中（占总 token 53%），命中率跌到 38%。

---

## 一、开工前：先建“分片清单 + 进度台账”（只做一次）

1. **生成清单落盘**，不要靠“再看目录”。用脚本一次产出 `worklist.json`（或 `.md` 表），字段：`index / file / words / status / note`。
   ```powershell
   Get-ChildItem <dir> -Filter *.md -Recurse | ForEach-Object {
     [pscustomobject]@{ file=$_.FullName; words=(Get-Content $_ -Raw).Length; status='pending'; note='' }
   } | Sort-Object file | ConvertTo-Json | Set-Content worklist.json -Encoding utf8
   ```
2. **不要把这些清单整篇读进上下文。** 需要分批时只 `read` 对应切片，或用一条命令统计（`| Group-Object status`）。
3. 把“改写规范”（什么算文言、什么算白话、允许/不允许的改动、术语表）**一次写进工作区的一个 `STYLE.md`**，后面每批只引用文件路径，不在对话里复述。

## 二、分批：一批文件 = 一个会话 = 一个 goal（硬约束）

- **每批 8–15 个片段**（按字数估：一批总字数控制在 3–6 万字）。清单里标 `batch-01…`。
- **每个会话只处理一批**。一批做完就**收尾、开新会话**处理下一批；不要把 30 批塞进一个会话。
- **goal 轮数上限 4–6 轮**；单批没能做完就如实报告，而不是开一个“全部处理完再停止”的无限 goal。
  - 🚫 反例（今天真实发生）：“继续 / 继续，全部处理完 / 没有处理完不要停止”→ goal 续跑 16 轮，压缩失败 91 次。
  - ✅ 正例：“本批 = batch-03（12 片），做完就停并汇报；batch-04 我在下个会话里做。”

## 三、单片改写：一次 edit 定稿，禁止“边读边改边重读”

对每个片段：

1. **定位再读**：如果只想改某几行，先 `grep` 拿行号，再 `read` 带 `offset/limit`。整片**只整篇读一次**。
2. **一次 `edit` 定稿**：把该片所有要改的地方合成**一次** `edit`（或用 `write` 整篇重写）。不要“改一处 → 读回 → 再改一处”：
   - 每次 `edit` 的 `new_string` 都会永久留在历史里，并在之后**每一步**重发。
   - 同一文件被改 5–8 次的，就是重复计费的典型（今天 `ch008_seg00.md` 改了 8 次）。
3. **改完立刻在台账里打勾**：`status='done'`（用一个脚本或一次性 `write` 更新 `worklist.json`，不要逐条对话里说）。
4. **不要复述改了什么全文**，只报一行：`ch008_seg00 ✓（改 14 处，术语统一）`。

## 四、上下文纪律（这条最关键）

- **单会话到 60% 窗口就收尾**，别等 compaction。出现以下信号立即换新会话：
  - compaction 反复失败（“summary is not smaller than the shadowed content”）≥3–5 次；
  - 每步未命中 &gt;12k（用 `node ~/.dsh/skills/token-frugal/workflow-audit.mjs --session &lt;前缀&gt;` 自查）；
  - 你发现自己开始“重新读之前读过的同一片”。
- **模型必须用 `workbuddy-ai/deepseek-v4.1-flash`**（缓存 98%，每步未命中 ~1.4k）。长任务里**不要**用 `cursor/grok-4.7` 之类（实测 38% 命中，每步 57k）。
- 会话中途**不切模型、不动工具清单**，每次切换 = 整段前缀缓存作废。

## 五、收尾：给下一批一个干净的交接

在一个会话结束前，写一份 5 行的 `HANDOFF-batch-NN.md`：
```
批次：batch-03（12 片）
已完成：9 片（见 worklist.json done）
未完成：3 片 —— 原因
遗留问题：X 术语在 2 片里不一致，需统一
下一批入口：batch-04（12 片），STYLE.md 未变
```
下一会话开局只读这个 handoff + worklist 的状态统计，不要重读已完成片段。

---

## 反模式速查

| 反模式 | 代价 | 正确做法 |
|---|---|---|
| 一个 goal “全部处理完再停” | 续跑 16 轮、压缩失败 91 次 | 一批一会话、goal ≤6 轮 |
| 边读边改边重读同一片 | 重复整读 383 次 | 整片读一次、一次 edit 定稿 |
| 把清单/进度整篇读进上下文 | 每步重发几万 token | 台账落盘，只读切片或统计 |
| 用 grok/cursor 长跑 | 命中率 38–50% | 锁 deepseek-v4.1-flash |
| 改完在对话里复述全文 | 输出+历史双涨 | 一行结论 + 台账打勾 |
