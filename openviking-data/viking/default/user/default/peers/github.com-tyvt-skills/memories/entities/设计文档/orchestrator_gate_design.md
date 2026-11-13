# dsh-orchestrator-gate 设计文档
路径 dsh/orchestrator-gate/DESIGN.md，经八轮审查迭代至 v9（2026-11-12 准备进入编码）。

## 核心机制
- 通过 ctx.tools.guard() 在每次工具执行前拦截重活工具，返回拒绝理由引导改用 orchestrate。
- 方案 A+B 并用：config 只读锁 + 核心规则硬编码（模型不可关），保留 enabled 回滚。

## 关键设计决策
- 两份 skip 列表：buildLintNonExecHeads（纯打印段）与 dataReadHeads（读取类）。
- cd 链跟踪：维护 currentPath 精确判定，初始 currentPath = exec.cwd ?? repoRoot ?? null；绝对路径按平台判定；覆盖 pwsh/bash/terminal。
- 查找类豁免：搜索类 head 且 cost_bill.py 仅在条件值里→放行；含 -exec 则拦。
- 选项豁免：构建 bin 白名单仅 --version/--help 放行；npm run <script> --version 不适用。
- 外壳包装改为放行但 counters.shellWrapped++ 并 log.warn。
- §3.4 注明 cd 失败固有限制接受。

## 实测与用例
- 待真机实测：M1 子 ctx、M4 exec cwd、§7.5 config 写权限。
- blockBuildLint 默认不随首启开，等 M1/M4 实测通过再开；blockRootGrep 先灰度。
- selftest 用例 S1~S5（40+）：覆盖 cd .sessions 猫 bill、echo 包裹、find -exec、eslint --version、ForEach-Object 脚本块等。
- 八轮评审收敛：v9 全修 ForEach-Object 绕过、cost_bill.py 搜索误拦、currentPath 初始化顺序等问题，停止纸面迭代进入编码四件套。

## 重启验证清单
- §10.3 于 2026-11-12 新增三段式重启验证 checklist（看指纹/必拦/必放），含止损条件（指纹不符就停、没弹 [orchestrator-gate] 就停），commit 77631cdd
- 目的：挡住"重启了但插件加载失败"的静默故障；各步约 30 秒
- 2026-11-12 重启后按此清单实测通过：新进程 PID 17868（12:33:59 启动）、部署指纹 d9a10f5d、plan-gate 必拦必放、苏住房G 根 grep 必拦、深模块 grep 放行

<!-- MEMORY_FIELDS
{
  "category": "设计文档",
  "name": "orchestrator_gate_design",
  "source_extraction_id": "b74a9eb9773a44629d09b537704be796",
  "peer_id": "github.com-tyvt-skills",
  "version": 8,
  "memory_type": "entities"
}
-->