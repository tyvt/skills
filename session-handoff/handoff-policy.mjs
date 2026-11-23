/**
 * 交接触发策略——基于 1306 个历史会话的统计推导
 * 数据来源: ~/.dsh/storages/session_projcache/sessions/session-*.json
 *
 * 推导依据:
 *  - 步数分布 p50=64 p75=118 p90=186 p95=248；高成本Top10%会话步数 p50=241
 *  - 每步未命中 p50=1745 p95=10702（>10k 恰为 p95，支持原"极高"定义）
 *  - 压力>60% 在 1301 个会话中触发 0 次（max=51%）—— 死阈值，移除
 *  - 召回/误报: 步数>=150 OR 每步>10k → 触发19.7%, 召回93.1%, 准确率47.5%
 *              原标准(>=100 OR >10k) → 触发36.2%, 召回100%, 准确率27.7%
 */

export const POLICY = {
  stepThreshold: 150,           // 原 100：误报减半，召回仅降 6.9pp
  missPerStepThreshold: 10000,  // 保持：p95=10702，数据支持
  pressureThreshold: null,      // 原 60%：历史 0 次触发，死阈值，删除
};

/** 判断是否触发交接。输入为会话快照指标，返回 {trigger, reasons[]} */
export function shouldHandoff({ steps, uncachedInputTokens, pressureTokens, contextWindow }) {
  const reasons = [];
  if (steps != null && steps >= POLICY.stepThreshold)
    reasons.push(`steps=${steps}>=${POLICY.stepThreshold}`);
  if (steps > 0 && uncachedInputTokens / steps > POLICY.missPerStepThreshold)
    reasons.push(`perStepMiss=${Math.round(uncachedInputTokens / steps)}>${POLICY.missPerStepThreshold}`);
  // 压力阈值已移除；仅当未来数据出现 >60% 样本时可重新评估
  if (POLICY.pressureThreshold != null && contextWindow > 0 &&
      pressureTokens / contextWindow * 100 > POLICY.pressureThreshold)
    reasons.push('pressure>' + POLICY.pressureThreshold + '%');
  return { trigger: reasons.length > 0, reasons };
}
