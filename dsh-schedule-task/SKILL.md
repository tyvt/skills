---
name: dsh-schedule-task
description: 在 DSH Web 里创建/列出/修改/删除自动化（定时）任务，并确保任务在 Web 任务列表可见。当需要定时提醒、周期检查、到点自动跑 agent 时使用。
---

# DSH Web 自动化任务（schedule）

用 DSH Web 内建的 `schedule_*` 工具创建**宿主持久化任务**：到点后宿主恢复原会话并把 prompt 投递给 agent。任务存在 `C:\Users\Administrator\.dsh\storages\schedule.json`，随 Web 重启保留。

## 何时用

- 需要「指定时刻 / 每隔 N 秒 / 每天 / 每周 / 复杂日历规则」自动触发一段 agent 指令（统一用 `rrule` 表达）。
- 需要任务出现在 DSH Web 的自动化任务列表里、可在 Web 上查看/暂停/删除。

## 前置（务必先确认，否则建了 Web 也看不到）

1. **当前会话必须有 schedule 工具**：工具目录里应能看到 `schedule_create`、`schedule_edit`、`schedule_list`、`schedule_view`。没有就不要退而求其次用 `schtasks`/写文件——那些不进 DSH Web 存储，Web 必然看不到。
2. **会话工具表在会话创建时冻结**：改预设配置后必须**重启 DSH Web + 新开会话**才生效；当前会话不会热加载新工具。
3. **standard 预设须已启用 `tool-schedule`**：配置在 `C:\Users\Administrator\.dsh\profiles\web\cordis.patch.yml` 的 `preset-standard` 插件列表，`tool-schedule` 下不应有 `disabled: true`（`full-tools` 预设亦无此禁用）。
4. **必须由主 agent 调用**：工具显式拒绝 delegated subagent（`subagent_session`），子代理建不了。
5. **投递目标由 `target` 决定**：`this_session` 投递到创建会话（Web 列表在该会话可见）；`new_once` / `new` 投递到新建会话，可在非创建会话产生新会话。是否「换会话看不到」取决于 `target` 与涉及会话，不再是绝对行为。

## 四个工具（运行时真实签名）

运行时暴露四个工具：`schedule_create`、`schedule_list`、`schedule_edit`、`schedule_view`。旧文档的六选择器与两个已废弃的变更工具在运行时**都不存在**，勿照抄旧文档。

### `schedule_create(prompt, title, rrule, target)`

- `prompt`：非空指令文本。
- `title`：非空、去空白后 ≤120 字符；不会从 prompt 派生，必须显式给。
- `rrule`：RFC 5545 子集，**两段式、用换行分隔**：第一行 `DTSTART;TZID=Asia/Shanghai:yyyyMMddTHHmmss`（或 UTC `...Z`），第二行 `RRULE:FREQ=DAILY;COUNT=1`。
  - 一次性投递：`RRULE:FREQ=DAILY;COUNT=1`；`COUNT` ≤1000，更长用 `UNTIL`（UTC，`Z` 结尾）。
  - `FREQ=DAILY|WEEKLY|MONTHLY|YEARLY|HOURLY|MINUTELY`；`HOURLY`/`MINUTELY` 不带 BY 部分；`BYSETPOS` ≤31。
  - DTSTART 必须是存在的本地时间；TZID 规则跨夏令时保持本地钟表时间。`DTSTART` 可在过去，首次投递取创建后第一个发生时刻。
- `target`：投递模式，**三选一**：
  | 取值 | 语义 |
  |---|---|
  | `this_session` | 投递到当前会话；同一会话串行等待上次投递完成，只保留期间错过的最后一次。适合提醒/本会话后续跟进。 |
  | `new_once` | 首次投递时开一个新会话，之后都投递到该会话。适合周期报告等独立工作。 |
  | `new` | 每次投递开一个不同的新会话。适合每次都需全新上下文的任务。 |
  | 注：三值来自运行时 tool schema（已核对）；`new_once`/`new` 在 `schedule.json` 的落库形状本次**未实测**，勿据此推断字段细节。 |
- 返回规范任务视图（含 id，形如 `schedule-<uuid>`、`scheduledAt` UTC、`scheduledAtLocal` 本地）。

示例：
```
schedule_create(
  title="每日复盘",
  prompt="检查今日待办并汇总",
  rrule="DTSTART;TZID=Asia/Shanghai:20261121T090000\nRRULE:FREQ=DAILY;COUNT=1",
  target="this_session"
)
```

### `schedule_list(active?, limit?, offset?)`

列出任务（id / title / 目标时刻 / status / 投递模式）。`active` 过滤是否启用，`limit`（1–500，默认 100）+ `offset` 分页；省略参数返回全部。新建后必调，确认写入成功。停止/恢复任务用 `schedule_edit(..., active=...)`，不是独立工具。

### `schedule_edit(id, action, ...)`

按 `id` 修改或删除任务。`action` 二选一：

- `action="update"`：可带 `title` / `prompt` / `rrule` / `target` / `active`（至少给一个）；`expectedUpdatedAt` 传上次读到的 `updatedAt` 做乐观锁，任务若被改过则冲突、返回 `schedule_conflict` 且不生效。
- `action="delete"`：删除任务；已排队消息不撤回。
- 未知或匹配失败返回 `updated:false` 及原因。**自测任务验证完必须删掉**，避免污染用户存储。

### `schedule_view(id)`

按 `id` 查看单个任务详情（含 `updatedAt`、`scheduledAt`、`status`、`target`）。改任务前先 `view` 取 `updatedAt` 作 `expectedUpdatedAt`。

## 可见性核验（创建后按顺序做）

1. `schedule_list` 返回新任务 → 写入成功。
2. 检查 `C:\Users\Administrator\.dsh\storages\schedule.json`：新建任务行须含 `target`（含 `sessionId`）、`involvedSessionIds`、`status`、`title`、四位年份的 `scheduledAt`（均已由本会话 schedule.json:29-38 / 54-64 的 rrule 任务核验）。注意：这些字段样本来自 `target=this_session`；`new_once`/`new` 的 `target` 落库形状本次未实测，不适用本条字段清单，勿据此推断。旧的 `at` 形状记录可能缺 `target`。
3. 在 **`target` 指向的会话**打开 DSH Web 自动化任务列表，肉眼确认可见。UI 按 `target.sessionId` 过滤，缺 `target` 的旧记录会被丢弃。
4. 若 UI 仍不刷新，手动重载页面；改 JSON 不会触发 `schedule/changed` 事件。

## 常见失败速查

| 现象 | 原因 | 处理 |
|---|---|---|
| 工具列表没有 schedule_* | 预设禁用 / 会话冻结 | 启用 `tool-schedule`，重启 Web，新开会话 |
| 报 `subagent_session` | 子代理调用 | 改由主 agent 调 |
| `invalid_prompt` / `invalid_title` | title 缺失/空白/超 120，或 prompt 空 | 补 title、精简 prompt |
| `invalid_rrule` | rrule 非两段式 / 单位或 BY 部分不合法 / DTSTART 本地时间不存在 | 按两段式重写，见 create 的 rrule 说明 |
| 编辑冲突 / `updated:false` | `expectedUpdatedAt` 与当前不符（任务已被改） | 重新 `schedule_view` 取最新 `updatedAt` 再 edit |
| 创建成功但 Web 看不到 | 走了 schtasks/手写 JSON 等非 Web 通道；或记录缺 `target`/`involvedSessionIds`；或不在 `target` 指向的会话 | 用 `schedule_create` 重建，不要手改 JSON |
| 到点没执行 | Web 未运行 / 目标会话未被恢复 | 确认 3080 端口有监听、任务 status=active |

## 历史坑

- 2026-11-14 起 standard 预设曾给 `tool-schedule` 加 `disabled: true`，导致 agent 只能走非 Web 通道建任务、Web 看不到。
- 直接写 `schedule.json` 可能产生缺 `target` 的旧形状记录，UI 永久过滤；不要用手写 JSON 代替工具。
