# agent-guard
DSH 的 host plane 事前拦截插件，symlinked 到 ~/.dsh/agent-guard（源仓 skills/dsh/agent-guard）。

## Description
- 唯一可靠拦截点 ctx.tools.guard（host plane，跨 plane 事件收不到）
- 规则纯函数在 rules.js，selftest.mjs 可扩展断言
- 已有 scope/重复整读/ask-guard 三条拦截先例（warn→block 灰度 + ledger + promote 脚本模式成熟）

## 探索漂移规则（2026-11-13 新增，commit 5ff47355）
- 整读门槛：已知 >300 行无范围 read 拒绝；行数未知首读注入 limit:60 探针，同文件第 2 次无范围整读拒绝
- 重复盲搜熔断：同 pattern 连续第 3 次 grep 拒绝
- 未知根试错：60s 内无 path 同 pattern glob 第 2 次拒绝
- 子代理豁免：header.parentSession 存在（dsh-session/index.js:1051）的派生会话整体豁免
- sessionDrift Map 带 LRU 200 会话上限
- 全部拒绝带 [explore-drift:BLOCKED] 前缀 + 可执行改法，落 ledger

## 配置
- cordis.patch.yml 启用 warn 灰度；promote 门槛 warn ≥2 天且 ≥20 条中误拦 <10% 才切 block
- config.js 加 exploration 默认值与校验，非法 mode 回退 off

## 坏账修复规则（2026-11-13 新增，commit ce99ed19，8 文件仅提交未推送）
- 报错文案改造（Fix1）：pwshHint 从原命令抽目标目录，回填可直接粘贴的 `Get-ChildItem -Path <dir> -Filter *.ext` 与 glob 模板；glob/grep 拒绝文案把占位符换为真实 path
- 新增 warnForegroundBuild 规则（Fix2，warn 灰度不阻断）：词边界匹配 build/test/pytest/vite 等；&/Start-Job/*> 后台写法放行、管道仍告警；AGENTS.md 同步补「>30s 前台长任务禁止直跑」硬约束
- selftest 用例同步扩展至 110/110

## 部署与加载（2026-11-13 核实）
- ~/.dsh/agent-guard 为 symlink 指向仓库 skills/dsh/agent-guard；web profile 的 node_modules/dsh-agent-guard 为 junction 指向同一仓库源码
- 纯 ESM .js，无 dist、无 build 脚本，改源码即唯一副本
- link-plugins.ps1 为官方重链脚本，提示「改完插件源码后需重启 dsh web 才生效」；实测 8/8 插件已正确链接
- 运行期 dsh web 进程（如 PID 21812）内存持有启动时所加载模块，改源码后须重启 dsh web 才重载

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "agent_guard",
  "source_extraction_id": "1f83d0304910428f84b590e95550fc4d",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->