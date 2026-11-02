#!/usr/bin/env node
/**
 * workflow-audit.mjs —— 会话“工作流 & 浪费”审计（token-frugal 的深挖补充）
 *
 * 与 audit-tokens.mjs 的分工：
 *   audit-tokens.mjs  看“账”：哪个会话烧了多少、缓存命中率、每步未命中。
 *   workflow-audit.mjs 看“因”：这些 token 是怎么被工作流烧掉的——goal 反复、compaction 命中、
 *                      工具错误自愈、重复整读、大结果、turn 内重述等，并给出可执行的规则建议。
 *
 * 用法：
 *   node workflow-audit.mjs [YYYY-MM-DD]         # 缺省=今天（Asia/Shanghai）
 *   node workflow-audit.mjs --session <sid前缀>  # 只深挖一个会话（最详细）
 *
 * 数据源：~/.dsh/sessions/<enc-cwd>/session-<id>/session.v4.jsonl.zstd（zlib.zstdDecompressSync 解压）
 * 只读，不写任何文件。
 */
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import os from 'os';

const TZ = 8 * 3600 * 1000;
const args = process.argv.slice(2);
const onlySession = (() => { const i = args.indexOf('--session'); return i >= 0 ? args[i + 1] : null; })();
const day = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a));
const dayStart = day ? new Date(day + 'T00:00:00+08:00').getTime() : (() => { const n = new Date(Date.now() + TZ); return new Date(n.toISOString().slice(0, 10) + 'T00:00:00+08:00').getTime(); })();
const dayEnd = dayStart + 864e5;

const base = path.join(os.homedir(), '.dsh', 'sessions');
const files = [];
(function walk(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) walk(fp);
    else if (/\.jsonl\.zstd$/.test(e.name)) {
      const st = fs.statSync(fp);
      if (onlySession ? fp.includes(onlySession) : (st.mtimeMs >= dayStart && st.mtimeMs < dayEnd)) files.push(fp);
    }
  }
})(base);

// DSH 的 .jsonl.zstd 是「多帧追加」格式：一次交互追加一帧，全文件含上千个 zstd 帧。
// zlib.zstdDecompressSync 只解压第一帧（只拿到 session 头一行），必须按 magic 28 B5 2F FD 切帧逐帧解。
const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
function zstdDecompressAll(buf) {
  const idxs = [];
  for (let i = 0; (i = buf.indexOf(ZSTD_MAGIC, i)) >= 0; i += 4) idxs.push(i);
  if (idxs.length <= 1) { try { return zlib.zstdDecompressSync(buf).toString('utf8'); } catch { return buf.toString('utf8'); } }
  let out = '';
  for (let k = 0; k < idxs.length; k++) {
    const start = idxs[k], end = k + 1 < idxs.length ? idxs[k + 1] : buf.length;
    try { out += zlib.zstdDecompressSync(buf.subarray(start, end)).toString('utf8'); } catch {}
  }
  return out;
}
function load(fp) {
  const s = zstdDecompressAll(fs.readFileSync(fp));
  const ev = [];
  for (const l of s.split('\n')) { if (!l) continue; try { ev.push(JSON.parse(l)); } catch {} }
  return ev;
}
const txt = c => Array.isArray(c) ? c.map(x => x.text || '').join('') : (c || '');
const bytes = s => Buffer.byteLength(s || '', 'utf8');
const kb = n => (n / 1024).toFixed(0) + 'KB';

const WEIRD_ERR = new Set(['INVALID_ARGS', 'ESCALATION_ARGS', 'FS_NOT_OBSERVED', 'FS_STALE_VERSION', 'FS_NOT_FOUND', 'FS_NOT_TEXT', 'FS_EDIT_NOT_FOUND', 'GOAL_TOOL_INVALID_UPDATE', 'GOAL_INVALID_TRANSITION', 'SEARCH_FAILED', 'UNKNOWN_TOOL', 'TOOL_TIMEOUT']);

const rows = [];
for (const fp of files) {
  const ev = load(fp);
  const sid = path.basename(path.dirname(fp)).replace(/^session-/, '').slice(0, 8);
  const nameByCall = {};
  for (const c of ev.filter(e => e.type === 'tool/call')) nameByCall[c.data.callId] = c.data.name;

  // 工具错误自愈
  const errByCode = {};
  let toolErr = 0;
  for (const tr of ev.filter(e => e.type === 'tool/result')) {
    const err = tr.data && tr.data.error; if (!err) continue;
    toolErr++;
    const code = err.code || err.name || 'UNKNOWN';
    errByCode[code] = (errByCode[code] || 0) + 1;
  }
  const weirdErr = Object.entries(errByCode).filter(([k]) => WEIRD_ERR.has(k)).reduce((a, [, v]) => a + v, 0);

  // 大工具结果（>8k 字符）与详情
  let bigResult = 0, bigBytes = 0;
  const bigByTool = {};
  for (const tr of ev.filter(e => e.type === 'tool/result')) {
    if (tr.data.error) continue;
    const b = bytes(txt(tr.data.message && tr.data.message.content));
    if (b > 8000) { bigResult++; bigBytes += b; const nm = nameByCall[tr.data.toolCallId] || '?'; bigByTool[nm] = (bigByTool[nm] || 0) + 1; }
  }

  // 重复整读：同一 file_path 的 read 次数 - 唯一文件数
  const readCalls = ev.filter(e => e.type === 'tool/call' && e.data.name === 'read');
  const fileSeen = {};
  let fullReadOfSameFile = 0;
  for (const c of readCalls) { let a = {}; try { a = JSON.parse(c.data.arguments); } catch {} const k = a.file_path || '?'; fileSeen[k] = (fileSeen[k] || 0) + 1; }
  for (const k in fileSeen) if (fileSeen[k] > 1) fullReadOfSameFile += fileSeen[k] - 1;

  // compaction 命中率：compaction/start 多但 summary 少 = 反复尝试压缩
  const compStart = ev.filter(e => e.type === 'compaction/start').length;
  const compSummary = ev.filter(e => e.type === 'compaction/summary').length;
  const compFail = ev.filter(e => e.type === 'compaction/end' && e.data && e.data.error).length;

  // goal 反复：goal_round 注入次数（= 自动续跑轮数）
  const goalRounds = ev.filter(e => e.type === 'user/message' && /^<goal_round>/.test(txt(e.data.content))).length;

  // turn 内重述：assistant 文本总字节 / 输出 token
  const asstBytes = ev.filter(e => e.type === 'assistant/message').reduce((a, m) => a + (m.data.message.content || []).reduce((s, c) => s + bytes(c.text) + bytes(c.reasoning), 0), 0);

  rows.push({ sid, toolErr, errByCode, weirdErr, bigResult, bigBytes, bigByTool, reRead: fullReadOfSameFile, compStart, compSummary, compFail, goalRounds, asstBytes, turns: ev.filter(e => e.type === 'turn/start').length, steps: ev.filter(e => e.type === 'step/start').length });
}

if (!rows.length) { console.log('该时间段无会话日志。'); process.exit(0); }

const A = rows.reduce((a, r) => { for (const k of ['toolErr', 'weirdErr', 'bigResult', 'bigBytes', 'reRead', 'compStart', 'compSummary', 'compFail', 'goalRounds', 'asstBytes', 'turns', 'steps']) a[k] += r[k]; return a; }, { toolErr: 0, weirdErr: 0, bigResult: 0, bigBytes: 0, reRead: 0, compStart: 0, compSummary: 0, compFail: 0, goalRounds: 0, asstBytes: 0, turns: 0, steps: 0 });

console.log('=== 工作流审计 · ' + (day || '今天') + ' · ' + rows.length + ' 会话 ===');
console.log(`工具错误 ${A.toolErr}（其中可自愈类 ${A.weirdErr}）| 大结果(>8k) ${A.bigResult} 条 共 ${(A.bigBytes / 1048576).toFixed(1)}MB | 重复整读 ${A.reRead} 次 | goal 续跑注入 ${A.goalRounds} 次 | compaction 尝试 ${A.compStart}/成功 ${A.compSummary}/失败 ${A.compFail}`);

rows.sort((a, b) => (b.toolErr + b.goalRounds + b.bigResult) - (a.toolErr + a.goalRounds + a.bigResult));
console.log('\nsid | goal轮 | 工具错误(可自愈) | 大结果 | 重复整读 | comp(试/成/败) | asstKB');
rows.forEach(r => {
  const flag = (r.goalRounds >= 5 || r.weirdErr >= 5 || r.bigResult >= 5) ? '⚠ ' : '  ';
  console.log(flag + r.sid + ' ' + String(r.goalRounds).padStart(4) + ' ' + (r.toolErr + '(' + r.weirdErr + ')').padStart(8) + ' ' + String(r.bigResult).padStart(5) + ' ' + String(r.reRead).padStart(6) + ' ' + (r.compStart + '/' + r.compSummary + '/' + r.compFail).padStart(10) + ' ' + (r.asstBytes / 1024).toFixed(0).padStart(5) + '  ' + JSON.stringify(r.errByCode));
});

// 建议
console.log('\n=== 规则建议（按数据触发） ===');
const total = rows.length;
const pct = n => (n / total * 100).toFixed(0) + '% 会话';
if (A.weirdErr > 0) console.log(`• 可自愈工具错误 ${A.weirdErr} 次（${pct(rows.filter(r => r.weirdErr > 0).length)}）：先加载 tool-call-hygiene 再重试，勿原样重复。`);
if (A.bigResult > 0) console.log(`• 大结果 ${A.bigResult} 条/${(A.bigBytes / 1048576).toFixed(1)}MB：pwsh/grep 先过滤再落盘，read 用 offset/limit 切片。`);
if (A.goalRounds >= 6) console.log(`• goal 自动续跑 ${A.goalRounds} 轮：长任务要分片（一批文件一个 goal），单 goal 轮数上限压低，别让同一目标反复重跑。`);
if (A.compStart > 0 && A.compSummary < A.compStart) console.log(`• compaction 尝试 ${A.compStart} 次/成功 ${A.compSummary}：上下文持续近满，压缩反复失败——长任务应换新会话，别硬撑。`);
if (A.reRead > 0) console.log(`• 重复整读 ${A.reRead} 次：同文件只整篇读一次，后续只取片段。`);
