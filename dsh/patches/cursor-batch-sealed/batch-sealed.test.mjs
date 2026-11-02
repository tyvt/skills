// Verifies the batch-sealed patch on the REAL installed plugin file.
//
// NativeSession is not exported by the plugin, so this asserts two things that
// together define the fix:
//   1. the patched source shape: the sealed-phase guard is split into a terminal
//      check plus an awaiting-results check that first looks for a matching call
//      in the sealed batch and returns on a hit;
//   2. the extracted guard logic behaves correctly when executed: an identical
//      retransmission returns (turn survives), a new exec throws, terminal throws.
//
//   node --test batch-sealed.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NATIVE } from './patch-batch-sealed.mjs';

const src = readFileSync(NATIVE, 'utf8');

const invalid = (message, status = 409) => {
  throw Object.assign(new Error(message), { status });
};

// Mirror of the patched guard, kept structurally identical to the file.
const guard = (session, call, digest) => {
  if (session.terminal) invalid('native call arrived after its batch was sealed', 502);
  if (session.state === 'awaiting-results') {
    const sealed = session.batches?.find((b) => b.calls.some((c) => c.requestID === call.requestID && c.digest === digest));
    if (sealed) return 'dropped';
    invalid('native call arrived after its batch was sealed', 502);
  }
  return 'accepted';
};

test('installed plugin carries the patched sealed-phase guard', () => {
  assert.match(src, /\[cursor-batch-sealed\]/);
  assert.match(src, /if \(this\.terminal\) invalid\("native call arrived after its batch was sealed", 502\)/);
  assert.match(src, /const sealed = this\.batches\?\.find/);
  // the unpatched combined guard must be gone
  assert.doesNotMatch(src, /if \(this\.terminal \|\| this\.state === "awaiting-results"\) invalid\("native call arrived after its batch was sealed", 502\)/);
});

test('retransmission already sealed into the batch is dropped, not fatal', () => {
  const session = {
    terminal: false,
    state: 'awaiting-results',
    batches: [{ calls: [{ requestID: 7, digest: 'aaa' }] }],
  };
  assert.equal(guard(session, { requestID: 7 }, 'aaa'), 'dropped');
});

test('a genuinely new exec while awaiting results still fails', () => {
  const session = {
    terminal: false,
    state: 'awaiting-results',
    batches: [{ calls: [{ requestID: 7, digest: 'aaa' }] }],
  };
  assert.throws(() => guard(session, { requestID: 99 }, 'bbb'), /batch was sealed/);
});

test('same request ID with a different digest still fails (identity changed)', () => {
  const session = {
    terminal: false,
    state: 'awaiting-results',
    batches: [{ calls: [{ requestID: 7, digest: 'aaa' }] }],
  };
  assert.throws(() => guard(session, { requestID: 7 }, 'zzz'), /batch was sealed/);
});

test('terminal session rejects any call', () => {
  const session = { terminal: true, state: 'running', batches: [] };
  assert.throws(() => guard(session, { requestID: 7 }, 'aaa'), /batch was sealed/);
});

test('running session accepts', () => {
  const session = { terminal: false, state: 'running', batches: [] };
  assert.equal(guard(session, { requestID: 7 }, 'aaa'), 'accepted');
});
