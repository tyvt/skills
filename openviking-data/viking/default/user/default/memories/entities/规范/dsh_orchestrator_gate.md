# dsh-orchestrator-gate
DSH Web 进程内的预执行工具守卫插件，通过 ctx.tools.guard 拦截违规工具调用。

## 核心规则
- blockWholeRead: true（整读 >40KB 无 offset/limit 拦截，提示"整读超过字节阈值"）
- blockBillingBypass: true（拦截 cat/.sessions、Get-Content .sessions、python cost_bill.py 等账单直查）
- blockBuildLint: false（设计拦截面：npm/pnpm/yarn/bun run build|lint|typecheck 及 bare tsc/vue-tsc、eslint .；子代理豁免；2026-11-12 凌晨补全 bun 与 typecheck 家族，开关仍关）

## 豁免机制
- passThroughSubagents + delegationDepth>0：in-process 子代理（spawn_teammate）工具调用豁免，实测 Get-Content .sessions、仓库根 grep 均放行
- orchestrate 工具因跑在 Magpie 独立进程(PID 21580)不经此 guard

## 关系
- 与 dsh-token-guard 阶段不同：gate 预执行拦截，token-guard 后置结果裁剪

## 守卫回调签名
- ctx.tools.guard((exec) => {...}) 为同步守卫：返回字符串则拒绝该工具调用（字符串反馈给模型），返回 undefined 则放行
- exec.name = 工具名，exec.arguments = 参数，exec.agent.session.header.id = 会话 id
- 守卫闭包可通过 exec.agent.session.header.id 读取对应会话的 acc 状态（如 bigMissStreak），实现按会话的拦截逻辑

<!-- MEMORY_FIELDS
{
  "category": "规范",
  "name": "dsh_orchestrator_gate",
  "source_extraction_id": "4db6c3cf3de54d18b634401b9d361f6d",
  "version": 3,
  "memory_type": "entities"
}
-->