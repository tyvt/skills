// Tests for patch-fast-default.mjs — run: node --test fast-default.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { transform, applyTo, restoreTo, statusOn, ANCHOR, REPLACEMENT, MARKER } from './patch-fast-default.mjs';

const PRISTINE = `#!/x
  const tier = chat.service_tier
  ${ANCHOR}
  const req = request(raw, model, chat.reasoning_effort ?? "", fast)
`;

function withTemp(name, content) {
  const dir = mkdtempSync(join(tmpdir(), 'fast-default-'));
  const path = join(dir, name);
  if (content !== null) writeFileSync(path, content);
  return { dir, path, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

test('transform patches a pristine file exactly once and marks it', () => {
  const r = transform(PRISTINE);
  assert.equal(r.ok, true);
  assert.equal(r.changed, true);
  assert.ok(r.content.includes(MARKER));
  assert.equal(r.content.split(ANCHOR).length, 1, 'anchor fully replaced');
  assert.ok(r.content.includes('if (fast === undefined) fast = true;'));
});

test('patched semantics: no tier -> fast, explicit non-fast tier -> off, priority -> on', () => {
  const r = transform(PRISTINE);
  // extract just the patched statement (a `let fast = ...` line) and evaluate it directly
  const m = r.content.match(/let fast = tier[^\n]*/);
  assert.ok(m, 'patched statement found');
  const fn = new Function('tier', m[0] + '\nreturn fast;');
  const tiers = [undefined, "", "default", "flex", "priority", "fast"];
  const out = tiers.map(fn);
  assert.deepEqual(out, [true, true, false, false, true, true], 'undefined/absent tier defaults fast; explicit non-fast stays off');
});

test('transform is idempotent on an already patched file', () => {
  const patched = transform(PRISTINE).content;
  const r = transform(patched);
  assert.equal(r.ok, true);
  assert.equal(r.changed, false);
  assert.equal(r.content, patched, 'content untouched');
});

test('transform refuses when the anchor is missing or duplicated, without writing', () => {
  const missing = PRISTINE.replace(ANCHOR, 'const fast = false');
  const rm = transform(missing);
  assert.equal(rm.ok, false);
  assert.match(rm.reason, /0 times/);
  const dup = PRISTINE.replace('const req = request', ANCHOR + '\n  const req = request');
  const rd = transform(dup);
  assert.equal(rd.ok, false);
  assert.match(rd.reason, /2 times/);
});

test('applyTo patches, is idempotent, keeps the first backup, and restore returns pristine', () => {
  const t = withTemp('index.mjs', PRISTINE);
  try {
    const first = applyTo([t.path]);
    assert.equal(first.changed, true);
    assert.equal(first.results[0].ok, true);
    const backup = t.path + '.orig-fast-default';
    assert.ok(existsSync(backup), 'backup created on first apply');
    const backupBefore = readFileSync(backup, 'utf8');
    assert.equal(backupBefore, PRISTINE, 'backup is the pristine content');

    // a later upstream-like edit (still pristine, no marker) must not touch the existing backup
    copyFileSync(backup, t.path + '.keep'); // guard against accidental restore-clobber mid-test
    rmSync(t.path);
    writeFileSync(t.path, backupBefore); // simulate reappearing pristine file
    const second = applyTo([t.path]);
    assert.equal(second.changed, true);
    assert.equal(readFileSync(t.path + '.orig-fast-default', 'utf8'), backupBefore, 'existing backup not overwritten');

    const again = applyTo([t.path]);
    assert.equal(again.changed, false, 'second apply over patched file is a no-op');
    assert.equal(again.results[0].reason, 'already patched');

    assert.deepEqual(statusOn([t.path]).map((s) => s.state), ['patched']);

    const rs = restoreTo([t.path]);
    assert.equal(rs.changed, true);
    assert.equal(readFileSync(t.path, 'utf8'), PRISTINE, 'restored to pristine');
    assert.deepEqual(statusOn([t.path]).map((s) => s.state), ['pristine']);
  } finally {
    t.cleanup();
  }
});

test('applyTo reports missing files without throwing', () => {
  const t = withTemp('index.mjs', null);
  try {
    const r = applyTo([t.path]);
    assert.equal(r.results[0].ok, false);
    assert.equal(r.results[0].reason, 'missing');
  } finally {
    t.cleanup();
  }
});

test('real plugin copies expose exactly one anchor (patchability precondition)', async () => {
  // if a plugin upgrade changes the line, patch must fail loudly, not silently skip
  const { targets } = await import('./patch-fast-default.mjs');
  const ts = targets();
  assert.ok(ts.length >= 1, `expected at least one plugin copy, found ${ts.length}`);
  for (const t of ts) {
    const c = readFileSync(t, 'utf8');
    const n = c.split(ANCHOR).length - 1;
    assert.ok(n === 1 || c.includes(MARKER), `${t}: anchor count ${n}, not patched`);
  }
});
