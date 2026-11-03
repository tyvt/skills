#!/usr/bin/env node
/**
 * tool-call-hygiene / audit.mjs —— 工具层 + 供应商层 双层失败审计
 *
 * 比 scan.mjs 覆盖面更全：
 *   · 工具层：tool/result 里 data.error（FS_* / INVALID_ARGS / UNKNOWN_TOOL …）
 *   · 供应商层：llm/retry、llm/error 等事件里的 503 / 429 / EOF / TRANSPORT —— 这类不会
 *     返回工具错误，而是直接终结整轮，最容易漏统计。
 *
 * 数据源：~/.dsh/sessions/<enc-cwd>/session-<id>/session.v4.jsonl.zstd（多帧 zstd，逐帧解）
 *   注意：tool/result 的调用 ID 在 data.message.toolCallId，不是 data.toolCallId。
 * 输出：打印简报 + 落盘 ~/.dsh/reports/agent-failures-latest.json（脱敏统计，不含正文）
 *
 * 用法：node audit.mjs [YYYY-MM-DD]
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import os from 'os';

const TZ = 8 * 3600 * 1000;
// 按 Asia/Shanghai(+08:00) 取 YYYY-MM-DD，避免用 UTC toISOString 把 +08:00 午夜回拨成前一天
function shanghaiYMD(ts) {
  const d = new Date(ts + TZ);
  const p = n => String(n).padStart(2, '0');
  return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate());
}
const arg = process.argv[2];
const dayStart = arg
  ? new Date(arg + 'T00:00:00+08:00').getTime()
  : (() => { const n = new Date(Date.now() + TZ); return new Date(n.toISOString().slice(0, 10) + 'T00:00:00+08:00').getTime(); })();
const dayEnd = dayStart + 864e5;
const dayLabel = arg || shanghaiYMD(dayStart);

const base = path.join(os.homedir(), '.dsh', 'sessions');
if (!fs.existsSync(base)) { console.error('未找到 sessions 目录: ' + base); process.exit(1); }

const files = [];
(function walk(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) walk(fp);
    else if (/\.jsonl\.zstd$/.test(e.name)) {
      const st = fs.statSync(fp);
      if (st.mtimeMs >= dayStart && st.mtimeMs < dayEnd) files.push(fp);
    }
  }
})(base);

const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
function zstdDecompressAll(buf) {
  const idxs = [];
  for (let i = 0; (i = buf.indexOf(ZSTD_MAGIC, i)) >= 0; i += 4) idxs.push(i);
  if (idxs.length <= 1) { try { return zlib.zstdDecompressSync(buf).toString('utf8'); } catch { return buf.toString('utf8'); } }
  let out = '';
  for (let k = 0; k < idxs.length; k++) {
    const s = idxs[k], e = k + 1 < idxs.length ? idxs[k + 1] : buf.length;
    try { out += zlib.zstdDecompressSync(buf.subarray(s, e)).toString('utf8'); } catch {}
  }
  return out;
}
function load(fp) {
  const s = zstdDecompressAll(fs.readFileSync(fp));
  const ev = [];
  for (const l of s.split('\n')) { if (!l) continue; try { ev.push(JSON.parse(l)); } catch {} }
  return ev;
}

const SELF_HEAL = new Set([
  'INVALID_ARGS', 'ESCALATION_ARGS', 'FS_NOT_OBSERVED', 'FS_STALE_VERSION',
  'FS_NOT_FOUND', 'FS_NOT_TEXT', 'FS_EDIT_NOT_FOUND', 'GOAL_TOOL_INVALID_UPDATE',
  'GOAL_INVALID_TRANSITION', 'UNKNOWN_TOOL', 'SEARCH_FAILED', 'SEARCH_RAW_OUTPUT_OVERFLOW',
  'SEARCH_ABORTED', 'FS_NOT_DIRECTORY',
]);
const MAXIS_MAP = { TIMEOUT: 'TOOL_TIMEOUT' };

function classifyProvider(text) {
  const t = String(text || '');
  if (/429|rate.?limit|too many requests/i.test(t)) return 'RATE_LIMIT';
  if (/50\d|server error|service unavailable|bad gateway|gateway timeout/i.test(t)) return 'SERVER_5XX';
  if (/ECONNRESET|ECONNREFUSED|EPIPE|EOF|socket hang up|transport|network/i.test(t)) return 'TRANSPORT';
  if (/timeout|timed out/i.test(t)) return 'TIMEOUT';
  return 'OTHER';
}

let totalCalls = 0, toolFailures = 0, providerFailures = 0;
const byCategory = {}, byTool = {}, byProvider = {}, perSession = {};

for (const fp of files) {
  const ev = load(fp);
  const sid = path.basename(path.dirname(fp)).replace(/^session-/, '');
  const nameByCall = {};
  for (const c of ev.filter(e => e.type === 'tool/call')) nameByCall[c.data.callId] = c.data.name;
  const calls = ev.filter(e => e.type === 'tool/call').length;
  let tf = 0, pf = 0;

  for (const tr of ev.filter(e => e.type === 'tool/result')) {
    const err = tr.data && tr.data.error;
    if (!err) continue;
    tf++;
    const rawCode = String(err.code || err.name || 'OTHER');
    const code = MAXIS_MAP[rawCode] || rawCode;
    byCategory[code] = (byCategory[code] || 0) + 1;
    const callId = tr.data.message && tr.data.message.toolCallId;
    const nm = (nameByCall[callId] || '?').replace(/[\s"'<>]+/g, '');
    byTool[nm] = (byTool[nm] || 0) + 1;
  }

  // 供应商层：llm/retry 事件。真实结构：data.failure.code / data.failure.message / data.provider
  //   code 常见 RATE_LIMIT(429) / SERVER(5xx) / TIMEOUT / TRANSPORT / EMPTY_RESPONSE
  for (const e of ev) {
    if (!/llm\/(retry|error|failure)|provider/.test(e.type || '')) continue;
    const d = e.data || {};
    const fail = d.failure || {};
    const code = String(fail.code || d.code || '').toUpperCase();
    const text = String(fail.message || d.message || d.error || '');
    // EMPTY_RESPONSE 是模型空回复（常伴权重试），不算供应商故障，单列
    if (!code && !text) continue;
    if (/EMPTY_RESPONSE/.test(code)) continue;
    pf++;
    const cat = code && /RATE|429/.test(code) ? 'RATE_LIMIT'
      : code && /SERVER|5\d\d/.test(code) ? 'SERVER_5XX'
      : code === 'TRANSPORT' ? 'TRANSPORT'
      : code === 'TIMEOUT' ? 'TIMEOUT'
      : classifyProvider(text);
    byProvider[cat] = (byProvider[cat] || 0) + 1;
  }

  totalCalls += calls;
  toolFailures += tf;
  providerFailures += pf;
  perSession[sid] = { total: calls, toolFailures: tf, providerFailures: pf };
}

const selfHeal = Object.entries(byCategory).filter(([k]) => SELF_HEAL.has(k)).reduce((a, [, v]) => a + v, 0);

console.log('=== agent 失败审计（工具层 + 供应商层） · ' + dayLabel + ' · ' + files.length + ' 会话 ===');
console.log('工具调用 ' + totalCalls);
console.log('工具层失败 ' + toolFailures + (totalCalls ? '（' + (toolFailures / totalCalls * 100).toFixed(2) + '%）' : '') + '，其中可自愈 ' + selfHeal);
console.log('供应商层失败 ' + providerFailures + '（这类直接终结整轮，单日经常比工具层还多）');

console.log('\n-- 工具层错误码（降序）--');
Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log('  ' + k.padEnd(28) + String(v).padStart(5) + (SELF_HEAL.has(k) ? '  [可自愈]' : '')));

if (providerFailures) {
  console.log('\n-- 供应商层（降序）--');
  Object.entries(byProvider).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
    console.log('  ' + k.padEnd(16) + String(v).padStart(5)));
}

const reportDir = path.join(os.homedir(), '.dsh', 'reports');
try {
  fs.mkdirSync(reportDir, { recursive: true });
  const out = {
    auditedAt: new Date().toISOString(),
    scope: dayLabel,
    sessions: files.length,
    total: totalCalls,
    toolFailures,
    providerFailures,
    selfHealable: selfHeal,
    byCategory,
    byTool,
    byProvider,
    perSession,
  };
  fs.writeFileSync(path.join(reportDir, 'agent-failures-latest.json'), JSON.stringify(out, null, 2));
  console.log('\n报告已写入: ' + path.join(reportDir, 'agent-failures-latest.json'));
} catch (e) {
  console.error('\n落盘失败: ' + e.message);
}

if (selfHeal > 0) console.log('建议：' + selfHeal + ' 次工具失败属可自愈类，先加载 tool-call-hygiene 的修正表再重试一次。');
if (providerFailures > 0) console.log('供应商层失败：连续 429/503 时换 provider 同名模型继续，别原地重试。');
