import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateEscalationArgs } from 'file:///D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh-sandbox/lib/index.js';

// Lenient recovery for stray `justification` (no sandbox_permissions request).
// These are the ESCALATION_ARGS failures seen in today's sessions — the model
// sent `justification` as a free-text reason without escalating.
test('stray justification without sandbox_permissions is dropped, not rejected', () => {
  assert.doesNotThrow(() => validateEscalationArgs(undefined, 'typo reason'));
  assert.doesNotThrow(() => validateEscalationArgs(undefined, ''));
  assert.doesNotThrow(() => validateEscalationArgs(undefined, undefined));
});

test('genuine escalation still requires a non-empty justification', () => {
  // Permissions requested but no reason → still an error (real incomplete escalation).
  assert.throws(() => validateEscalationArgs('danger-full-access', undefined), /sandbox_permissions requires a justification/);
  // Permissions requested with an empty reason → still an error.
  assert.throws(() => validateEscalationArgs('danger-full-access', ''), /invalid justification: expected a non-empty sentence/);
  // Permissions requested with a real reason → allowed.
  assert.doesNotThrow(() => validateEscalationArgs('danger-full-access', 'one-shot retry of denied write'));
});
