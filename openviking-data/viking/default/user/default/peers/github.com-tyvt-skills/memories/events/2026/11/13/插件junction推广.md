# Summary
2026-11-13 用户指令「现在就执行推广」，助手用 link-plugins.ps1 将 8 个插件（dsh-orchestrator、dsh-agent-guard、dsh-cost-meter、dsh-mcp-gateway、dsh-orchestrator-gate、dsh-token-guard、dsh-token-models、dsh-channel-wechat-companion 映射 dcwhc）建立 junction 至 dsh/<name>，全部 package.json 与 main 入口可解析（dsh-context 为 npm 包未纳入）；脚本默认全量且幂等；cordis.patch.yml 无硬编码旧路径；改动未提交。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 现在就执行推广
**assistant [peer=github.com-tyvt-skills]**: 正在推广到所有本地插件。先以 dry run 模式确认哪些插件会被处理。
**assistant [peer=github.com-tyvt-skills]**: pwsh 把逗号分隔的列表当成了单个字符串。这是 pwsh 调用时的参数解析问题，用数组传参即可。
**assistant [peer=github.com-tyvt-skills]**: 8 个都识别正确，`dcwhc → dsh-channel-wechat-companion` 的名称映射也生效了。执行：
**assistant [peer=github.com-tyvt-skills]**: 8 个 junction 全部就位。现在验证每个目标都能正常解析。
**assistant [peer=github.com-tyvt-skills]**: 8 个包的入口全部可解析。现在把默认插件列表更新到脚本里，并检查 `cordis.patch.yml` 里是否还有指向旧实体目录的硬编码路径。
**assistant [peer=github.com-tyvt-skills]**: 脚本具备幂等性：重复运行时全部跳过，不会重建。最后确认 `cordis.patch.yml` 里没有指向旧路径的硬编码。
**assistant [peer=github.com-tyvt-skills]**: 没有硬编码路径依赖。推广完成。

## 推广结果

| 插件 | junction 目标 |
|---|---|
| `dsh-orchestrator` | `dsh\orchestrator` |
| `dsh-agent-guard` | `dsh\agent-guard` |
| `dsh-cost-meter` | `dsh\cost-meter` |
| `dsh-mcp-gateway` | `dsh\mcp-gateway` |
| `dsh-orchestrator-gate` | `dsh\orchestrator-gate` |
| `dsh-token-guard` | `dsh\token-guard` |
| `dsh-token-models` | `dsh\token-models` |
| `dsh-channel-wechat-companion` | `dsh\dcwhc`（名称映射生效） |

全部 8 个的 `package.json` 和 `main` 入口均可解析。`dsh-context` 是 npm 包，不动。

脚本默认值已更新为这 8 个，且**幂等**——重复跑只跳过、不重建。

## 顺带修掉的一个脚本问题

第一次用 `-Plugins orchestrator,agent-guard,...` 跑时，pwsh 把整串当成了**单个字符串**，报“源码目录不存在”。这是 pwsh 调用外部脚本时 `-File` 模式的参数解析特性，不是脚本缺陷。正确写法：

```powershell
& .\link-plugins.ps1 -Plugins @('orchestrator','agent-guard')
```

不传 `-Plugins` 时用默认全量，避开了这个坑。

## 现在需要你重启

理由和上次一样：junction 只是换了文件来源，Node 仍是启动时加载进内存。而且这次还带着 `renderResult` 的补丁（显示工作目录 + 来源）。

```powershell
pwsh -NoProfile -File "C:\Users\Administrator\.dsh\restart-web.ps1"
```

重启后建议验证两件事：
1. `orchestrate {op:"full", request:"列出当前目录文件"}` 开头应多出一行 `工作目录: ... (project_cwd)`
2. 其他插件功能正常（`mcp_gateway`、token 面板、agent-guard 拦截都还在）

## 待提交

本次未提交的改动：

- `dsh/scripts/link-plugins.ps1`（新建）
- `dsh/orchestrator/lib/index.js`（`renderResult` 显示 workdir 来源）

按你之前选的“仅提交”，要我现在提交吗？还是等你重启验证完再一起提交？

我建议等你验证完再提交——万一显示格式要调整，现在提交会多一次返工。

<!-- MEMORY_FIELDS
{
  "event_name": "插件junction推广",
  "goal": "推广插件junction链接",
  "summary": "2026-11-13 用户指令「现在就执行推广」，助手用 link-plugins.ps1 将 8 个插件（dsh-orchestrator、dsh-agent-guard、dsh-cost-meter、dsh-mcp-gateway、dsh-orchestrator-gate、dsh-token-guard、dsh-token-models、dsh-channel-wechat-companion 映射 dcwhc）建立 junction 至 dsh/<name>，全部 package.json 与 main 入口可解析（dsh-context 为 npm 包未纳入）；脚本默认全量且幂等；cordis.patch.yml 无硬编码旧路径；改动未提交。",
  "ranges": "36-62",
  "source_extraction_id": "4d027f7ccfcf4ac5a6f6235223808946",
  "version": 1,
  "memory_type": "events"
}
-->