#!/usr/bin/env node
/**
 * tool-call-hygiene / daily-report.mjs —— 每日合并日报（Token 消耗 + 失败日志 + 工作流根因）
 *
 * 只读复用三个已验证脚本，把它们的输出汇总成一份 markdown 落到 ~/.dsh/reports/：
 *   · audit-tokens.mjs             —— Token 总览 + 异常会话（按等效成本口径）
 *   · morning-report.mjs           —— 工具层+供应商层失败 今昨对比 + 开局该守
 *   · templates/workflow-audit.mjs —— goal / compaction / 重复整读 / 大结果 / 工具错误 工作流根因
 *
 * 用法：node daily-report.mjs [YYYY-MM-DD]   # 缺省=今天(Asia/Shanghai)
 * 不产生提交、不写 sessions，只落盘一份 markdown 报告（外加 morning-report 自带的那份）。
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TZ = 8 * 3600 * 1000;
// 按 Asia/Shanghai(+08:00) 取 YYYY-MM-DD，避免 UTC toISOString 把午夜回拨成前一天
function shanghaiYMD(ts) {
  const d = new Date(ts + TZ);
  const p = n => String(n).padStart(2, '0');
  return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate());
}
const arg = process.argv[2];
const dateLabel = arg || shanghaiYMD(Date.now());
const node = process.execPath;

const skillsRoot = path.dirname(__dirname); // D:\repository\skills（token-frugal 与 tool-call-hygiene 的共用根）
function run(relFromSkills, label) {
  const fp = path.join(skillsRoot, relFromSkills);
  try {
    return execFileSync(node, [fp, label], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 300000 });
  } catch (e) {
    return '（脚本执行失败: ' + relFromSkills + '）\n' + (e.stderr ? e.stderr.toString() : (e.message || ''));
  }
}

const tokenOut = run(path.join('token-frugal', 'audit-tokens.mjs'), dateLabel);
const flowOut = run(path.join('token-frugal', 'templates', 'workflow-audit.mjs'), dateLabel);
const morningOut = run(path.join('tool-call-hygiene', 'morning-report.mjs'), dateLabel);

const md = [
  '# 每日审计日报 · ' + dateLabel,
  '',
  '> 自动生成（只读复用 audit-tokens / workflow-audit / morning-report）。等效成本口径见 AGENTS.md：cacheRead×0.1 + uncached。',
  '',
  '## 一、Token 消耗（audit-tokens）',
  '```',
  tokenOut.trim(),
  '```',
  '',
  '## 二、失败日志（morning-report：工具层+供应商层 今昨对比）',
  '```',
  morningOut.trim(),
  '```',
  '',
  '## 三、工作流根因（workflow-audit：goal / compaction / 重复整读 / 大结果 / 工具错误）',
  '```',
  flowOut.trim(),
  '```',
  '',
  '---',
  '生成时间: ' + new Date().toISOString(),
].join('\n');

const reportDir = path.join(os.homedir(), '.dsh', 'reports');
fs.mkdirSync(reportDir, { recursive: true });
const outPath = path.join(reportDir, 'daily-report-' + dateLabel + '.md');
fs.writeFileSync(outPath, md);
console.log('每日日报已写入: ' + outPath);
