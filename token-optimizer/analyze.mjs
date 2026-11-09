#!/usr/bin/env node
// token-optimizer 审计脚本：从 DSH session_projcache 投影缓存（与 dsh-context 插件 Context Insights 同源）
// 产出「可执行的降本清单」：等效成本 TOP、低缓存会话、provider/模型每步未命中、上下文组成、高压力会话。
// 用法: node analyze.mjs [目录]   (缺省 = ~/.dsh/storages/session_projcache/sessions)
// 只读，不写任何文件。
import fs from 'fs';
import path from 'path';
import os from 'os';

const dir = process.argv[2] || path.join(os.homedir(), '.dsh', 'storages', 'session_projcache', 'sessions');
if (!fs.existsSync(dir)) { console.error('未找到 projcache 目录: ' + dir); process.exit(1); }

const files = fs.readdirSync(dir).filter(f => f.startsWith('session-') && f.endsWith('.json'));
const sessions = [];
let skipped = 0;
for (const f of files) {
  let o;
  try { o = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { skipped++; continue; }
  const rows = (o.record || o).rows || {};
  const g = r => (rows[r] && rows[r].val) || {};
  const tu = g('tokenUsage').totals;
  if (!tu) { skipped++; continue; }
  const stats = g('sessionStats');
  const ms = (g('modelSelection').lastUsed) || {};
  const cb = g('contextBreakdown'); const bd = cb.breakdown || {};
  const cp = g('contextPressure');
  const title = String(g('title') || '');
  const uncached = tu.uncachedInputTokens || 0;
  const cacheRead = tu.cacheReadTokens || 0;
  const output = tu.outputTokens || 0;
  const steps = stats.steps || 0, turns = stats.turns || 0;
  if (uncached + cacheRead + output === 0) { skipped++; continue; }
  const equiv = cacheRead * 0.1 + uncached + output * 4; // 等效成本：缓存读≈未命中1/10，输出≈4x
  const hitRate = (cacheRead + uncached) > 0 ? cacheRead / (cacheRead + uncached) : 0;
  sessions.push({
    f, title, uncached, cacheRead, output, steps, turns,
    provider: ms.provider || '?', model: ms.model || '?',
    equiv, hitRate, perStep: steps ? uncached / steps : 0,
    window: cp.contextWindow || 0, pressure: cp.pressureTokens || 0,
    msgTokens: bd.messageTokens || 0, sysTokens: bd.systemTokens || 0, toolsTokens: bd.toolsTokens || 0,
  });
}

const sum = (arr, k) => arr.reduce((a, x) => a + x[k], 0);
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(Math.round(n));

const totU = sum(sessions, 'uncached'), totC = sum(sessions, 'cacheRead'), totO = sum(sessions, 'output');
const totEquiv = sum(sessions, 'equiv'), totSteps = sum(sessions, 'steps'), totTurns = sum(sessions, 'turns');
const hit = totC / (totC + totU || 1);

console.log(`会话总数: ${files.length}  有效: ${sessions.length}  跳过: ${skipped}`);
console.log('==============================================================');
console.log('【KPI 总览】(投影缓存口径 = dsh-context Context Insights 同源)');
console.log(`  计费输入总量   : ${fmt(totC + totU)}  (cacheRead ${fmt(totC)} + uncached ${fmt(totU)})`);
console.log(`  输出总量       : ${fmt(totO)}`);
console.log(`  缓存命中率     : ${(hit * 100).toFixed(1)}%`);
console.log(`  总步数/轮数    : ${totSteps} steps / ${totTurns} turns`);
console.log(`  平均每步未命中 : ${Math.round(totU / (totSteps || 1))}`);
console.log(`  等效成本(相对) : ${fmt(totEquiv)}  (cacheRead×0.1 + uncached + output×4)`);
console.log(`  成本结构       : 缓存读占 ${(totC * 0.1 / totEquiv * 100).toFixed(0)}% | 未命中占 ${(totU / totEquiv * 100).toFixed(0)}% | 输出占 ${(totO * 4 / totEquiv * 100).toFixed(0)}%`);

const byProv = {};
for (const s of sessions) {
  const key = `${s.provider}/${s.model}`;
  const b = byProv[key] = byProv[key] || { n: 0, uncached: 0, cacheRead: 0, equiv: 0, steps: 0 };
  b.n++; b.uncached += s.uncached; b.cacheRead += s.cacheRead; b.equiv += s.equiv; b.steps += s.steps;
}
console.log('\n【按 provider/模型】(缓存可靠性 + 成本贡献)');
console.log('  provider/model                     会话  命中%   未命中    等效成本  每步未命中');
for (const [k, b] of Object.entries(byProv).sort((a, c) => c[1].equiv - a[1].equiv)) {
  const h = b.cacheRead / (b.cacheRead + b.uncached || 1);
  console.log(`  ${k.padEnd(34)} ${String(b.n).padStart(4)}  ${(h * 100).toFixed(0).padStart(4)}%  ${fmt(b.uncached).padStart(7)}  ${fmt(b.equiv).padStart(8)}  ${Math.round(b.uncached / (b.steps || 1))}`);
}

console.log('\n【等效成本 TOP 15 会话】(降本首要目标)');
console.log('  sid       等效成本  未命中    命中%  每步未命中 步数  模型             标题');
for (const s of [...sessions].sort((a, b) => b.equiv - a.equiv).slice(0, 15)) {
  console.log(`  ${s.f.slice(8, 16)}  ${fmt(s.equiv).padStart(7)}  ${fmt(s.uncached).padStart(7)}  ${(s.hitRate * 100).toFixed(0).padStart(4)}%  ${String(Math.round(s.perStep)).padStart(8)}  ${String(s.steps).padStart(4)}  ${(s.provider + '/' + s.model).padEnd(16)} ${s.title.slice(0, 18)}`);
}

const low = sessions.filter(s => s.hitRate < 0.7 && s.uncached > 500000);
console.log(`\n【低缓存会话 (命中<70% 且 未命中>0.5M) 共 ${low.length} 个】典型重算型浪费`);
for (const s of low.sort((a, b) => b.uncached - a.uncached).slice(0, 12)) {
  console.log(`  ${s.f.slice(8, 16)} 命中${(s.hitRate * 100).toFixed(0)}% 未命中${fmt(s.uncached)} 每步${Math.round(s.perStep)} ${s.provider}/${s.model} · ${s.title.slice(0, 16)}`);
}

const withCp = sessions.filter(s => s.msgTokens + s.sysTokens + s.toolsTokens > 0);
const avgMsg = sum(withCp, 'msgTokens') / (withCp.length || 1);
const avgSys = sum(withCp, 'sysTokens') / (withCp.length || 1);
const avgTools = sum(withCp, 'toolsTokens') / (withCp.length || 1);
const avgTotal = avgMsg + avgSys + avgTools || 1;
console.log(`\n【上下文组成 (有组成数据的 ${withCp.length} 会话均值)】`);
console.log(`  message ${fmt(avgMsg)} (${(avgMsg / avgTotal * 100).toFixed(0)}%)  system ${fmt(avgSys)} (${(avgSys / avgTotal * 100).toFixed(0)}%)  tools ${fmt(avgTools)} (${(avgTools / avgTotal * 100).toFixed(0)}%)`);
console.log('  → 消息历史占大头，压每步上下文 = 压消息历史');

const hot = sessions.filter(s => s.window > 0 && s.pressure / s.window > 0.6);
console.log(`\n【高压力会话 (压力>60%窗口) 共 ${hot.length} 个】应收尾/换会话`);
for (const s of hot.sort((a, b) => (b.pressure / b.window) - (a.pressure / a.window)).slice(0, 8)) {
  console.log(`  ${s.f.slice(8, 16)} 压力${(s.pressure / s.window * 100).toFixed(0)}% (${fmt(s.pressure)}/${fmt(s.window)}) ${s.title.slice(0, 20)}`);
}

console.log('\n==============================================================');
console.log('【自动优化建议】');
if (hit < 0.9) console.log(`  · 全局命中率 ${(hit * 100).toFixed(1)}% 偏低：检查是否在用 cursor/grok/trae 等低缓存路由跑长任务。`);
const totalM = totEquiv;
const topShare = [...sessions].sort((a, b) => b.equiv - a.equiv).slice(0, 5).reduce((a, s) => a + s.equiv, 0) / totalM;
console.log(`  · 等效成本 TOP5 会话占 ${(topShare * 100).toFixed(0)}%：优先复盘这 5 个，按「一子任务一会话」拆片。`);
if (low.length) console.log(`  · ${low.length} 个低缓存会话（命中<70%）：判为重算型事故，检查 goal 续跑/compaction 失败/大结果回灌。`);
if (hot.length) console.log(`  · ${hot.length} 个会话压力>60% 窗口：下一轮前收尾或开新会话。`);
console.log(`  · 消息占 ${(avgMsg / avgTotal * 100).toFixed(0)}%：read 用 offset/limit、大输出先过滤、同文件只整读一次。`);
