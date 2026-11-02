#!/usr/bin/env node
// token-frugal 审计脚本：读取 DSH session_projcache 的 tokenUsage/sessionStats，定位 token 浪费会话。
// 用法: node audit-tokens.mjs [YYYY-MM-DD]  (缺省=今天，时区 Asia/Shanghai)
import fs from 'fs';
import path from 'path';
import os from 'os';

const dir = path.join(os.homedir(), '.dsh', 'storages', 'session_projcache', 'sessions');
if (!fs.existsSync(dir)) { console.error('未找到 projcache 目录: ' + dir); process.exit(1); }

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
  const unc = t.uncachedInputTokens || 0, cr = t.cacheReadTokens || 0, out = t.outputTokens || 0;
  const inTok = unc + cr + (t.cacheWriteTokens || 0);
  const steps = s.steps || 0, turns = s.turns || 0;
  const hit = inTok ? cr / inTok : 0;
  const perStep = steps ? Math.round(unc / steps) : 0;
  const outRatio = unc ? out / unc : 0;
  if (inTok === 0 && steps === 0) continue; // 空会话跳过
  const sid = (f.match(/session-([0-9a-f-]+)\.json/) || [])[1] || f;
  const title = String(g('title') || '').slice(0, 30);
  const warn = hit < 0.75 || perStep > 12000;
  rows.push({ sid, title, unc, cr, out, inTok, hit, perStep, outRatio, steps, turns, warn });
}

if (!rows.length) { console.log('该时间段无有效会话。'); process.exit(0); }

const A = rows.reduce((a, r) => { for (const k of ['unc', 'cr', 'out', 'inTok', 'steps', 'turns']) a[k] += r[k]; return a; }, { unc: 0, cr: 0, out: 0, inTok: 0, steps: 0, turns: 0 });
console.log('=== token 审计 · ' + (arg || '今天') + ' · ' + rows.length + ' 个会话 ===');
console.log('总输入 ' + A.inTok.toLocaleString() + ' | 未命中 ' + A.unc.toLocaleString() + ' | 输出 ' + A.out.toLocaleString());
console.log('缓存命中率 ' + (A.cr / A.inTok * 100).toFixed(1) + '% | 平均每步未命中 ' + Math.round(A.unc / A.steps) + ' | 总 steps ' + A.steps);
console.log('\nsid      未命中    命中%  每步   步/turn 产出比  标题');
rows.sort((a, b) => b.unc - a.unc).forEach(r => {
  const flag = r.warn ? '⚠ ' : '  ';
  console.log(flag + r.sid.slice(0, 8) + ' ' + (r.unc / 1000).toFixed(0).padStart(7) + 'k ' +
    (r.hit * 100).toFixed(0).padStart(5) + '% ' + String(r.perStep).padStart(6) + ' ' +
    (r.steps / (r.turns || 1)).toFixed(1).padStart(6) + ' ' + (r.outRatio * 100).toFixed(1).padStart(5) + '%  ' + r.title);
});
const bad = rows.filter(r => r.warn).length;
console.log('\n⚠ 重点复盘: ' + bad + ' 个 (命中率<75% 或 每步未命中>12k)');
