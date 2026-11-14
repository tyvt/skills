# agent-guard
DSH 的 host plane 事前拦截插件，symlinked 到 ~/.dsh/agent-guard（源仓 skills/dsh/agent-guard）。

## Description
- 唯一可靠拦截点 ctx.tools.guard（host plane，跨 plane 事件收不到）
- 纯 ESM .js，无 dist/无 build 脚本，改源码即唯一副本；规则纯函数在 rules.js，selftest.mjs 可扩展断言
- 已有 scope/重复整读/ask-guard 三条拦截先例（warn→block 灰度 + ledger + promote 脚本模式成熟）

## 探索漂移规则
- 规则层 decideExplorationDrift 只产出 block/pass；warn 与 block 的差别由上层 index.js 按 config.mode 处置（2026-11-14 核实）
- 整读门槛：token-guard 前置层（[token-guard] 前缀）先硬拦 >300 行无范围 read；agent-guard 首读注入 limit:60 探针仅对 ≤300 行整读生效，同文件第 2 次无范围整读拒绝
- 重复盲搜：同 pattern 连续第 3 次 grep 拒绝；未知根：60s 内无 path 同 pattern glob 第 2 次拒绝
- 子代理豁免：header.parentSession 存在（dsh-session/index.js:1051）整体豁免，规则层第一道即 return（rules.js:709）
- pwsh 逃生通道：函数只接 read/grep/glob，pwsh 进 guard 回调后尾兜底 pass；近似但不相同的 pwsh 盲搜靠 AGENTS.md + cost-meter 覆盖
- sessionDrift Map 带 LRU 200 会话上限；全部拒绝带 [explore-drift:BLOCKED] 前缀 + 可执行改法并入 ledger
- 防御层级（2026-11-13 重启实测）：token-guard 硬拦 >300 行整读居首，宿主反重复 hook（同参数重试拦截，不限工具）居中，agent-guard explore-drift 为末层 warn 记账

## 处置与落账（index.js）
- L271 config.exploration?.enabled 门：置 true 后探索检查才真正进入
- L306 subagent: isSubagentSession(exec)；L313 仅 mode==='block' 才 return d.message 真拒，warn 走 L314 只记 ledger 放行不阻断
- appendLedger 会写入 mode 字段（ledger 中已有 mode:"warn" 的 explore-drift 记录，含 subagent/mode/message）

## 配置
- 2026-11-14 修复默认值失实：DEFAULTS.exploration 由 enabled:false/mode:'off' 改为 enabled:true/mode:'warn'（commit ba1fadce）
- cordis.patch.yml 启用 warn 灰度；promote 门槛 warn ≥2 天且 ≥20 条中误拦 <10% 才切 block
- config.js 加 exploration 默认值与校验，非法 mode 回退 off

## 坏账修复规则（2026-11-13，commit ce99ed19，8 文件仅提交未推送）
- Fix1 报错文案：pwshHint 从原命令抽目标目录回填可直接粘贴的 `Get-ChildItem -Path <dir> -Filter *.ext` 与 glob 模板；glob/grep 拒绝文案把占位符换为真实 path
- Fix2 warnForegroundBuild（warn 灰度不阻断）：词边界匹配 build/test/pytest/vite；&/Start-Job/*> 后台写法放行、管道仍告警；AGENTS.md 同步补「>30s 前台长任务禁止直跑」
- selftest 扩至 110/110；2026-11-14 验证 selftest 110 passed + integration-test 16 passed 全绿，覆盖探索三规则与子代理豁免用例

## 部署与加载（2026-11-13 核实）
- ~/.dsh/agent-guard 为 symlink 指向仓库 skills/dsh/agent-guard；web profile 的 node_modules/dsh-agent-guard 为 junction 指向同一仓库源码
- link-plugins.ps1 为官方重链脚本，提示改完插件源码后需重启 dsh web 才生效；实测 8/8 插件已正确链接
- 运行期 dsh web 进程（如 PID 21812）内存持有启动时所加载模块，改源码后须重启 dsh web 才重载

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "agent_guard",
  "source_extraction_id": "6fab7192bb714486af1d46158e4f4200",
  "peer_id": "github.com-tyvt-skills",
  "version": 5,
  "memory_type": "entities"
}
-->