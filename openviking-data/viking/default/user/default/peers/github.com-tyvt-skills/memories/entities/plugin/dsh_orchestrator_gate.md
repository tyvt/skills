# dsh-orchestrator-gate
DSH 本地插件（设计中，DESIGN.md 已迭代至 v4，代码未落地），强制所有对话走编排器。

## 功能
- `ctx.tools.guard(fn)` 工具执行前同步拦截，返回字符串即拒绝该次调用，模型收 `Error: <理由>`，守卫单调不可强放行
- 拦 5 类：全量 build/lint/vue-tsc、仓库根 grep、无 range 整读大文件、账单直查、大结果查询
- 根级 grep 放行唯一条件：`path` 指向具体模块目录（深度≥2 或 `moduleRoots` 白名单），`include` 不再单独放行
- 账单直查：进 guard 的 pwsh 命中即拦；子 ctx 由 §3.0 `delegationDepth>0` 处理
- eslint/tsc 轻量 argv 解析；tsc/vue-tsc 按 `-p` 工程级配置→拦，单文件→放行
- 必放行（B类）：orchestrate 本身、单文件 eslint、带 -p 的 tsc、编排器内部子 ctx（delegationDepth>0）；A类天然放行不列举

## 设计要点（v4）
- 拒绝文案给 `orchestrate {op, request}` 改法，绝不出现 bypass token
- 误伤缓解（§3.6）：匹配所有非 skip 执行段 + 词级 shell 解析（去词两侧配对引号得 argv）
- §3.6 skip 拆两份各管各规则：`buildLintNonExecHeads`（只管 §3.1）、`dataReadHeads`（只管 §3.4）；`cat`/`grep`/`Select-String` 同在两列表但作用域不同——让 §3.1 跳过却触发 §3.4
- 逃生舱改用户侧动作（改 config/对话显式授权降级为用户操作说明），§3.6-4 明确 guard 无感知机制；§7.5 明确逃生舱仅模型无 config 写权限时成立
- npm script 精确匹配 `build`/`lint` 及 `:` 变体，不碰 `rebuild`/`prebuild`；引号感知切段/切词（含 PowerShell `|` 右段独立检查）
- statSync 单文件判定（§3.1/§3.3b）：有 `cd`/`Set-Location`/`pushd` 前缀或非绝对路径→不做单文件放行（保守拦）；statSync 异常一律按非单文件→拦，绝不 fail-open
- §3.2 repoRoots 取不到时只拦明确根级形态（缺省/空/`.`），非空相对路径保守放行+计 errors
- 配置项：`matchAllExecutionSegments`(true)、`blockBareTsc`、`repoRoots`、`grepFailClosedWhenNoRepoRoot`(false)、`allowSingleFileTscNoEmit`(false=拦)
- §3.4 明确 `.sessions` 读取 argv 形态（首 token ∈ 读取类且 arg 含 `.sessions`）
- §4.1 `decideInterception` 只收布尔 `alreadyWholeRead`（记忆集读写外移 guard 回调），不再自称纯函数（无 IO、仅依赖入参）；counters 可注入（apply 第三参）
- §3.3b 补字节↔行数换算（`.vue` 60KB≈400~600 行）；`npx -y eslint` 先剥 `npx` 与 `-y` 前置选项再取 bin
- 保留"拒绝只是单次 `isError`、不阻塞 turn"软逃生
- fail-open 可观测（§4.1）：`counters.errors` + 超阈值告警
- 回滚：`enabled:false` 一键关；灰度：先 blockRootGrep→验证记忆集→blockWholeRead→子 ctx 实测→blockBuildLint
- 部署需重启 Web（同 cost-meter）；记忆集隔离：`exec.agent.session.header.id` 得 sessionId，per-session 无污染

## 已核实源码事实
- `delegationDepthOf(agent)` 读 `agent.session.header.delegationDepth`（dsh-subagent/lib/index.js L111-114）
- `pwsh` 参数名确为 `command`（dsh-tool-pwsh L466/L474）
- `exec.agent.session.header.id` 可得 sessionId（同 agent-guard 取法）

## 风险点
- 最大风险：真机实测 guard 是否拦掉编排器内部子 ctx pwsh 调用（§7-4）；`blockBuildLint` 默认不随首启开
- §7-5：逃生舱仅模型对 config 无写权限时成立，落地须实测
- 外壳包装绕过（`&`/`Start-Process`/`cmd /c`/`bash -c`/`pwsh -Command`/`.uild.ps1`）为已知边界、不覆盖（§6 列明）

## 关系与状态
- 机制参照 agent-guard（生产级 tools.guard 范例）
- 设计文档：dsh/orchestrator-gate/DESIGN.md（v4，三轮审查修订完成）
- 下一步按 §9 建四件套 + selftest（40+ 用例，优先覆盖 skip/§3.4 冲突、cd+eslint 路径基准、外壳包装回归基线）


<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_orchestrator_gate",
  "source_extraction_id": "67bab2da75494e65b900dd078abc0666",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "entities"
}
-->