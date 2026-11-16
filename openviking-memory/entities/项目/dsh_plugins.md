# skills 仓库的 dsh 插件子模块
skills 仓库中的 dsh 目录（无 .gitmodules，不是经典子模块）（D:\repository\skills\dsh），承载 DSH 侧插件、补丁与插件链配置。

## 插件组成
- agent-guard：ask-guard.js 纯函数 + index.js + cordis.patch.yml，灰度 askGuard.mode:warn；exploration 规则原默认 enabled:false/mode:'off' 失实，2026-11-14 修复为 enabled:true/mode:'warn'（commit ba1fadce）
- 同仓含 cost-meter、plan-gate 与 zentao-analyzer/SKILL.md；langgraph-orchestrator 增 offtask 检测
- file_reader/code_editor 无本地读盘权限，唯一读盘途径是 pwsh

## 提交与补丁
- 2026-11-16 cost-meter 注入修复提交 99a0e514 推送 origin/main（仅 cost-meter/lib/index.js 与 selftest.mjs）；ls-remote 核对 SHA 一致，父仓无需更新 gitlink；orchestrator、agent-guard、orchestrator-gate、token-guard、plan-gate、mcp-gateway 六个插件均声明 inject=['tools']
- 2026-11-13 提 80512c00、39f162d0、c006aa92（link-plugins.ps1 junction 链 8 插件）、e7318dba 推 origin/main
- patches/openviking-audit-phaseA/：2026-11-13 提 a128d4ee 未推；关联 OV clone D:\repository\OpenViking worktree feat/ov-audit-phasea，基于 v0.5.3

## 状态表淘汰与自测
- Map 淘汰：agent-guard sessionReads/sessionAsks FIFO 200；cost-meter acc LRU 2000；orchestrator-gate sessionWholeReads FIFO 1000；dcwhc entries 200
- 各插件补淘汰断言 selftest：agent-guard 110/110、cost-meter 全 PASS、orchestrator-gate 195、dcwhc 79/79

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "dsh_plugins",
  "source_extraction_id": "bc770cd55b1d44cbbbac2f7efddbb30b",
  "version": 2,
  "memory_type": "entities"
}
-->