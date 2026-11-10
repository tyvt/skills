# 接入 DSH Web：dsh-orchestrator 插件

本目录的编排器已封装为 DSH host 工具插件 **dsh-orchestrator**，在 DSH 会话里暴露一个工具 `orchestrate`，agent 可像调普通工具一样驱动多模型编排。

## 组件

| 位置 | 作用 |
| --- | --- |
| `D:\repository\skills\dsh\orchestrator\` | 插件源码（git 仓库 `D:\repository\skills` 的 `dsh/` 下） |
| `lib/index.js` | 工具定义：向 `ctx.tools.register()` 注册 `orchestrate`，子进程调 Python |
| `lib/config.js` | 零依赖 Standard Schema 配置校验（projectDir/pythonExe/timeout/verbose） |
| `cordis.patch.yml` | bundle own patch，`insert` 一行 id=orchestrator |
| `selftest.mjs` | 离线自测：config / apply / op=list / op=tool |
| `src/jsonbridge.py`（本项目内） | Python 侧 JSON 桥：stdin 请求 → stdout 结果 |
| `src/api.py`（本项目内） | run_tool / run_full / list_tools 三个 API |

## 安装（已完成）

1. 插件目录软链到 `C:\Users\Administrator\.dsh\orchestrator` → `D:\repository\skills\dsh\orchestrator`
2. profile `package.json` 增加 `"dsh-orchestrator": "file:../../orchestrator"` 并加入 `dsh.profile.bundles`
3. `pnpm install`（已完成，node_modules 内已链接）
4. 校验：`node lib/bin.js --profile web --dump-config` 能看到 `id: orchestrator` 条目

## 生效：重启 DSH Web

插件在新进程启动时挂载。重启：

```powershell
# 停掉现有 web 进程 (pid 见 netstat 3080)，再重新起
dsh web
```

重启后新会话里会多出 `orchestrate` 工具，调用示例：

- `orchestrate({ "op": "list", "request": "x" })` → 列出工具与模型池
- `orchestrate({ "op": "tool", "tool": "planner", "request": "..." })` → 单工具(带降级)
- `orchestrate({ "op": "full", "request": "..." })` → 完整编排

## 配置项（cordis.patch.yml config）

- `pythonExe`：Python 解释器，默认 `python`
- `projectDir`：编排器项目根（含 `src/jsonbridge.py` 与 `config.yaml`）
- `timeoutMs`：单次调用超时，默认 300000
- `verbose`：是否把 trace/plan/steps 也回给模型，默认 false（省 token）
