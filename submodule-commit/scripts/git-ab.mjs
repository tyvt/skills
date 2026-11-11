#!/usr/bin/env node
/**
 * git-ab.mjs — 打印「本地相对 upstream 的 ahead / behind」，杜绝读反
 * `git rev-list --left-right --count` 的左右两列（审计 P3-14：agent 曾把
 * `0  1` 读成「落后 1」，实际是「领先 1」，多做一次空转 rebase）。
 *
 * 用法：
 *   node git-ab.mjs                      # 当前目录，不 fetch
 *   node git-ab.mjs <worktree-path>      # 指定 worktree / 仓库路径
 *   node git-ab.mjs <worktree-path> --fetch <branch>   # 先 git fetch origin <branch>
 *
 * 输出（一行，便于模型解析）：
 *   ahead=<X> behind=<Y> upstream=<origin/branch> raw=<behind>\t<ahead>
 *
 * 语义（rev-list --left-right --count UPSTREAM...HEAD）：
 *   左列 = 只在 UPSTREAM 里的提交 = behind（本地缺的）
 *   右列 = 只在 HEAD 里的提交     = ahead（本地多的）
 * 本脚本在 Node 里用 execFileSync 传独立参数，不经过 shell，因此 `@{u}` 不会被
 * PowerShell 当成哈希字面量；也不受 `head/tail` 之类 POSIX 命令缺失影响。
 */

import { execFileSync } from "node:child_process";

const argv = process.argv.slice(2);

/** 取位置参数里的路径（第一个不以 `--` 开头的参数）。 */
function repoPath() {
  for (const a of argv) {
    if (!a.startsWith("--")) return a;
  }
  return process.cwd();
}

/** 取 `--fetch <branch>` 的 branch（可选）。 */
function fetchBranch() {
  const i = argv.indexOf("--fetch");
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : undefined;
}

function git(args, cwd) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

const cwd = repoPath();
const branch = fetchBranch();

try {
  if (branch) {
    git(["fetch", "origin", branch], cwd);
  }
} catch (error) {
  console.error(`git-ab: git fetch origin ${branch} 失败：${error.stderr?.toString?.() ?? error.message}`);
  process.exit(2);
}

let upstream;
try {
  upstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], cwd);
} catch {
  // 没有设置 upstream：退回 origin/<当前分支>。
  try {
    const cur = git(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
    upstream = `origin/${cur}`;
  } catch (error) {
    console.error(`git-ab: 无法确定 upstream：${error.message}`);
    process.exit(2);
  }
}

let raw;
try {
  raw = git(["rev-list", "--left-right", "--count", `${upstream}...HEAD`], cwd);
} catch (error) {
  console.error(`git-ab: rev-list 失败（upstream=${upstream}）：${error.message}`);
  process.exit(2);
}

// raw 形如 "0\t1" 或 "3\t2"。
const [behindStr, aheadStr] = raw.split(/\s+/);
const behind = Number(behindStr);
const ahead = Number(aheadStr);
if (!Number.isFinite(behind) || !Number.isFinite(ahead)) {
  console.error(`git-ab: 无法解析 rev-list 输出：${JSON.stringify(raw)}`);
  process.exit(2);
}

console.log(`ahead=${ahead} behind=${behind} upstream=${upstream} raw=${behind}\t${ahead}`);
