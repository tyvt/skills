# dsh-orchestrator-gate
DSH 本地门禁插件，在工具调用层强制重活走编排器并要求编码前先出计划。

## 目的
- 拦截本应走编排器的重活：全量 build/lint、根级 grep、大文件整读、账单绕过。
- 2026-11-12 新增 blockEditWithoutPlan：首次 edit/write 前必须 todo_write 出计划，否则拒绝，软强制编码/样式修改走编排口径。

## 实现
- 位于 D:\repository\skills\dsh\orchestrator-gate；部署至 ~/.dsh/orchestrator-gate（符号链接至源）与 node_modules/dsh-orchestrator-gate（独立物理副本，改动后需同步）。
- lib/index.js 为门禁核心，含 RULES、classifyGrep、classifyRead、decideInterception、apply 守卫；cordis.patch.yml 做 bundle 挂载。
- selftest.mjs 为测试基线，2026-11-12 改动后 99→110 checks 全过。

## 配置
- repoRoots: ["D:\repository\skills"]；2026-11-12 前仅白名单内仓库生效，改动后 classifyGrep 以 cwd 为基准，跨项目根级 grep 全拦。
- moduleRoots: ["src/views/", "dsh/"] 为深度豁免白名单。
- FULL_SCRIPTS 仅认 build/lint 精确名，test 不在集合（npm test 不被 block）。

## 部署状态
- 新指纹 d9a10f5d；重启后日志应现 orchestrator-gate loaded: fingerprint=d9a10f5d 作为加载凭证。
- 2026-11-12 源码已同步至 node_modules 副本（哈希核对一致），旧副本备份 index.js.bak-pregate-20261112。
- 待用户手动重启 DSH Web（PID 4872/port 3080）加载；改动落 git 仓库 dsh/orchestrator-gate/ 的 lib/index.js、selftest.mjs、cordis.patch.yml 未提交。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件",
  "name": "dsh_orchestrator_gate",
  "source_extraction_id": "00cd09d793eb4f668b37099abe249755",
  "version": 1,
  "memory_type": "entities"
}
-->