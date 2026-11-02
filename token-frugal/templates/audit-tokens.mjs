import fs from 'fs';
import path from 'path';
import os from 'os';

const dir = path.join(os.homedir(), '.dsh', 'storages', 'session_projcache', 'sessions');
const arg = process.argv[2];
let dayStart, dayEnd;
if (arg) {
  dayStart = new Date(arg + 'T00:00:00+08:00').getTime();
  dayEnd = dayStart + 24 * 3600 * 1000;
} else {
  const now = new Date();
  const s = new Date(now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + 'T00:00:00+08:00');
  dayStart = s.getTime(); dayEnd = dayStart + 24 * 3600 * 1000;
}

const rows = [];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.json')) continue;
  const p = path.join(dir, f);
  const st = fs.statSync(p);
  if (st.mtimeMs < dayStart || st.mtimeMs >= dayEnd) continue;
  let j; try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { continue; }
  const R = (j.record && j.record.rows) || {};
  const g = r => (R[r] && R[r].val) || {};
  const t = g('tokenUsage').totals || {};
  const s = g('sessionStats'), cb = g('contextBreakdown'), bd = cb.breakdown || {};
  const ms = g('modelSelection').lastUsed || {};
  const unc = t.uncachedInputTokens || 0, cr = t.cacheReadTokens || 0, out = t.outputTokens || 0;
  const inTok = unc + cr + (t.cacheWriteTokens || 0);
  const steps = s.steps || 0, turns = s.turns || 0;
  const hit = inTok ? cr / inTok : 0;
  const perStep = steps ? Math.round(unc / steps) : 0;
  const warn = hit < 0.75 || perStep > 12000;
  if (inTok === 0 && steps === 0) continue;
  const sid = (f.match(/session-([0-9a-f-]+)\.json/) || [])[1] || f;
  const title = String(g('title') || '').slice(0, 26);
  const cwd = ((j.record.identity || {}).cwd) || '';
  rows.push({ sid: sid.slice(0, 8), title, cwd, prov: ms.provider || '?', model: (ms.model || '?').slice(0, 28), plan: ms.reasoningEffort || '?',
    sysTokens: bd.systemTokens || 0, toolsTokens: bd.toolsTokens || 0, msgTokens: bd.messageTokens || 0,
    unc, cr, out, inTok, hit, perStep, steps, turns, msgs: s ? undefined : undefined, warn });
}

if (!rows.length) { console.log('no sessions'); process.exit(0); }

const A = rows.reduce((a, r) => { for (const k of ['unc', 'cr', 'out', 'inTok', 'steps', 'turns']) a[k] += r[k]; return a; }, { unc: 0, cr: 0, out: 0, inTok: 0, steps: 0, turns: 0 });
console.log('=== DEEP AUDIT ' + (arg || 'today') + ' · ' + rows.length + ' sessions ===');
console.log('total in ' + A.inTok.toLocaleString() + ' | unc ' + A.unc.toLocaleString() + ' | out ' + A.out.toLocaleString() + ' | hit ' + (A.cr / A.inTok * 100).toFixed(1) + '% | unc/step ' + Math.round(A.unc / A.steps) + ' | steps ' + A.steps + ' | turns ' + A.turns);

console.log('\n--- sorted by unc ---');
rows.sort((a, b) => b.unc - a.unc).forEach(r => {
  console.log(r.sid + ' unc=' + (r.unc / 1000).toFixed(0).padStart(6) + 'k hit=' + (r.hit * 100).toFixed(0).padStart(3) + '% /step=' + String(r.perStep).padStart(6) + ' steps=' + String(r.steps).padStart(4) + ' turns=' + String(r.turns).padStart(3) + ' out/unc=' + (r.out / (r.unc || 1) * 100).toFixed(0).padStart(3) + '% ' + r.prov + '/' + r.model + ' plan=' + r.plan + ' | ' + r.title);
});

console.log('\n--- context composition (approx current surface, per session) ---');
rows.forEach(r => {
  const tot = r.sysTokens + r.toolsTokens + r.msgTokens;
  const pct = v => tot ? (v / tot * 100).toFixed(0) + '%' : '0%';
  console.log(r.sid + ' sys=' + r.sysTokens + '(' + pct(r.sysTokens) + ') tools=' + r.toolsTokens + '(' + pct(r.toolsTokens) + ') msg=' + r.msgTokens + '(' + pct(r.msgTokens) + ') | ' + r.title);
});

console.log('\n--- provider/model grouping ---');
const byProv = {};
rows.forEach(r => { const k = r.prov + '/' + r.model + '|' + r.plan; (byProv[k] = byProv[k] || []).push(r); });
Object.entries(byProv).sort((a, b) => b[1].reduce((s, r) => s + r.unc, 0) - a[1].reduce((s, r) => s + r.unc, 0)).forEach(([k, rs]) => {
  const unc = rs.reduce((s, r) => s + r.unc, 0), cr = rs.reduce((s, r) => s + r.cr, 0), st = rs.reduce((s, r) => s + r.steps, 0);
  console.log(k + ' | n=' + rs.length + ' unc=' + (unc / 1000).toFixed(0) + 'k hit=' + (cr / (unc + cr) * 100).toFixed(1) + '% /step=' + Math.round(unc / st) + ' steps=' + st);
});
