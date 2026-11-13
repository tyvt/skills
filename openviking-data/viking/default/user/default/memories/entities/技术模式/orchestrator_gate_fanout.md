# DSH orchestrator-gate 串行扇出拦截插件
DSH Web 的 orchestrator-gate 插件，用于拦截会话内串行扇出（连续整读/检索触发子代理扩散），实现于 2026-11-12。

## 核心规则
- RULES.blockSerialFanout 恒为 true（defineProperty 锁定）
- normalizeConfig 增加 fanoutStreakThreshold：整数 ≥3 合法、默认 5、非法一律回退
- 纯函数 classifyFanout(tool, streak, threshold)：达阈值返回改道文案（spawn_teammate / workflow / orchestrate 三条出路）

## 状态机与计数
- apply 内扇出状态机：既有规则先判被拒不改状态 → skipFanout 豁免 → orchestrate 直过清零两槽 → read/grep 分槽独立计数、第 5 次拒绝并清零本槽；非 fanout 工具清零两槽
- skipFanout：子代理豁免 + offset≥1&limit≥1 分页读豁免（只影响计数不绕过通用规则）
- 有界 Map：会话条目 500 封顶、O(1) 淘汰最旧
- 计数器 rejectedByTool + 日志 fanout-rejected session=%s tool=%s x%d

## 验证与部署
- 自测 node selftest.mjs：195 checks 全绿（原 110 保留，新增 classifyFanout 纯函数、阈值矩阵、13 系列用例、有界 Map、AGENTS.md 一致性）
- AGENTS.md「并行扇出（强制）」小节插入两份文件、MD5 一致 AE84D97D…、阈值字面量 5 == 默认值
- ~/.dsh/orchestrator-gate 为源码符号链接；部署指纹 rulesFingerprint=7d4a5962
- 改动保留工作区未提交；重启 DSH Web 后日志应出现 orchestrator-gate loaded: fingerprint=7d4a5962

## 可观测口径
- 按周统计 fanout-rejected，>50% 误拦 → 阈值 5→8，仍 >50% → 关闭规则

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "orchestrator_gate_fanout",
  "source_extraction_id": "c6e84dc317c54a77aad2cd1443b17280",
  "version": 1,
  "memory_type": "entities"
}
-->