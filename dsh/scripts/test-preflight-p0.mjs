import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { preflight } from './preflight-p0.mjs';
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'p0-preflight-'));
try {
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ scripts: { test: 'vitest' } }));
  assert.equal(preflight({ workdir: dir, packageScript: 'test' }).ok, true);
  assert.deepEqual(preflight({ workdir: dir, packageScript: 'build' }).errors, ['SCRIPT_NOT_FOUND']);
  assert.equal(preflight({ workdir: dir, testUrl: 'http://localhost:3000/a', expectedOrigin: 'http://localhost:3000', environment: 'happy-dom' }).ok, true);
  assert.deepEqual(preflight({ workdir: dir, testUrl: 'http://localhost:3000', expectedOrigin: 'http://localhost:4000' }).errors, ['TEST_ORIGIN_MISMATCH']);
  assert.equal(preflight({ workdir: dir, testUrl: 'bad url', expectedOrigin: 'http://localhost' }).ok, false);
  assert.equal(preflight({ workdir: dir, environment: 'unknown' }).ok, false);
  assert.equal(preflight({ workdir: path.join(dir, 'missing') }).ok, false);
  assert.deepEqual(preflight({ workdir: dir }).checks, ['workdir']);
  console.log('P0 preflight: 8 checks passed');
} finally {
  // Only remove the exact unique directory created above.
  if (path.dirname(dir) !== os.tmpdir() || !path.basename(dir).startsWith('p0-preflight-')) throw new Error('unsafe temp cleanup');
  fs.rmSync(dir, { recursive: true });
}
