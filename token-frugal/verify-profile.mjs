#!/usr/bin/env node
/**
 * verify-profile.mjs — DSH profile 优化项守门员
 *
 * 每次 DSH 重启 / Magpie 覆盖后跑一次，一条命令确认「token 优化配置」是否还在生效：
 *   node verify-profile.mjs           # 校验 web profile（默认）
 *   node verify-profile.mjs headless  # 校验 headless profile
 *
 * 校验项（源自 2026-10-27/28 的优化，见 token-frugal skill）：
 *   A. mcp-gateway 按需网关在（旧 mcp-dbx / mcp-context-mode 常驻已移除）
 *   B. modelPolicies 对所有 flash 模型钳 thresholdRatio 0.1024（1M 窗口下压缩线回到 ~102k）
 *   C. preset-lean 已清理
 *   D. tool-result-pruner 在（大工具输出裁剪）
 *   E. 若给了 --port <n>，探测端口上 DSH 进程启动时间 vs cordis.patch.yml 修改时间，警告「改了配置但没重启」
 *
 * 退出码 0 = 全绿；1 = 有 FAIL 或 WARN。
 */
import { execFileSync, spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const args = process.argv.slice(2);
const profile = args.find(a => !a.startsWith('--')) || 'web';
const portIdx = args.indexOf('--port');
const port = portIdx >= 0 ? args[portIdx + 1] : null;

// ---- 定位 dsh bin ----
function findDshBin() {
  const cands = [
    'D:\\nvm\\nodejs\\node_modules\\@deepseek-ai\\dsh\\lib\\bin.js',
    path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js'),
  ];
  for (const c of cands) if (fs.existsSync(c)) return c;
  throw new Error('未找到 dsh bin.js，请手动指定 DSH_BIN');
}

let failures = 0, warns = 0;
function check(label, cond, detail) {
  if (cond) console.log('ok   ' + label);
  else { failures++; console.log('FAIL ' + label + (detail === undefined ? '' : ': ' + detail)); }
}
function warn(label, detail) { warns++; console.log('WARN ' + label + (detail ? ': ' + detail : '')); }

// ---- 拿 dump-config（spawnSync 同取 stdout + stderr；stderr 里有 patch 报错）----
let dump = '', dumpErr = '';
try {
  const bin = findDshBin();
  const r = spawnSync(process.execPath, [bin, '--profile', profile, '--dump-config'], { encoding: 'utf8' });
  if (r.status !== 0) { console.error('dump-config 退出码 ' + r.status + ': ' + (r.stderr || '').slice(0, 300)); process.exit(1); }
  dump = r.stdout || '';
  dumpErr = r.stderr || '';
} catch (e) {
  console.error('无法 dump-config: ' + e.message);
  process.exit(1);
}
const lines = dump.split('\n');

// A. mcp-gateway 在，旧常驻已移除
check('mcp-gateway 按需网关已注册', /id:\s*mcp-gateway\b/.test(dump) && /name:\s*dsh-mcp-gateway/.test(dump));
const oldMcp = (dump.match(/mcp-dbx|mcp-context-mode|id:\s*mcp__/g) || []).length;
check('旧常驻 MCP（mcp-dbx/mcp-context-mode）已移除', oldMcp === 0, '仍存在 ' + oldMcp + ' 处');

// B. modelPolicies：所有 flash 模型 thresholdRatio 应为 0.1024
const polStart = lines.findIndex(l => /modelPolicies:/.test(l));
if (polStart < 0) {
  check('modelPolicies 存在', false, '未找到 modelPolicies 段');
} else {
  // 收集紧随其后的 - provider/model/thresholdRatio 三元组，直到缩进回退
  const indent = lines[polStart].match(/^\s*/)[0].length;
  const models = [];
  for (let i = polStart + 1; i < lines.length; i++) {
    const ln = lines[i];
    if (ln.trim() === '') continue;
    const ind = ln.match(/^\s*/)[0].length;
    if (ind <= indent && ln.trim() && !ln.trim().startsWith('-')) break;
    const mm = ln.match(/model:\s*(\S+)/); if (mm) models.push({ model: mm[1], ratio: null });
    const rm = ln.match(/thresholdRatio:\s*([\d.]+)/); if (rm && models.length) models[models.length - 1].ratio = parseFloat(rm[1]);
    if (models.length >= 20) break;
  }
  const flash = models.filter(m => /flash/i.test(m.model));
  const bad = flash.filter(m => m.ratio !== 0.1024);
  check('flash 模型 modelPolicies 全部 thresholdRatio=0.1024', flash.length > 0 && bad.length === 0,
    flash.length === 0 ? '未识别到 flash 模型' : bad.map(m => m.model + '=' + m.ratio).join(', '));
}

// C. preset-lean 已清理
const lean = (dump.match(/preset-lean|id:\s*lean\b/g) || []).length;
check('preset-lean 已清理', lean === 0, '仍存在 ' + lean + ' 处');

// D. tool-result-pruner 在
check('tool-result-pruner 大输出裁剪已启用', /tool-result-pruner|dsh-compaction-tool-result-pruner/.test(dump));

// F. 孤儿 patch：dump 时 stderr 报 entry not found（cordis.patch.yml 引用了未注册条目）
const orphan = [...new Set((dumpErr.match(/entry "[^"]+" not found/g) || []))];
if (orphan.length) warn('孤儿 patch（引用了未注册条目，每次启动报错）: ' + orphan.join('; '), '清理 cordis.patch.yml 里对应 id 的 patch 块');
else console.log('ok   无孤儿 patch（无 entry not found 报错）');

// G. 默认模型锁定：默认模型必须是高缓存命中档，不能是 trae-cn / opencode-zen-free / cursor
//    （实测 2026-10-29：trae 38%、cursor 50-54%、opencode-free 69% vs workbuddy-ai-flash 93-98%）
{
  const i = lines.findIndex(l => /id:\s*agent-default-model\b/.test(l));
  let model = '';
  if (i >= 0) for (let k = i + 1; k < Math.min(lines.length, i + 12); k++) {
    const mm = lines[k].match(/^\s*model:\s*["']?([^"'\s#]+)/);
    if (mm) { model = mm[1]; break; }
  }
  const banned = /(^|\/)(trae-cn|opencode-zen-free|cursor)\b/;
  if (!model) check('默认模型已锁定（高缓存档）', false, '未在 agent-default-model 里找到 model');
  else check(`默认模型已锁定（高缓存档）: ${model}`, !banned.test(model),
    `默认模型 ${model} 属低缓存路由，长任务会成倍烧未命中；改回 workbuddy-ai/deepseek-v4.1-flash`);
}

// E. 改了配置但没重启检测
if (port) {
  try {
    const patch = path.join(os.homedir(), '.dsh', 'profiles', profile, 'cordis.patch.yml');
    const patchMtime = fs.statSync(patch).mtimeMs;
    // 找监听该端口的进程，取创建时间（用 netstat + wmic 替代 net Get-NetTCPConnection 依赖）
    const psOut = execFileSync('powershell', ['-NoProfile', '-Command',
      `$c=Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue; if($c){$p=Get-CimInstance Win32_Process -Filter "ProcessId=$($c.OwningProcess)"; Write-Output ([string]$p.CreationDate+'|'+$p.ProcessId)}`
    ], { encoding: 'utf8' }).trim();
    if (psOut) {
      const [cd, pid] = psOut.split('|');
      const procStart = new Date(cd).getTime();
      if (patchMtime > procStart) {
        warn(`配置比进程新：cordis.patch.yml (${new Date(patchMtime).toLocaleString()}) 晚于端口 ${port} 进程 PID ${pid} (${new Date(procStart).toLocaleString()})`, '改完配置未重启，当前进程可能仍跑旧配置');
      } else {
        console.log('ok   配置已随当前进程加载（patch 不晚于进程启动）');
      }
    } else {
      warn(`端口 ${port} 无监听进程`);
    }
  } catch (e) {
    warn('端口/进程检测失败', e.message);
  }
}

console.log('');
if (failures === 0 && warns === 0) { console.log('ALL GREEN ✅  优化配置全部生效'); process.exit(0); }
else { console.log(`${failures} FAIL / ${warns} WARN`); process.exit(1); }
