#!/usr/bin/env node
/**
 * zentao-resolve.mjs — 禅道 Bug 回写固定序列生成器
 *
 * 用途：把「开事务 → UPDATE zt_bug → INSERT zt_action → 复核 → commit」封成固定脚本，
 *       参数只暴露 bugId 和 comment，杜绝漏 connection_name / 列数不匹配等复发错误。
 *
 * 用法（推荐用文件/base64 传 comment，彻底避开 shell 引号地狱）：
 *   node zentao-resolve.mjs <bugId> --comment-file <path>      # 从 UTF-8 文件读 comment
 *   node zentao-resolve.mjs <bugId> --comment-b64 <base64>     # 从 base64 读（跨 shell 最安全）
 *   node zentao-resolve.mjs <bugId> <commentHTML>              # 兼容旧用法（短文本）
 * 输出：可直接照抄执行的 mcp_gateway 调用序列（JSON），以及各步的预期核验点。
 *
 * 约束（与 DBX.md 一致）：
 *   - 只对新禅道库（connection_name: "新禅道"）写；每次调用都必须带 connection_name。
 *   - zt_action 严格 14 列，files 用 NULL 占位；`read` 必须反引号。
 *   - comment 走 HTML，写根因 + 修复 + 验证证据。
 *   - 含 `'` / 换行 / HTML 的 comment 不要走位置参数（bug6402 亲历：单引号破坏
 *     PowerShell 单引号字符串 → ParserError），改用 --comment-file 或 --comment-b64。
 */

import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const bugId = Number(argv[0]);

function flagValue(name) {
  const i = argv.indexOf(name);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : undefined;
}

function loadComment() {
  const trimEol = (s) => s.replace(/[\r\n]+$/, "");
  const file = flagValue("--comment-file");
  if (file) return trimEol(readFileSync(file, "utf8"));
  const b64 = flagValue("--comment-b64");
  if (b64) return trimEol(Buffer.from(b64, "base64").toString("utf8"));
  // 兼容旧位置参数：跳过已消费的 flag 对，取第一个非 flag 参数
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === "--comment-file" || argv[i] === "--comment-b64") { i++; continue; }
    if (!argv[i].startsWith("--")) return argv[i];
  }
  return "";
}

const comment = loadComment();

if (!Number.isInteger(bugId) || bugId <= 0) {
  console.error("用法: node zentao-resolve.mjs <bugId> [--comment-file <path> | --comment-b64 <base64> | <commentHTML>]（bugId 必须为正整数）");
  process.exit(1);
}
if (!comment.trim()) {
  console.error("comment 不能为空：需要根因 + 修复 + 验证证据（HTML）");
  process.exit(1);
}

const CONN = "新禅道";
const ACTOR = "tiany";
const esc = (s) => s.replace(/'/g, "''");

const steps = [
  {
    name: "1) 查现状（拿 product/project/execution/openedBy）",
    sql:
      `SELECT id,status,assignedTo,openedBy,product,project,execution,resolution ` +
      `FROM zt_bug WHERE id=${bugId};`,
    verify: "记录 openedBy（回写 assignedTo 用）与 product/project/execution 原值",
  },
  {
    name: "2) 开事务 session",
    call: {
      server: "dbx",
      tool: "dbx_open_session",
      arguments: { connection_name: CONN, enable_transactions: true },
    },
    verify: "取返回的 session_id，后续所有事务内调用都带它 + connection_name",
  },
  {
    name: "3) begin",
    call: {
      server: "dbx",
      tool: "dbx_begin_transaction",
      arguments: { connection_name: CONN, session_id: "<session_id>" },
    },
    verify: "成功后再执行第 4/5 步",
  },
  {
    name: "4) UPDATE zt_bug → resolved",
    sql:
      `UPDATE zt_bug SET status='resolved', resolution='fixed', resolvedBuild='trunk', ` +
      `resolvedBy='${ACTOR}', resolvedDate=NOW(), assignedTo='<openedBy>', ` +
      `lastEditedBy='${ACTOR}', lastEditedDate=NOW() WHERE id=${bugId};`,
    verify: "affected rows = 1",
  },
  {
    name: "5) INSERT zt_action（14 列，files=NULL 占位）",
    sql:
      `INSERT INTO zt_action ` +
      `(objectType,objectID,product,project,execution,actor,action,date,comment,files,extra,\`read\`,efforted,vision) ` +
      `VALUES ('bug',${bugId},'<product>','<project>','<execution>','${ACTOR}','resolved',NOW(),` +
      `'${esc(comment)}',NULL,'fixed',0,0,'rnd');`,
    verify: "affected rows = 1；product/project/execution 用第 1 步查到的原值",
  },
  {
    name: "6) 事务内复核",
    sql:
      `SELECT status,resolution,resolvedBy,resolvedDate,assignedTo FROM zt_bug WHERE id=${bugId};\n` +
      `SELECT actor,action FROM zt_action WHERE objectType='bug' AND objectID=${bugId} ORDER BY id DESC;`,
    verify: "status=resolved / resolution=fixed / resolvedBy / assignedTo 均符合预期",
  },
  {
    name: "7) commit",
    call: {
      server: "dbx",
      tool: "dbx_commit_transaction",
      arguments: { connection_name: CONN, session_id: "<session_id>" },
    },
    verify: "返回 committed 即成功；不再做无 session 的第二次复核",
  },
  {
    name: "8) 关 session",
    call: {
      server: "dbx",
      tool: "dbx_close_session",
      arguments: { connection_name: CONN, session_id: "<session_id>" },
    },
    verify: "结束",
  },
];

console.log(`# zt_bug ${bugId} 回写序列（connection_name=${CONN}，每步必带）\n`);
for (const s of steps) {
  console.log(`## ${s.name}`);
  if (s.call) {
    console.log("mcp_gateway " + JSON.stringify(s.call, null, 2));
  } else {
    const inTxn = /^[4-6]\)/.test(s.name);
    const arguments_ = { connection_name: CONN, sql: s.sql };
    if (inTxn) arguments_.session_id = "<session_id>";
    console.log(
      "mcp_gateway " +
        JSON.stringify(
          { server: "dbx", tool: "dbx_execute_query", arguments: arguments_ },
          null,
          2
        )
    );
  }
  console.log(`核验: ${s.verify}\n`);
}
