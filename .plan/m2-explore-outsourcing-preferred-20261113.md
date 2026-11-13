---
status: approved
human_confirmed: true
confirmed_at: 2026-11-13
approved_sha256: adf4da00e2e19aa5a7d290de1fe884d79e3620552caf0166262dbd216b3a1c6d
approved_version: 1
risk: low
review_override: false
session: m2-explore-outsourcing
title: AGENTS.md 探索纪律：子代理探索设为默认首选，主模型 pwsh 盲搜降为兜底
---

# 任务标题

把 AGENTS.md 探索纪律段（第 16 行）的**优先级顺序**改对：**子代理探索（dsh-explore）设为默认首选**，**主模型自己发 pwsh Get-ChildItem / Select-String 盲搜降为兜底**。

## 一、前因后果

- 用户观察：pwsh 工具不被 agent-guard 拦截，主模型在探索期若不用 grep/glob，会频繁发 `pwsh Get-ChildItem` 或 `pwsh Select-String` 做盲搜，把 pwsh 的物理延迟和上下文膨胀全部砸在宿主主模型上。
- 这印证 M2（探索外包 + 子代理豁免）的绝对必要性：只有让子代理去承受这些物理延迟和上下文膨胀，主模型才能真正保持干净。
- 现状 AGENTS.md:16 虽已提及 dsh-explore，但句式仍以「先 pwsh 列目录再 glob」为主叙述、把 dsh-explore 附在后面，优先级默认项不明确，读者仍会先发 pwsh 盲搜。

## 二、已核验事实

- E1 `dsh/AGENTS.md:16`（`~/.dsh/AGENTS.md` 为 symlink）：现有整段文字，起始为「未知目录先 pwsh 列目录再 glob」，末尾补丁句「探索外包：……优先派 dsh-explore……主会话禁裸 grep 探索」。
- E2 `dsh-explore/SKILL.md:1-37`：skill 已存在，模板完整（何时用/怎么用/编排器场景/约束），可直接作为首选引用。
- E3 `.plan/explore-drift-guard-20261113.md:38-41`：M2 原计划即「AGENTS.md 探索纪律段追加一行」，本任务是对该行的**排序强化**（把子代理探索提为首选、pwsh 盲搜降为兜底）。

## 三、实施方案（分步）

| 步骤 | 落点文件:行 | 改动 | 验证 |
|---|---|---|---|
| 1 | `dsh/AGENTS.md:16`（单条 bullet，一次 edit 改写该条；范围锁定此单文件单 bullet，**不动** SKILL.md） | 重排为：① **默认首选**=派 `dsh-explore` 只读子代理（含探索/批量/未知根时）；② 主模型仅对**已知具体目录**用带 `path` 的窄 grep/glob；③ **兜底**=主模型自己发 `pwsh Get-ChildItem`/`Select-String` 盲搜，仅当「派子代理失败/超时」或「只差一条命令即可定位」时使用，且**同一任务连续盲搜 ≤2 次**，超限必须改派子代理 | read 复查该行；并 grep AGENTS.md 的 `pwsh`/`裸 grep`/`dsh-explore` 相关句，确认与新文案无残留矛盾 |

## 四、风险与回滚

| 风险 | 缓解 | 回滚/开关 |
|---|---|---|
| 表述把 pwsh 完全禁掉导致无 Team 场景无法探索 | 明确写「兜底可用」，仅限制「盲搜优先」而非禁用 | git checkout 该文件 / 单条 edit 反改 |

## 五、验证计划

- read `dsh/AGENTS.md` 第 16 行，确认：dsh-explore=首选，主模型 pwsh 盲搜=兜底（含可判定条件与 ≤2 次上限），且与 skill 名一致。
- grep `dsh/AGENTS.md` 中 `pwsh`、`裸 grep`、`dsh-explore` 相关句，确认重排后与同段既有「主会话禁裸 grep 探索」不矛盾（新文案允许「已知具体目录 + 带 path 的窄 grep/glob」是有意收窄，非放开裸搜）。
- 无代码、无单测；构建基线不适用（纯 Markdown 文档改动，无 build 产物）。

## 六、范围

- 只改 `dsh/AGENTS.md` 第 16 行一条 bullet，范围锁定单文件单 bullet；**不联动** `dsh-explore/SKILL.md`。不改任何代码/插件逻辑。
