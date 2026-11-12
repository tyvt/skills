#!/usr/bin/env node
// token-frugal · 每会话·每模型 token 清单
// 现有 audit-tokens.mjs 只读 projcache 的「整会话合计」，模型字段只取 modelSelection.lastUsed 单值，
// 既算不出每个实际参与模型的输入/输出/缓存命中，也看不到 orchestrate 子模型消耗。本脚本补这个缺口。
//
// 数据源（按可信度）：
//   1) 会话事件日志 ~/.dsh/sessions/<enc-cwd>/session-<sid>/session.v4.jsonl.zstd
//      每个 assistant/message 事件携带 data.usage{inputTokens,outputTokens,cacheReadTokens,cacheWriteTokens,totalTokens}
//      与 data.message.source.{provider,model}（或 replayState.response.responseModel）。
//      → 按 (provider/model) 精确汇总每一轮对话里每个实际参与模型。主 agent + teammate 都覆盖。complete & exact。
//   2) 网关 /v1/magpie/trace（orchestrate 子模型）：
//      每条 route.usage[] 列每个子模型 provider/model/in/out/cache_read/credits。
//      网关无 session_id，且 /trace 只保留最近 60 条路由（环形缓冲），无法可靠回溯历史会话。
//      → 因此「会话级」只做「最近会话 + 时间窗 best-effort 归属」，并明确标 ≈；
//        另有「网关·全局每模型」汇总（准确，覆盖 orchestrator 真正参与的多模型）。
//
// 用法：
//   node audit-models.mjs [YYYY-MM-DD]         # 缺省=今天（Asia/Shanghai），按会话列出每模型清单
//   node audit-models.mjs --session <sid前缀>   # 只看某会话，逐模型 + 逐轮明细
//   node audit-models.mjs --no-gateway         # 跳过网关请求（离线/网关不可用）
// 只读，不写任何文件。
import fs from 'fs';
import path from 'path';
import os from 'os';
import zlib from 'zlib';

const GW = process.env.DSH_MAGPIE_GATEWAY || 'http://127.0.0.1:3425';
const TZ_OFF = '+08:00';

// ---- 多帧 zstd 解压（见 SKILL.md 数据源坑）----
function zstdDecompressAll(buf) {
  const MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
  const idxs = [];
  for (let i = 0; (i = buf.indexOf(MAGIC, i)) >= 0; i += 4) idxs.push(i);
  if (idxs.length <= 1) { try { return zlib.zstdDecompressSync(buf).toString('utf8'); } catch { return ''; } }
  let out = '';
  for (let k = 0; k < idxs.length; k++) {
    const s = idxs[k], e = k + 1 < idxs.length ? idxs[k + 1] : buf.length;
    try { out += zlib.zstdDecompressSync(buf.subarray(s, e)).toString('utf8'); } catch {}
  }
  return out;
}

// ---- 参数 ----
const argv = process.argv.slice(2);
const noGw = argv.includes('--no-gateway');
const sIdx = argv.indexOf('--session');
const onlySid = sIdx >= 0 ? argv[sIdx + 1] : null;
const dayArg = argv.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a));

let dayStart, dayEnd, dayLabel;
if (onlySid) {
  dayStart = 0; dayEnd = Infinity; dayLabel = 'session:' + onlySid;
} else if (dayArg) {
  dayStart = new Date(dayArg + 'T00:00:00' + TZ_OFF).getTime();
  dayEnd = dayStart + 24 * 3600 * 1000; dayLabel = dayArg;
} else {
  const now = new Date();
  const s = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  dayStart = new Date(s + 'T00:00:00' + TZ_OFF).getTime();
  dayEnd = dayStart + 24 * 3600 * 1000; dayLabel = '今天(' + s + ')';
}

// ---- 枚举所有会话事件日志 ----
const sessionsBase = path.join(os.homedir(), '.dsh', 'sessions');
if (!fs.existsSync(sessionsBase)) { console.error('未找到 sessions 目录: ' + sessionsBase); process.exit(1); }

const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'k' : String(Math.round(n));
const num = n => (n || 0).toLocaleString();
const pct = r => (r * 100).toFixed(0) + '%';

// 每个会话：Map<"provider/model", {in,out,cr,cw,steps,first,last}>
function scanSession(file) {
  const lines = zstdDecompressAll(fs.readFileSync(file)).split('\n').filter(Boolean);
  const perModel = new Map();
  const perTurn = []; // {turn,step,model,in,out,cr,cw}
  let title = '', first = Infinity, last = -Infinity;
  for (const ln of lines) {
    let o; try { o = JSON.parse(ln); } catch { continue; }
    if (o.time) { if (o.time < first) first = o.time; if (o.time > last) last = o.time; }
    if (o.type === 'session/title' && o.data && o.data.title) title = String(o.data.title);
    if (o.type !== 'assistant/message') continue;
    const d = o.data || {};
    const u = d.usage;
    if (!u) continue;
    const src = (d.message && d.message.source) || {};
    const rs = src.replayState && src.replayState.response || {};
    const provider = src.provider || rs.provider || '?';
    const model = src.model || rs.model || rs.responseModel || '?';
    const key = provider + '/' + model;
    const inTok = u.inputTokens || 0, outTok = u.outputTokens || 0;
    const cr = u.cacheReadTokens || 0, cw = u.cacheWriteTokens || 0;
    const b = perModel.get(key) || { in: 0, out: 0, cr: 0, cw: 0, steps: 0 };
    b.in += inTok; b.out += outTok; b.cr += cr; b.cw += cw; b.steps += 1;
    perModel.set(key, b);
    perTurn.push({ turn: d.turn, step: d.step, model: key, in: inTok, out: outTok, cr, cw });
  }
  return { perModel, perTurn, title, first, last };
}

const sessions = [];
for (const cwdDir of fs.readdirSync(sessionsBase)) {
  const cp = path.join(sessionsBase, cwdDir);
  let isDir = false; try { isDir = fs.statSync(cp).isDirectory(); } catch {}
  if (!isDir) continue;
  for (const sessName of fs.readdirSync(cp)) {
    const f = path.join(cp, sessName, 'session.v4.jsonl.zstd');
    if (!fs.existsSync(f)) continue;
    const sid = (sessName.match(/session-([0-9a-f-]+)/) || [])[1] || sessName;
    if (onlySid && !sid.startsWith(onlySid) && !sessName.includes(onlySid)) continue;
    let st; try { st = fs.statSync(f); } catch { continue; }
    if (!onlySid && (st.mtimeMs < dayStart || st.mtimeMs >= dayEnd)) continue;
    let r; try { r = scanSession(f); } catch { continue; }
    if (r.perModel.size === 0) continue;
    let tot = { in: 0, out: 0, cr: 0, cw: 0, steps: 0 };
    for (const b of r.perModel.values()) { tot.in += b.in; tot.out += b.out; tot.cr += b.cr; tot.cw += b.cw; tot.steps += b.steps; }
    if (tot.in + tot.cr + tot.out === 0) continue;
    sessions.push({ sid, cwd: cwdDir, title: r.title, first: r.first, last: r.last, perModel: r.perModel, perTurn: r.perTurn, tot });
  }
}

// ---- 网关：/v1/magpie/trace → 每路由每模型 usage[]；/v1/magpie/usage/requests → 请求级（含 agent 区分）----
async function fetchGateway() {
  if (noGw) return { trace: null, reqs: null };
  const out = { trace: null, reqs: null };
  try {
    const t = await fetch(GW + '/v1/magpie/trace').then(r => r.json());
    out.trace = (t && t.routes) || [];
  } catch { out.trace = null; }
  try {
    const q = await fetch(GW + '/v1/magpie/usage/requests?limit=500').then(r => r.json());
    out.reqs = (q && q.rows) || [];
  } catch { out.reqs = null; }
  return out;
}

function aggGatewayByModel(rows, keyFn) {
  const m = new Map();
  for (const x of rows) {
    const key = keyFn(x);
    if (!key) continue;
    const b = m.get(key) || { in: 0, out: 0, cr: 0, cw: 0, calls: 0, credits: 0 };
    b.in += x.in || 0; b.out += x.out || 0; b.cr += x.cache_read || 0; b.cw += x.cache_write || 0;
    b.calls += 1; b.credits += x.credits || 0;
    m.set(key, b);
  }
  return m;
}

function printModelTable(perModel, indent, approx) {
  const rows = [...perModel.entries()].map(([k, b]) => {
    const inTok = b.in + b.cr + b.cw;
    const n = b.steps || b.calls || 0; // 事件日志用 steps；网关用 calls
    return { model: k, ...b, inTok, n, hit: inTok ? b.cr / inTok : 0, perStep: n ? Math.round(b.in / n) : 0 };
  }).sort((a, b) => (b.in + b.cr) - (a.in + a.cr));
  const tag = approx ? '≈' : ' ';
  for (const r of rows) {
    console.log(indent + tag + r.model.padEnd(40) +
      ' 入' + fmt(r.inTok).padStart(8) + ' (未命中' + fmt(r.in).padStart(7) + ' 缓存' + fmt(r.cr).padStart(8) + ')' +
      ' 出' + fmt(r.out).padStart(7) + ' 命中' + pct(r.hit).padStart(4) +
      ' 步' + String(r.n).padStart(4) + ' 每步未命中' + fmt(r.perStep) + (r.credits ? ' credits' + r.credits.toFixed(2) : ''));
  }
}

const gw = await fetchGateway();

if (onlySid) {
  if (!sessions.length) { console.log('未找到匹配会话: ' + onlySid); process.exit(0); }
  for (const s of sessions) {
    console.log('=== 会话 ' + s.sid + (s.title ? ' · ' + s.title : '') + ' ===');
    console.log('  cwd ' + s.cwd.replace(/-/g, '').slice(0, 30) + ' | 时间 ' + new Date(s.first).toISOString() + ' → ' + new Date(s.last).toISOString());
    console.log('  【每模型 token 清单（事件日志·精确）】');
    printModelTable(s.perModel, '   ', false);
    const inTok = s.tot.in + s.tot.cr + s.tot.cw;
    console.log('  合计 入' + fmt(inTok) + ' 出' + fmt(s.tot.out) + ' 命中' + pct(inTok ? s.tot.cr / inTok : 0) + ' steps' + s.tot.steps + ' | 模型数 ' + s.perModel.size);
    // 逐轮明细（仅 --session 模式）
    console.log('  【逐轮明细】');
    let curTurn = null;
    for (const t of s.perTurn) {
      if (t.turn !== curTurn) { curTurn = t.turn; console.log('   turn ' + curTurn); }
      console.log('     step ' + String(t.step).padStart(2) + ' ' + t.model.padEnd(36) + ' 入' + String(t.in + t.cr + t.cw).padStart(7) + '(未' + String(t.in).padStart(6) + ') 出' + String(t.out).padStart(5) + ' 缓存' + String(t.cr).padStart(7));
    }
    // 若网关里有本会话时间窗内的 route，追加 best-effort
    if (gw.trace && gw.trace.length) {
      const inWin = gw.trace.filter(x => { const tm = new Date(x.time).getTime(); return tm >= s.first - 5000 && tm <= s.last + 5000; });
      if (inWin.length) {
        console.log('  【网关·时间窗内路由（≈best-effort，含 orchestrate 子模型；最近60路由环形缓冲，仅供最近会话）】');
        const pm = new Map();
        for (const rt of inWin) for (const u of (rt.usage || [])) {
          const key = (u.provider || '?') + '/' + (u.model || '?');
          const b = pm.get(key) || { in: 0, out: 0, cr: 0, cw: 0, steps: 0, credits: 0 };
          b.in += u.in || 0; b.out += u.out || 0; b.cr += u.cache_read || 0; b.cw += u.cache_write || 0; b.steps += 1; b.credits += u.credits || 0;
          pm.set(key, b);
        }
        printModelTable(pm, '   ', true);
      }
    }
    console.log('');
  }
  process.exit(0);
}

// ===== 日/全量模式：每会话清单 =====
if (!sessions.length) { console.log('该时间段无有效会话（事件日志口径）。'); }

console.log('=== 每会话·每模型 token 清单 · ' + dayLabel + ' · ' + sessions.length + ' 个会话 ===');
console.log('口径：事件日志 assistant/message 的 usage + source.model 按 (provider/model) 精确汇总；主 agent 与 teammate 均覆盖。');
console.log('入 = 未命中+缓存读+缓存写；命中% = 缓存读/入；每步未命中 = 未命中/steps。\n');

// 全局每模型汇总（事件日志）
const globalModel = new Map();
for (const s of sessions) for (const [k, b] of s.perModel) {
  const g = globalModel.get(k) || { in: 0, out: 0, cr: 0, cw: 0, steps: 0 };
  g.in += b.in; g.out += b.out; g.cr += b.cr; g.cw += b.cw; g.steps += b.steps;
  globalModel.set(k, g);
}

sessions.sort((a, b) => (b.tot.in + b.tot.cr) - (a.tot.in + a.tot.cr));
for (const s of sessions) {
  const inTok = s.tot.in + s.tot.cr + s.tot.cw;
  const models = s.perModel.size;
  const multi = models > 1 ? ' [' + models + '个模型]' : '';
  console.log('● ' + s.sid.slice(0, 8) + ' ' + (s.title || '').slice(0, 24) + multi +
    '  | 入' + fmt(inTok) + ' 出' + fmt(s.tot.out) + ' 命中' + pct(inTok ? s.tot.cr / inTok : 0) + ' 步' + s.tot.steps);
  printModelTable(s.perModel, '     ', false);
}
console.log('\n');

console.log('=== 全局·每模型 token 汇总（事件日志·精确，跨本批会话）===');
printModelTable(globalModel, ' ', false);

// ===== 网关全局每模型（含 orchestrate 子模型，准确但不可回填历史会话）=====
if (gw.reqs && gw.reqs.length) {
  console.log('\n=== 网关·全局每模型（请求级 /v1/magpie/usage/requests，含 orchestrate 子模型）===');
  console.log('agent 区分：dsh=主/teammate 会话；AsyncOpenAI/OpenAI=orchestrator 子模型池。仅覆盖网关保留的请求窗口。');
  for (const agentTag of ['dsh', 'AsyncOpenAI', 'OpenAI', '*其它']) {
    const rows = gw.reqs.filter(x => agentTag === '*其它' ? !['dsh', 'AsyncOpenAI', 'OpenAI'].includes(x.agent) : x.agent === agentTag);
    if (!rows.length) continue;
    console.log(' [' + agentTag + '] ' + rows.length + ' 条请求');
    const m = aggGatewayByModel(rows, x => (x.provider || '?') + '/' + (x.served || x.model || '?'));
    printModelTable(m, '   ', false);
  }
} else if (!noGw) {
  console.log('\n[网关不可用或未返回请求级数据，跳过 orchestrate 子模型汇总]');
}

console.log('\n提示：会话级只从事件日志算（精确、完整）；orchestrator 子模型 token 只在网关侧（无 session_id、且 /trace 为最近60路由环形缓冲），故只能出全局口径 + 最近会话 best-effort（标 ≈）。');
