#!/usr/bin/env node
// Offline batch acceptance. Each child inherits stdio; failures propagate.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const pythonRoot = path.join(root, 'dsh/langgraph-orchestrator');
const requested = process.argv[process.argv.indexOf('--batch') + 1] || 'all';
const batches = {
  '1': [['python', ['-m', 'pytest', 'tests/test_execution_p0.py', 'tests/test_bridge_p0.py', '-q'], pythonRoot], ['node', ['dsh/orchestrator/selftest.mjs'], root]],
  '2': [['python', ['-m', 'pytest', 'tests/test_plan_versions_p0.py', 'tests/test_plan_review_p0.py', '-q'], pythonRoot], ['node', ['dsh/plan-gate/selftest.mjs'], root]],
  '3': ['shared', 'agent-guard', 'token-guard', 'orchestrator-gate'].map(p => ['node', [`dsh/${p}/selftest.mjs`], root]),
  '4': [['node', ['dsh/cost-meter/selftest.mjs'], root], ['node', ['dsh/scripts/test-preflight-p0.mjs'], root]],
};
if (requested !== 'all' && !batches[requested]) { console.error('Usage: --batch all|1|2|3|4'); process.exit(2); }
const results = [];
const state = path.join(root, '.task-state');
fs.mkdirSync(state, { recursive: true });
for (const [batch, checks] of Object.entries(batches)) {
  if (requested !== 'all' && requested !== batch) continue;
  for (const [program, args, cwd] of checks) {
    console.log(`P0 batch=${batch} ${program} ${args.join(' ')}`);
    const started = Date.now();
    const logPath = path.join(state, `p0-batch-${batch}-${results.length}.log`);
    const fd = fs.openSync(logPath, 'w');
    let run;
    try { run = spawnSync(program, args, { cwd, stdio: ['ignore', fd, fd], env: process.env, shell: false }); }
    finally { fs.closeSync(fd); }
    results.push({ batch, program, args, cwd, exitCode: run.status, error: run.error?.message,
      logPath, durationMs: Date.now() - started });
    console.log(`  exit=${run.status} durationMs=${Date.now() - started}`);
    if (run.status !== 0) console.error(fs.readFileSync(logPath, 'utf8').split(/\r?\n/).slice(-10).join('\n').slice(-1200));
  }
}
const summary = { at: new Date().toISOString(), ok: results.every(r => r.exitCode === 0), results };
fs.writeFileSync(path.join(state, 'p0-verification.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ ok: summary.ok, passed: results.filter(r => r.exitCode === 0).length,
  failed: results.filter(r => r.exitCode !== 0).length, evidence: '.task-state/p0-verification.json' }));
process.exitCode = summary.ok ? 0 : 1;
