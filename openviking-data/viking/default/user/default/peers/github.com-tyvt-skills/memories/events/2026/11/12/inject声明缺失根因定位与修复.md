# Summary
用户于 2026-11-12 定位 dsh-orchestrator-gate 插件未激活根因为 lib/index.js 第465行访问 ctx.tools.guard() 但未声明 inject=['tools']，cordis 抛异常致插件不激活；已将 inject 改为 ['tools']，同步 profile 副本，selftest 80 项通过，临时端口试启干净激活。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: Understood: you'll restart Web yourself; changes stay uncommitted in the workspace.

## 排查结论：真因是插件声明缺 `inject`

不是加载链路、不是 ACL、不是配置没写进去——**是插件代码里少声明了一个依赖**。

### 根因

`dsh/orchestrator-gate/lib/index.js` 里：

```js
export const inject = [];            // ❌ 空
...
const disposer = ctx?.tools?.guard?.((exec) => { ... })   // 第 465 行访问 ctx.tools
```

cordis 里访问 `ctx.tools` 这类服务，**必须先在 `inject` 里声明 `'tools'`**，否则在属性访问时就抛异常。独立试启时 stderr 打得很清楚：

```
dsh: warning: 1 entry did not activate
orchestrator-gate (dsh-orchestrator-gate): Error: cannot get property "tools" without inject
    at new apply (.../lib/index.js:465)
```

`apply` 抛错 → 插件不激活 → 守卫一条都没挂上，所以深度 1 的 `scripts` 被放行。这也解释了为什么 `web-restart.log` 里既没有插件名、也没有"加载失败"——它是"不激活"（warning），不是 bundle 被 skip。

对照佐证：`agent-guard`、`token-guard` 都写了 `inject = ['tools']`（它们也用 `ctx.tools`）；`cost-meter` 是 `[]` 但只订阅 `ctx.on(...)` 事件、不碰 `ctx.tools`，所以 `[]` 没问题。

### 已做的修复

- `lib/index.js`：`inject` 改为 `["tools"]`（并加了注释说明原因）。
- profile 里的副本 `~/.dsh/profiles/web/node_modules/dsh-orchestrator-gate/lib/index.js` 同步更新（这是真目录、非符号链接，服务器实际加载的是它）。两份 hash 一致。
- `selftest.mjs`：**80 项通过**。
- 独立试启（临时端口 3999）：**不再有 "did not activate"**，插件干净激活。
- 直接调 `decideInterception` 验证拦截矩阵：仓库根 grep / `scripts`(深度1) / 空路径 / `.` → 均返回 `[orchestrator-gate] ...` 拒绝；moduleRoot 深度≥2、`orchestrate` → 放行。**交接里失败的那条 `scripts` 深度 1 现在会被拦。**

### 关于 `cordis.patch.yml` 的 ACL（澄清一个误会）

我之前一度怀疑是拒绝 ACE 挡住了读取，**这个判断是错的，已排除**。我把原始 Deny 恢复回去了，实测它只挡 `Write`，**不挡读**——恢复后文件仍可读。所以那个拒绝项从来不是加载失败的原因，也和本 bug 无关；现在是"可读、可控地写"的约定状态。

### 未执行 / 待你做

- **未重启 Web**（按你选择，你自己手动重启 PID 21876）。重启后请验证：`grep D:\repository\skills\scripts` 的拒绝文案必须以 `[orchestrator-gate]` 开头才算生效。...

<!-- MEMORY_FIELDS
{
  "event_name": "inject声明缺失根因定位与修复",
  "goal": "定位并修复插件未激活",
  "summary": "用户于 2026-11-12 定位 dsh-orchestrator-gate 插件未激活根因为 lib/index.js 第465行访问 ctx.tools.guard() 但未声明 inject=['tools']，cordis 抛异常致插件不激活；已将 inject 改为 ['tools']，同步 profile 副本，selftest 80 项通过，临时端口试启干净激活。",
  "ranges": "0-13",
  "source_extraction_id": "3b0725ec0e2446acb56f746eba66ec55",
  "version": 1,
  "memory_type": "events"
}
-->