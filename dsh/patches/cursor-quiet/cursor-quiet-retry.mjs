// Cursor "gone quiet" retry, applied at the answer boundary of
// @magpie-community/opencode-cursor-auth.
//
// What happens upstream: Cursor can leave a Run's stream open after some
// thinking with nothing more to come. The plugin's heartbeats keep the
// connection alive while no text, tool call, step count or TurnEnded arrives,
// so the plugin ends that Run after 240 s with
//
//   Cursor went quiet: 24 heartbeats and nothing else for 240 s,
//   its last message checkpoint (try again)
//
// and the "(try again)" is its own advice: the next Run of the same chat
// usually answers normally. The plugin cannot retry itself once output went
// out, because a second attempt would repeat it. That decision belongs to
// whoever can see whether anything was delivered yet.
//
// quietRetry is that decision at the plugin's `answer` boundary:
//   * a quiet failure that arrived before any content frame is retried
//     transparently, into the same client stream, so nothing is duplicated;
//   * a quiet failure after content was streamed is surfaced unchanged, so the
//     reply never repeats itself and the client decides what to do;
//   * every other error (auth, model, network) is untouched.
//
// Environment knobs (all optional):
//   CURSOR_QUIET_ATTEMPTS    total attempts per request (default 3)
//   CURSOR_QUIET_BACKOFF_MS  wait before each retry in ms (default 1500)

const QUIET = /Cursor went quiet:/;

export const isQuiet = (message) => QUIET.test(String(message ?? ''));

const envInt = (name, fallback, min) => {
  const n = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(n) && n >= min ? n : fallback;
};

const attemptLimit = () => envInt('CURSOR_QUIET_ATTEMPTS', 3, 1);
const backoffMs = () => envInt('CURSOR_QUIET_BACKOFF_MS', 1500, 0);

const aborted = (signal) => signal?.aborted === true;

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (aborted(signal)) return reject(signal.reason ?? new Error('the request was cancelled'));
    const timer = setTimeout(() => {
      signal?.removeEventListener?.('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason ?? new Error('the request was cancelled'));
    };
    signal?.addEventListener?.('abort', onAbort, { once: true });
  });

const withoutLength = (headers) => {
  const copy = new Headers(headers);
  copy.delete('content-length');
  copy.delete('content-encoding');
  return copy;
};

// frameVerdict reads one SSE frame as the plugin writes it: a quiet failure,
// or a frame that carries model output (which makes a retry unsafe).
export const frameVerdict = (frame) => {
  const data = frame
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n')
    .trim();
  if (!data || data === '[DONE]') return { quiet: false, content: false };
  let json;
  try {
    json = JSON.parse(data);
  } catch {
    return { quiet: false, content: false };
  }
  if (json?.error) return { quiet: isQuiet(json.error.message), content: false };
  const choice = json?.choices?.[0];
  const delta = choice?.delta;
  const content = Boolean(
    (delta &&
      ((typeof delta.content === 'string' && delta.content.length) ||
        (typeof delta.reasoning_content === 'string' && delta.reasoning_content.length) ||
        (Array.isArray(delta.tool_calls) && delta.tool_calls.length))) ||
      choice?.finish_reason ||
      choice?.message,
  );
  return { quiet: false, content };
};

// errorFrame is how a failed retry reads inside a stream that already began.
const errorFrame = (message) =>
  `data: ${JSON.stringify({ error: { message, code: 502 } })}\n\n`;

const bodyMessage = (body) => {
  try {
    const json = JSON.parse(body);
    const message = json?.error?.message;
    if (typeof message === 'string') return message;
  } catch {}
  return '';
};

// streamWithRetry keeps the caller's single SSE stream alive across quiet
// failures: each frame is forwarded as it is read, so streaming is unchanged,
// and a quiet failure before any content frame is replaced by a fresh attempt.
function streamWithRetry(first, run, options) {
  const { signal, limit } = options;
  const wait = () => options.backoffMs ?? backoffMs();
  let attempt = options.attempt ?? 1;
  let reader = first.body.getReader();
  let pending = '';
  let emitted = false;
  let done = false;
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const restart = async () => {
    attempt += 1;
    options.onRetry?.(attempt - 1);
    try {
      await reader.cancel();
    } catch {}
    await sleep(wait(), signal);
    const next = await run();
    const type = (next.headers.get('content-type') ?? '').toLowerCase();
    if (!type.includes('text/event-stream') || !next.body) {
      const body = await next.text();
      const message = bodyMessage(body) || body.slice(0, 300) || 'the retry answered without a stream';
      return { failure: message };
    }
    reader = next.body.getReader();
    pending = '';
    return {};
  };

  const stream = new ReadableStream({
    async pull(controller) {
      // A pull that resolves without enqueuing leaves the reader waiting, so
      // this reads until it has a frame to pass on (or the stream ends).
      for (;;) {
        if (done) {
          controller.close();
          return;
        }
        let chunk;
        try {
          chunk = await reader.read();
        } catch (error) {
          done = true;
          controller.error(error);
          return;
        }
        if (chunk.done) {
          if (pending) {
            controller.enqueue(encoder.encode(pending));
            pending = '';
          }
          done = true;
          controller.close();
          return;
        }
        pending += decoder.decode(chunk.value, { stream: true });
        let out = '';
        for (let at = pending.indexOf('\n\n'); at >= 0; at = pending.indexOf('\n\n')) {
          const frame = pending.slice(0, at + 2);
          pending = pending.slice(at + 2);
          const verdict = frameVerdict(frame);
          if (verdict.quiet && !emitted && attempt < limit && !aborted(signal)) {
            const result = await restart();
            if (result.failure) {
              out += errorFrame(result.failure);
              done = true;
            }
            break;
          }
          if (verdict.content) emitted = true;
          out += frame;
        }
        if (out) {
          controller.enqueue(encoder.encode(out));
          return;
        }
      }
    },
    cancel() {
      done = true;
      try {
        reader.cancel();
      } catch {}
    },
  });

  return new Response(stream, {
    status: first.status,
    statusText: first.statusText,
    headers: withoutLength(first.headers),
  });
}

// quietRetry runs a chat completion, retrying a quiet failure while nothing
// has been delivered. `run` returns the plugin's own Response.
export async function quietRetry(run, options = {}) {
  const { signal } = options;
  const limit = options.maxAttempts ?? attemptLimit();
  let attempt = 0;
  for (;;) {
    if (aborted(signal)) throw signal.reason ?? new Error('the request was cancelled');
    attempt += 1;
    const response = await run();
    if (aborted(signal)) return response;
    const type = (response.headers.get('content-type') ?? '').toLowerCase();
    if (!type.includes('text/event-stream') || !response.body) {
      const body = await response.text();
      if (isQuiet(bodyMessage(body)) && attempt < limit) {
        options.onRetry?.(attempt);
        await sleep(options.backoffMs ?? backoffMs(), signal);
        continue;
      }
      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: withoutLength(response.headers),
      });
    }
    return streamWithRetry(response, run, { ...options, limit, attempt });
  }
}

