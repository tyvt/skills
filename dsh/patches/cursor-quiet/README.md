# Cursor「went quiet」静默重试补丁

## 现象

用 Cursor 通道（`composer-2.5` 等）时偶发整轮失败，客户端只看到一句：

```
Cursor went quiet: 24 heartbeats and nothing else for 240 s, its last message checkpoint (try again)
```

## 根因

- 报错来自插件 `@magpie-community/opencode-cursor-auth` 的 `native-session.mjs`：Cursor 后端的 Run 只发心跳、240 秒没有任何内容，插件看门狗（`NATIVE_LIMITS.quiet = 240_000`）主动中断并抛出 `502 {quiet:true}`。
- 心跳说明连接没断，是 Cursor 服务端在「假活」。**客户端没有任何配置能阻止它发生**，插件自己的文案就是「(try again)」——上游的预期是调用方重试。
- 因此「永久解决」只能做到两件事：
  1. **自动重试**，让用户完全看不到这个失败；
  2. **补丁不丢**，插件升级/重装后自动重新打上。

## 方案

两层，互不依赖：

### 1. 重试包装器（`cursor-quiet-retry.mjs`）

把插件的 `answer` 包一层：`kept(await quietRetry(() => answerOf(...), { signal }))`。

- **只在「什么都没输出」时重试**。这是关键：SSE 流已经往客户端吐过内容后再重试，会重复输出。
  - 判定按 SSE 帧粒度（`\n\n` 分帧）：只含 `role` 的帧不算内容；出现 `content` / `reasoning_content` / `tool_calls` / `finish_reason` / `message` 才算已输出。
  - 一旦已输出，quiet 错误照原样透传（保持插件原行为）。
- **流式不受影响**：帧读到就转发，不做整体缓冲（v1 那种 `await response.text()` 会毁掉流式和首字延迟，已废弃）。
- 非流式（JSON）路径同理：quiet 的 502 才重试，其它错误原样返回。
- 重试失败时：JSON 路径返回最后一次的错误；SSE 路径在流里补一帧 `data: {"error":{...}}`，客户端仍能拿到错误信息。

### 2. 自动重新打补丁（Windows 计划任务）

插件是 npm 包，`magpie` 更新插件时会整包覆盖，补丁必然丢（2026-10-29 18:58 就这样丢过一次）。所以：

- 计划任务 `dsh-cursor-quiet-reapply`：**登录时 + 每 5 分钟**跑一次 `reapply.mjs`，同时重打两处：① `index.mjs` 的静默重试；② `native-session.mjs` 的 `quiet` 看门狗阈值（240 s → 600 s，见 `patch-quiet.mjs`）。
- 用 `wscript.exe` 拉起 VBS 隐藏窗口，不闪黑框；`reapply.mjs` 幂等，状态没变时**不写文件、不写日志**。
- 插件版本不认识（锚点找不到）时**拒绝写入**，只记日志，不会把插件改坏。
- 恢复：`node install.mjs --restore`（用 `index.mjs.orig-cursor-quiet` 还原）。

## 文件

| 文件 | 作用 |
| --- | --- |
| `cursor-quiet-retry.mjs` | 重试包装器（会被复制进插件目录） |
| `install.mjs` | 打补丁 / 检查 / 还原。`--check` 退出码：0=已打，3=未打，1=版本不认识 |
| `reapply.mjs` | 计划任务入口，幂等重打（重试 + quiet 阈值） |
| `patch-quiet.mjs` | 把 `native-session.mjs` 的 `quiet` 看门狗抬到 600 s（幂等，`--check`/`--restore`） |
| `integration.mjs` | 用真实已装插件 + 桩 Cursor 传输，验证「quiet → 自动重试 → 只输出一份」 |
| `cursor-quiet-retry.test.mjs` | 包装器单测（`node --test`，12 例） |
| `install-task.ps1` | 注册计划任务（`-IntervalMinutes` 可改周期） |
| `uninstall-task.ps1` | 删除计划任务 |
| `apply.log` | 打补丁 / 还原 / 出错记录 |

插件目录：`~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/`
（补丁写入 `index.mjs`，新增 `cursor-quiet-retry.mjs`，备份 `index.mjs.orig-cursor-quiet`）

## 常用命令

```powershell
cd ~/.dsh/patches/cursor-quiet
node install.mjs            # 打补丁（幂等）
node install.mjs --check    # 看状态
node install.mjs --restore  # 还原插件
node patch-quiet.mjs         # 把 quiet 看门狗抬到 600 s（幂等，已抬则无操作）
node patch-quiet.mjs --check # 看 quiet 是否已抬
node patch-quiet.mjs --restore # 还原 native-session.mjs 的 quiet 值
node --test cursor-quiet-retry.test.mjs
node integration.mjs        # 需先 install
.\install-task.ps1          # 注册自动重打
.\uninstall-task.ps1        # 取消自动重打
```

## 可调参数

| 环境变量 | 默认 | 说明 |
| --- | --- | --- |
| `CURSOR_QUIET_ATTEMPTS` | `3` | 最多尝试次数（含首次） |
| `CURSOR_QUIET_BACKOFF_MS` | `1500` | 每次重试前等待毫秒 |

## 生效条件

补丁改的是磁盘上的插件文件，**运行中的插件宿主（`magpie-bun.exe` 跑 `~/.cache/magpie/plugin-host/host-*.js`）已经把旧代码读进内存**。所以打完补丁后必须让 Magpie 重启一次（托盘 → 退出/重启，或重开 Magpie 拉起的客户端），补丁才生效；此后由计划任务保证它不再丢。

## 局限

- 治标不治本：真正修好要 Cursor 后端不再「只发心跳不吐内容」，或插件上游把重试做进 `Quiet` 看门狗本身（`yetone/magpie#2672` 是相关 issue）。
- 每次重试都是新的 Run，失败三次仍会报错（只是概率大幅下降）。
- 重试只在「零输出」时发生，所以不会产生重复内容，也不会掩盖「已输出后中断」的真实故障。

## 旧版本说明

`~/Documents/deepseek-harness/` 下的 `cursor-quiet-retry.mjs`、`install-cursor-quiet-retry.mjs`、
`cursor-quiet-retry.test.mjs`、`verify-cursor-quiet-entry.mjs` 是 v1（整包缓冲，毁流式），已废弃，请勿再使用。
