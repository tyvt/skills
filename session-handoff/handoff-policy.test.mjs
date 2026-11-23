/** session-handoff 触发策略常驻测试。运行: node session-handoff/handoff-policy.test.mjs */
import assert from 'node:assert/strict';
import { POLICY, shouldHandoff } from './handoff-policy.mjs';

let pass = 0, fail = 0;
function t(name, fn) {
  try { fn(); pass++; console.log('  PASS', name); }
  catch (e) { fail++; console.log('  FAIL', name, '→', e.message); }
}

console.log('【1. 策略常量校验】');
t('步数阈值=150', () => assert.equal(POLICY.stepThreshold, 150));
t('每步未命中阈值=10000', () => assert.equal(POLICY.missPerStepThreshold, 10000));
t('压力阈值已移除', () => assert.equal(POLICY.pressureThreshold, null));

console.log('【2. 边界值判定】');
t('步数=149 不触发（仅步数）', () => {
  assert.equal(shouldHandoff({ steps: 149, uncachedInputTokens: 149 * 1000 }).trigger, false);
});
t('步数=150 触发', () => {
  const r = shouldHandoff({ steps: 150, uncachedInputTokens: 150 * 1000 });
  assert.equal(r.trigger, true);
  assert.ok(r.reasons.some(x => x.includes('steps=150')));
});
t('每步未命中=10000 不触发（严格大于）', () => {
  assert.equal(shouldHandoff({ steps: 10, uncachedInputTokens: 10000 * 10 }).trigger, false);
});
t('每步未命中=10001 触发', () => {
  const r = shouldHandoff({ steps: 10, uncachedInputTokens: 10001 * 10 });
  assert.equal(r.trigger, true);
  assert.ok(r.reasons.some(x => x.includes('perStepMiss')));
});
t('压力60%不再触发（死阈值已移除）', () => {
  assert.equal(shouldHandoff({ steps: 10, uncachedInputTokens: 10 * 1000, pressureTokens: 600, contextWindow: 1000 }).trigger, false);
});
t('双条件同时命中给出两条原因', () => {
  assert.equal(shouldHandoff({ steps: 200, uncachedInputTokens: 200 * 20000 }).reasons.length, 2);
});
t('steps=0 不除零', () => {
  assert.equal(shouldHandoff({ steps: 0, uncachedInputTokens: 0 }).trigger, false);
});

console.log('【3. 历史样本回放】');
// 样本摘要源于 1306 会话投影统计（p50/p75 分位），数值内嵌保证可重复
const samples = [
  { name: '健康会话(p50步64)', s: 64, u: 64 * 1745, expect: false },
  { name: '长会话(步248未超未命中阈值)', s: 248, u: 248 * 2000, expect: true },
  { name: '重算型(步25每步30k)', s: 25, u: 25 * 30000, expect: true },
  { name: '双高(步370每步7364)', s: 370, u: 370 * 7364, expect: true },
];
for (const x of samples) t(x.name, () => {
  assert.equal(shouldHandoff({ steps: x.s, uncachedInputTokens: x.u }).trigger, x.expect);
});

console.log(`\n结果: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
