import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quietRetry, isQuiet, frameVerdict } from './cursor-quiet-retry.mjs';

const QUIET =
  'Cursor went quiet: 24 heartbeats and nothing else for 240 s, its last message checkpoint (try again)';
const options = { maxAttempts: 3, backoffMs: 0 };

const jsonError = (message, status = 502) =>
  Response.json({ error: { message, type: 'cursor_error', code: status } }, { status });

const frame = (value) => `data: ${JSON.stringify(value)}\n\n`;
const role = frame({ choices: [{ index: 0, delta: { role: 'assistant', content: '' } }] });
const text = (t) => frame({ choices: [{ index: 0, delta: { content: t } }] });
const quietFrame = frame({ error: { message: QUIET, code: 502 } });
const done = 'data: [DONE]\n\n';
const sse = (body) => new Response(body, { headers: { 'content-type': 'text/event-stream' } });

test('isQuiet matches only the plugin wording', () => {
  assert.equal(isQuiet(QUIET), true);
  assert.equal(isQuiet('Cursor went quiet: no message for 60 s (try again)'), true);
  assert.equal(isQuiet('Cursor: unauthorized'), false);
  assert.equal(isQuiet(undefined), false);
});

test('frameVerdict tells quiet errors from output', () => {
  assert.deepEqual(frameVerdict(quietFrame), { quiet: true, content: false });
  assert.deepEqual(frameVerdict(role), { quiet: false, content: false });
  assert.deepEqual(frameVerdict(text('hi')), { quiet: false, content: true });
  assert.deepEqual(frameVerdict(done), { quiet: false, content: false });
  assert.deepEqual(frameVerdict(frame({ choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] })), {
    quiet: false,
    content: true,
  });
});

test('a quiet JSON error is retried and the later answer returned', async () => {
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      return calls === 1 ? jsonError(QUIET) : Response.json({ ok: true });
    },
    options,
  );
  assert.equal(calls, 2);
  assert.deepEqual(await response.json(), { ok: true });
});

test('a quiet JSON error stops at the attempt limit', async () => {
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      return jsonError(QUIET);
    },
    options,
  );
  assert.equal(calls, 3);
  assert.equal(response.status, 502);
  assert.match((await response.json()).error.message, /went quiet/);
});

test('a quiet stream error before any content is retried without repeating anything', async () => {
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      return calls === 1 ? sse(role + quietFrame) : sse(role + text('answer') + done);
    },
    options,
  );
  const body = await response.text();
  assert.equal(calls, 2);
  assert.match(body, /"answer"/);
  assert.doesNotMatch(body, /went quiet/);
  assert.equal(body.split('"content":"answer"').length - 1, 1);
});

test('a quiet stream error after content is surfaced, never retried', async () => {
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      return sse(role + text('partial') + quietFrame);
    },
    options,
  );
  const body = await response.text();
  assert.equal(calls, 1);
  assert.match(body, /partial/);
  assert.match(body, /went quiet/);
});

test('other failures are not retried', async () => {
  for (const make of [
    () => jsonError('Cursor: unauthorized', 401),
    () => sse(role + frame({ error: { message: 'the reply broke off: EOF', code: 502 } })),
  ]) {
    let calls = 0;
    const response = await quietRetry(() => {
      calls += 1;
      return make();
    }, options);
    await response.text();
    assert.equal(calls, 1);
  }
});

test('frames split across chunks are still recognised', async () => {
  let calls = 0;
  const stream = (body) =>
    new Response(
      new ReadableStream({
        start(controller) {
          const bytes = new TextEncoder().encode(body);
          for (let at = 0; at < bytes.length; at += 3) controller.enqueue(bytes.slice(at, at + 3));
          controller.close();
        },
      }),
      { headers: { 'content-type': 'text/event-stream' } },
    );
  const response = await quietRetry(
    () => {
      calls += 1;
      return calls === 1 ? stream(role + quietFrame) : stream(role + text('split') + done);
    },
    options,
  );
  const body = await response.text();
  assert.equal(calls, 2);
  assert.match(body, /split/);
  assert.doesNotMatch(body, /went quiet/);
});

test('a retry that answers without a stream reports the failure in-stream', async () => {
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      return calls === 1 ? sse(role + quietFrame) : jsonError('Cursor: unauthorized', 401);
    },
    options,
  );
  const body = await response.text();
  assert.equal(calls, 2);
  assert.match(body, /unauthorized/);
});

test('headers survive and the stale length is dropped', async () => {
  const response = await quietRetry(
    () =>
      new Response(JSON.stringify({ ok: true }), {
        headers: { 'content-type': 'application/json', 'content-length': '999', 'X-Magpie-Sign-In': 'kept' },
      }),
    options,
  );
  assert.equal(response.headers.get('X-Magpie-Sign-In'), 'kept');
  assert.equal(response.headers.get('content-length'), null);
  assert.deepEqual(await response.json(), { ok: true });
});

test('cancellation stops the retries', async () => {
  const controller = new AbortController();
  let calls = 0;
  const response = await quietRetry(
    () => {
      calls += 1;
      controller.abort();
      return jsonError(QUIET);
    },
    { ...options, signal: controller.signal },
  );
  assert.equal(calls, 1);
  assert.equal(response.status, 502);
  assert.match((await response.json()).error.message, /went quiet/);
});

test('CURSOR_QUIET_ATTEMPTS raises the attempt limit', async () => {
  process.env.CURSOR_QUIET_ATTEMPTS = '5';
  try {
    let calls = 0;
    const response = await quietRetry(() => {
      calls += 1;
      return jsonError(QUIET);
    }, { backoffMs: 0 });
    await response.text();
    assert.equal(calls, 5);
  } finally {
    delete process.env.CURSOR_QUIET_ATTEMPTS;
  }
});
