---
name: dsh-schedule-task
description: 在 DSH Web 里创建/列出/修改/删除自动化（定时）任务，并确保任务在 Web 任务列表可见。当需要定时提醒、周期检查、到点自动跑 agent 时使用。
---

# DSH Web 自动化任务（schedule）

用 DSH Web 内建的 `schedule_*` 工具创建**宿主持久化任务**：到点后宿主恢复原会话并把 prompt 投递给 agent。任务存在 `C:\Users\Administrator\.dsh\storages\schedule.json`，随 Web 重启保留。

## 何时用

- 需要「N 秒后 / 指定时刻 / 每隔 N 秒 / 每天 / 每周 / cron」自动触发一段 agent 指令。
- 需要任务出现在 DSH Web 的自动化任务列表里、可在 Web 上查看/暂停/删除。

## 前置（务必先确认，否则建了 Web 也看不到）

1. **当前会话必须有 schedule 工具**：工具目录里应能看到 `schedule_create`、`schedule_list`、`schedule_update`、`schedule_delete`。没有就不要退而求其次用 `schtasks`/写文件——那些不进 DSH Web 存储，Web 必然看不到。
2. **会话工具表在会话创建时冻结**：改预设配置后必须**重启 DSH Web + 新开会话**才生效；当前会话不会热加载新工具。
3. **standard 预设须已启用 `tool-schedule`**：配置在 `C:\Users\Administrator\.dsh\profiles\web\cordis.patch.yml` 的 `preset-standard` 插件列表，`tool-schedule` 下不应有 `disabled: true`（`full-tools` 预设亦无此禁用）。
4. **必须由主 agent 调用**：工具显式拒绝 delegated subagent（`subagent_session`），子代理建不了。
5. **任务绑定调用方 Session**：在哪个会话创建，就在哪个会话的 Web 视图可见/投递；换会话看不到属预期行为。

## 四个工具

### `schedule_create(prompt, title, <一个选择器>)`

- `prompt`：非空指令文本。
- `title`：非空、去空白后 ≤120 字符；不会从 prompt 派生，必须显式给。
- **六个选择器只能给一个**：

| 选择器 | 示例 | 语义 |
|---|---|---|
| `after_seconds` | `{"prompt":"检查构建","title":"构建检查","after_seconds":600}` | 正整数秒延迟 |
| `at` | `{"prompt":"复查发布","title":"发布复查","at":"2099-01-01T09:00:00+08:00"}` | 严格未来的绝对时刻（带时区） |
| `every_seconds` | `{"prompt":"查队列","title":"队列巡检","every_seconds":300}` | 固定间隔，最小 60 秒 |
| `daily` | `{"prompt":"日报","title":"每日复盘","daily":{"time":"23:00:00","time_zone":"Asia/Shanghai"}}` | 每天本地钟表时间 |
| `weekly` | `{"prompt":"周报","title":"每周复盘","weekly":{"time":"09:00:00","time_zone":"Asia/Shanghai","weekdays":[1,3]}}` | 每周；weekdays 1=周一…7=周日 |
| `cron` | `{"prompt":"查部署","title":"部署巡检","cron":{"expression":"*/15 9-17 * * 1-5","time_zone":"Asia/Shanghai"}}` | 五字段 Vixie cron |

返回规范任务视图（含 id，形如 `schedule-<uuid>`）。`at`/daily/weekly/cron 的目标时刻必须严格晚于当前时间。

### `schedule_list()`

列出**当前 Session** 的活动任务（id / title / UTC 目标时刻 / status / 投递模式）。新建后必调，确认写入成功。

### `schedule_update(id, <title|prompt|一个选择器>)`

原地改名称、指令或时间；id 不变。`after_seconds` 仅限创建时使用，不能用于更新。未知或已结束任务返回 `updated:false` 及原因。

### `schedule_delete(id)`

删除保留的任务（活动或已结束）。未知/已删除返回 `deleted:false`。**自测任务验证完必须删掉**，避免污染用户存储。

## 可见性核验（创建后按顺序做）

1. `schedule_list` 返回新任务 → 写入成功。
2. 检查 `C:\Users\Administrator\.dsh\storages\schedule.json`：新行须含 `target`（含 `sessionId`）、`involvedSessionIds`、`status`、`title`、四位年份的 `scheduledAt`。
3. 在**创建该任务的同一会话**打开 DSH Web 自动化任务列表，肉眼确认可见。UI 按 `target.sessionId` 过滤，缺 `target` 的旧记录会被丢弃。
4. 若 UI 仍不刷新，手动重载页面；改 JSON 不会触发 `schedule/changed` 事件。

## 常见失败速查

| 现象 | 原因 | 处理 |
|---|---|---|
| 工具列表没有 schedule_* | 预设禁用 / 会话冻结 | 启用 `tool-schedule`，重启 Web，新开会话 |
| 报 `subagent_session` | 子代理调用 | 改由主 agent 调 |
| `invalid_prompt` | title 缺失/空白/超 120，或 prompt 空 | 补 title、精简 prompt |
| 创建成功但 Web 看不到 | 走了 schtasks/手写 JSON 等非 Web 通道；或记录缺 `target`/`involvedSessionIds`；或不在同一会话 | 用 `schedule_create` 重建，不要手改 JSON |
| 到点没执行 | Web 未运行 / 会话未被恢复 | 确认 3080 端口有监听、任务 status=active |

## 历史坑

- 2026-11-14 起 standard 预设曾给 `tool-schedule` 加 `disabled: true`，导致 agent 只能走非 Web 通道建任务、Web 看不到。
- 直接写 `schedule.json` 可能产生缺 `target` 的旧形状记录，UI 永久过滤；不要用手写 JSON 代替工具。
