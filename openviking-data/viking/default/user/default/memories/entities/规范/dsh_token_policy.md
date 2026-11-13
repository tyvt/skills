# dsh-token-policy
DSH 会话降本规范，规定重活必须经由 orchestrate 编排器执行。

## 核心规则
- 大文件整读（orchestrator-gate 按字节阈值 40KB 拦截无 offset/limit 读取；token-guard 后置按 >300 行裁剪结果）应走 orchestrate
- 全量 lint/build（npm run build、pnpm build、tsc -b、bare tsc、eslint . 等）应走 orchestrate，由 blockBuildLint 控制
- 账单查询（.sessions 读取、cost_bill.py 执行）应走 orchestrate，由 blockBillingBypass 控制
- 单条窄命令可直接执行，不必走编排器

## 关系
- 由 dsh-orchestrator 插件提供 `orchestrate` 入口工具
- 实际强制由 dsh-orchestrator-gate 插件（ctx.tools.guard 预执行拦截）落地
- 与 dsh-cost-meter、dsh-token-guard 共同组成降本体系


<!-- MEMORY_FIELDS
{
  "category": "规范",
  "name": "dsh_token_policy",
  "source_extraction_id": "eb213da6abef4bf5ad6baac532f0e529",
  "version": 2,
  "memory_type": "entities"
}
-->