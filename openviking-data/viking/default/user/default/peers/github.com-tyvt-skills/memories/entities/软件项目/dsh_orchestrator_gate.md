# dsh-orchestrator-gate 插件
DSH 编排网关零依赖插件，按设计稿 v9 落地（2026-11-12 编码四件套）。

## 功能配置
- 四条规则（blockRootGrep/blockWholeRead/blockBillingBypass/blockBuildLint）开关硬编码在 lib/index.js 的 RULES，config 仅留 enabled 总开关与阈值，同名字段不生效
- 规则状态（2026-11-12 第三阶段）：四项均为 true；repoRoots 仅 D:\repository\skills，moduleRoots 为 src/views/、dsh/，grepMinDepth=2
- 插件经 web profile 以 file:../../orchestrator-gate 接入，运行进程直接加载本仓库更新源码；cordis.patch.yml 用 icacls /deny (W) 锁只读，模型无法改 enabled
- 外壳包装（cmd /c、pwsh -Command、& npm run build、.\build.ps1）不拦截，仅计 shellWrapped 写 warn 日志

## 安全边界与豁免
- 拦截式非路由式：gate 仅拦下命中调用并提示改用 orchestrate，不自动转发（2026-11-12 用户确认不改代码维持现状）
- M1 豁免：orchestrate 跑在 Magpie 独立进程（PID 21580）不经本 guard；in-process 子上下文（delegationDepth>0）放行，47KB 整读由 token-guard 按 >300 行拦
- passThroughSubagents:true 且 isSubagent 时 decideInterception 提前返回 null 无条件放行子代理
- 已知边界：单文件 eslint 后接管道/复合命令因多 token 被判「非绝对路径」误拦；干净单文件正常放行

## 当前状态与重启
- 根因修复：lib/index.js 第 465 行 inject 为空致插件不激活，已修复为 inject=['tools']
- 多轮重启：PID 21876→15188（10:23:17）→16488（10:30:47，四规则全 true）→26124（11:16:36，用户最新重启）；两份 lib/index.js 同步、hash 一致
- 第三阶段开启 blockBuildLint：npm run build/tsc -b/eslint . 均被拦，单文件 eslint 放行；零依赖无 build，验证即 selftest，修改需重启 DSH Web 方生效
- 提交记录（本地未推送）：9acaf317→82f4e405→845d7f7c（「feat(orchestrator-gate): 开启账单/整读/构建三条硬门禁」）
- 早期 bun 缺口补全：bun/bunx 纳 BINS，classifyBuild 把 bun run 同等处理，typecheck/tsc/vue-tsc 入 FULL_SCRIPTS；selftest 76→99→回落 80

## 实测结论
- 用户实测 grep 打 D:\repository\skills\scripts（深度1）被 [orchestrator-gate] 拦截，证插件激活；mine/index.vue（356行）整读未拦因阈值按字节（普通40KB/.vue 60KB），<60KB 本就放行
- 重启验证指纹 source_fingerprint=56cca912（期望值）；必拦仓库根 grep 弹 [orchestrator-gate]，必放 npm run typecheck 走 npm 报 Missing script（证 P2 回退生效）
- DESIGN §10.3 三段式 checklist（commit 77631cdd）用于重启后验证，含止损条件

## 2026-11-12 P1/P2 修复
- orchestrator-gate/lib/index.js 的 reason() 拒绝提示新增：明确「执行命令必须用 op:full（真实 _run_pwsh），op:tool 只做文本加工不执行 pwsh」；grep hint 改为「真实执行 Select-String/rg 返回命中」
- langgraph-orchestrator/config.yaml 的 pwsh 工具 description 增加【重要】标注：真实执行只在 op:full，op:tool 不执行
- 验证：orchestrator-gate selftest.mjs → 110 checks 通过；config.yaml 合法、模型池未动；两处均为可逆文本改动无需重启 Web

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "dsh_orchestrator_gate",
  "source_extraction_id": "126e610f4e3542618cf613d408628d6e",
  "peer_id": "github.com-tyvt-skills",
  "version": 10,
  "memory_type": "entities"
}
-->