#!/usr/bin/env node
/**
 * tool-call-hygiene / morning-report.mjs —— 晨间失败巡检（给「今天要提防什么」一页结论）
 *
 * 三个脚本的分工：
 *   scan.mjs   只统计「工具层」失败率，纯文本。
 *   audit.mjs  工具层 + 供应商层，落盘 agent-failures-latest.json。
 *   morning-report.mjs  在此基础上做「晨报」：本窗口 vs 对比窗口，标出恶化项，
 *                       给出开局该守的 3 条重点，并落盘一份 markdown 到 ~/.dsh/reports/。
 *
 * 数据源：~/.dsh/sessions/<enc-cwd>/session-<id>/session.v4.jsonl.zstd（多帧 zstd，逐帧解）
 *   注意：tool/result 的调用 ID 在 data.message.toolCallId，不是 data.toolCallId。
 * 用法：node morning-report.mjs [YYYY-MM-DD]
 *   缺省 = 滚动 24 小时窗口（避免凌晨生成时当天尚无会话、报表全是 0）；
 *   显式传日期 = 按该自然日整天复盘，对比基准 = 前一天。
 * 只依赖本地日志，不联网。
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import os from 'os';

const TZ = 8 * 3600 * 1000;
const arg = process.argv[2];
function dayStartOf(dstr) { return new Date(dstr + 'T00:00:00+08:00').getTime(); }
const now = Date.now();
const rolling = !arg;
const todayLabel = arg || new Date(now + TZ).toISOString().slice(0, 10);
const naturalStart = dayStartOf(todayLabel);
const yesterdayLabel = new Date(naturalStart - 864e5 + TZ).toISOString().slice(0, 10);

// 滚动窗口按「会话文件最后写入时间」取近 24h / 前 24h。
// 2026-11-09 实测：晨报 08:00 生成，按自然日「今天」统计时当天还没有会话，
// 报表显示「0 会话 / 0 失败」，而白天实际有 22 次工具失败 —— 口径滞后造成假象。
// 注意：跨天长期会话的 mtime 落在近 24h 时会带入其历史失败，属既有统计口径。
const todayStart = rolling ? now - 864e5 : naturalStart;
const todayEnd = rolling ? now : naturalStart + 864e5;
const yestStart = rolling ? now - 2 * 864e5 : naturalStart - 864e5;
const yestEnd = rolling ? todayStart : naturalStart;
const todayWindowLabel = rolling ? '近 24h' : todayLabel;
const yestWindowLabel = rolling ? '前 24h' : yesterdayLabel;

const base = path.join(os.homedir(), '.dsh', 'sessions');
if (!fs.existsSync(base)) { console.error('未找到 sessions 目录: ' + base); process.exit(1); }

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

function collectFiles(start, end) {
  const out = [];
  (function walk(p) {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) walk(fp);
      else if (/\.jsonl\.zstd$/.test(e.name)) {
        const st = fs.statSync(fp);
        if (st.mtimeMs >= start && st.mtimeMs < end) out.push(fp);
      }
    }
  })(base);
  return out;
}

function summarize(files) {
  let calls = 0, toolFail = 0, provFail = 0;
  const byCategory = {};
  for (const fp of files) {
    const ev = load(fp);
    calls += ev.filter(e => e.type === 'tool/call').length;
    for (const tr of ev.filter(e => e.type === 'tool/result')) {
      const err = tr.data && tr.data.error; if (!err) continue;
      toolFail++;
      const code = MAXIS_MAP[String(err.code || err.name || 'OTHER')] || String(err.code || err.name || 'OTHER');
      byCategory[code] = (byCategory[code] || 0) + 1;
    }
    for (const e of ev) {
      if (!/llm\/(retry|error|failure)|provider/.test(e.type || '')) continue;
      const d = e.data || {};
      const fail = d.failure || {};
      const code = String(fail.code || d.code || '').toUpperCase();
      if (!code && !fail.message) continue;
      if (/EMPTY_RESPONSE/.test(code)) continue; // 空回复重试，不算供应商故障
      provFail++;
    }
  }
  const selfHeal = Object.entries(byCategory).filter(([k]) => SELF_HEAL.has(k)).reduce((a, [, v]) => a + v, 0);
  return { sessions: files.length, calls, toolFail, provFail, selfHeal, byCategory };
}

const today = summarize(collectFiles(todayStart, todayEnd));
const yest = summarize(collectFiles(yestStart, yestEnd));

const pct = (a, b) => b ? (a / b * 100).toFixed(1) : '-';
const delta = (a, b) => { const d = a - b; return (d > 0 ? '+' : '') + d; };

console.log('================ 工具失败 · 晨报 ================');
console.log('本窗口 ' + todayWindowLabel + '  vs  对比窗口 ' + yestWindowLabel + (rolling ? '   （滚动 24 小时）' : '   （自然日复盘）'));
console.log('');
console.log('指标            本窗口      对比窗口    变化');
console.log('会话数          ' + String(today.sessions).padEnd(11) + String(yest.sessions).padEnd(11) + delta(today.sessions, yest.sessions));
console.log('工具调用        ' + String(today.calls).padEnd(11) + String(yest.calls).padEnd(11) + delta(today.calls, yest.calls));
console.log('工具失败        ' + String(today.toolFail).padEnd(11) + String(yest.toolFail).padEnd(11) + delta(today.toolFail, yest.toolFail));
console.log('  可自愈        ' + String(today.selfHeal).padEnd(11) + String(yest.selfHeal).padEnd(11) + delta(today.selfHeal, yest.selfHeal));
console.log('供应商失败      ' + String(today.provFail).padEnd(11) + String(yest.provFail).padEnd(11) + delta(today.provFail, yest.provFail));
console.log('失败率%         ' + pct(today.toolFail, today.calls).padEnd(11) + pct(yest.toolFail, yest.calls).padEnd(11));

console.log('\n-- 本窗口错误码 Top --');
Object.entries(today.byCategory).sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(([k, v]) =>
  console.log('  ' + k.padEnd(26) + String(v).padStart(4) + (SELF_HEAL.has(k) ? '  [可自愈]' : '')));

const guards = [];
if (today.selfHeal > 0) {
  const top = Object.entries(today.byCategory).filter(([k]) => SELF_HEAL.has(k)).sort((a, b) => b[1] - a[1])[0];
  guards.push(`可自愈失败 ${today.selfHeal} 次（最多：${top ? top[0] : '-'}）→ 出错先查 tool-call-hygiene 修正表，绝不原样重复。`);
}
if (today.toolFail - today.selfHeal > 0) guards.push(`非自愈失败 ${today.toolFail - today.selfHeal} 次 → 多为超时/网络，拆小命令或加 timeoutMs；session_search 超时先缩小范围。`);
if (today.provFail > 0) guards.push(`供应商失败 ${today.provFail} 次 → 连续 429/503/TRANSPORT 换 provider 同名模型，别原地重试。`);
if (!guards.length) guards.push('本窗口暂无显著失败，保持现有习惯。');

console.log('\n-- 开局该守 --');
guards.forEach((g, i) => console.log('  ' + (i + 1) + '. ' + g));

try {
  const reportDir = path.join(os.homedir(), '.dsh', 'reports');
  fs.mkdirSync(reportDir, { recursive: true });
  const md = [
    '# 工具失败晨报 · ' + todayLabel + (rolling ? '（滚动 24 小时窗口）' : ''),
    '',
    '对比基准：' + yestWindowLabel,
    '',
    '| 指标 | 本窗口 | 对比窗口 | 变化 |',
    '|---|---|---|---|',
    `| 会话数 | ${today.sessions} | ${yest.sessions} | ${delta(today.sessions, yest.sessions)} |`,
    `| 工具调用 | ${today.calls} | ${yest.calls} | ${delta(today.calls, yest.calls)} |`,
    `| 工具失败 | ${today.toolFail} | ${yest.toolFail} | ${delta(today.toolFail, yest.toolFail)} |`,
    `| 　可自愈 | ${today.selfHeal} | ${yest.selfHeal} | ${delta(today.selfHeal, yest.selfHeal)} |`,
    `| 供应商失败 | ${today.provFail} | ${yest.provFail} | ${delta(today.provFail, yest.provFail)} |`,
    `| 失败率% | ${pct(today.toolFail, today.calls)} | ${pct(yest.toolFail, yest.calls)} | |`,
    '',
    '## 本窗口错误码 Top',
    ...Object.entries(today.byCategory).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `- ${k}: ${v}${SELF_HEAL.has(k) ? '（可自愈）' : ''}`),
    '',
    '## 开局该守',
    ...guards.map((g, i) => `${i + 1}. ${g}`),
    '',
  ].join('\n');
  const outPath = path.join(reportDir, 'morning-triage-' + todayLabel + '.md');
  fs.writeFileSync(outPath, md);
  console.log('\n晨报已写入: ' + outPath);
} catch (e) {
  console.error('\n落盘失败: ' + e.message);
}
