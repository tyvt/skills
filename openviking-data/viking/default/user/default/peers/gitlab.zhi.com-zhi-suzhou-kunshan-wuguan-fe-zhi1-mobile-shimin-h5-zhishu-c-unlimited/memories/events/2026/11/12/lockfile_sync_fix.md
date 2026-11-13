# Summary
On 2026-11-12, the lockfile mismatch was fixed by running `npm install --package-lock-only --no-audit --no-fund` (using the npmmirror source from .npmrc), adding 14 lines to package-lock.json for crypto-js@4.1.1 and jsencrypt@3.0.0-rc.1 (lockfileVersion remained 3, all resolved URLs npmmirror). Committed as e81b937 (only package-lock.json, +14 lines) and pushed to origin/main (0998dfe..e81b937). Verified with a real `npm ci --ignore-scripts` in a clean temp dir: exit 0, 584 packages installed; also passed npm ci --dry-run and node scripts/ci-doctor.mjs ("依赖环境就绪"). Unrelated working-tree changes (.npmrc, vite.config.js, bunfig.toml.bak) were left untouched.
# 2026-11-12 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Missing: crypto-js@4.1.1 from lock file
npm error Missing: jsencrypt@3.0.0-rc.1 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: /home/gitlab-runner/.npm/_logs/2026-11-12T10_05_48_456Z-debug-0.log
ERROR: Job failed: exit status 1
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: User confirmed. Let me set the plan frontmatter to approved and execute.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Now regenerate the lockfile. This only touches package-lock.json (no node_modules install, no scripts).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: "up to date" — suspicious: it may have used an existing tree without re-resolving. Let me verify the lockfile now contains the deps.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: The lockfile now has both deps. "up to date" just meant it resolved cleanly. Now verify scope — only package-lock.json changed, and diff magnitude.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Excellent. package-lock.json diff is exactly **+14/-0 lines** (well within threshold), lockfileVersion still 3, all resolved URLs still npmmirror. The `.npmrc`/`vite.config.js` are the pre-existing unrelated changes (not from this run). Let me confirm the 14 added lines are only the two dep nodes.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Clean: exactly the two dependency declarations + their two node entries. No unrelated changes. Now run the sync verification: `npm ci --dry-run` and ci-doctor.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: `npm ci --dry-run` no longer errors on lock sync — it now resolves and reports what it *would* install (606 added because node_modules would be refreshed, but that's dry-run only; no "Missing from lock file" error). ci-doctor concludes "依赖环境就绪".

Let me run the full verification: the Node assertion check plus the terminal acceptance test — a real `npm ci` in a clean temp worktree to prove the lockfile is actually installable (reviewer's suggestion #5).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Now the real terminal acceptance test. `npm ci` needs the lockfile + package.json; I'll create a temp dir with just those two files and run a real `npm ci --ignore-scripts` (ignore-scripts avoids canvas native compile hangs; lockfile resolution is what we're validating).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: **Real `npm ci` succeeded in a clean directory — exit 0, 584 packages installed, no lockfile sync error.** The fix is proven installable, not just dry-run. Let me clean up the temp dir and commit only package-lock.json.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: All verification passed. Now commit **only** `package-lock.json` (leaving `.npmrc`, `vite.config.js`, `bunfig.toml.bak` untouched).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Only `package-lock.json` is staged. Commit it.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Committed as `e81b937`, 1 file changed (+14 lines). Let me confirm state and then ask about pushing.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: User chose push. Let me push to origin/main.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Pushed successfully (`0998dfe..e81b937 main -> main`). Let me finalize the todo list.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: CI 失败已修复并推送完成。

## 根因
提交 `0998dfe feat: 新增响应解密拦截器` 在 `package.json` 里新增了 `crypto-js@4.1.1` 与 `jsencrypt@3.0.0-rc.1`，但**没有同步重算 `package-lock.json`**，导致 CI 的 `npm ci` 因锁文件不同步直接报错退出：
```
Missing: crypto-js@4.1.1 from lock file
Missing: jsencrypt@3.0.0-rc.1 from lock file
```

## 修复
- `npm install --package-lock-only --no-audit --no-fund`（沿用 .npmrc 的 npmmirror 源，未全量重装 node_modules）
- 仅 `package-lock.json` 变更，**+14 行**：两个依赖声明 + 两个 `node_modules/<pkg>` 节点，无任何无关版本变动，lockfileVersion 仍为 3，resolved 全为 npmmirror。

## 验证（全部通过）
1. `node -e` 断言：两依赖均在 `packages[""].dependencies` 与对应 node 节点 → **ASSERT PASS**
2. `npm ci --dry-run`：不再报 "Missing from lock file"
3. `node scripts/ci-doctor.mjs`：结论「依赖环境就绪」
4. **真实 `npm ci`**：在干净临时目录执行 → 退出码 0，安装 584 包成功（终态验收，非仅 dry-run）

## 提交
- 提交 `e81b937 chore(ci): 同步 package-lock.json 补齐 crypto-js/jsencrypt 依赖`（仅 package-lock.json）
- 已推送 `origin/main`：`0998dfe..e81b937`
- 工作区无关改动（`.npmrc`、`vite.config.js`、`bunfig.toml.bak`）**未纳入**本次提交，保持原样。

CI 复跑应可通过。计划留档于 `.plan/ci-lockfile-fix.md`。

<!-- MEMORY_FIELDS
{
  "event_name": "lockfile_sync_fix",
  "goal": "Record lockfile fix and push",
  "summary": "On 2026-11-12, the lockfile mismatch was fixed by running `npm install --package-lock-only --no-audit --no-fund` (using the npmmirror source from .npmrc), adding 14 lines to package-lock.json for crypto-js@4.1.1 and jsencrypt@3.0.0-rc.1 (lockfileVersion remained 3, all resolved URLs npmmirror). Committed as e81b937 (only package-lock.json, +14 lines) and pushed to origin/main (0998dfe..e81b937). Verified with a real `npm ci --ignore-scripts` in a clean temp dir: exit 0, 584 packages installed; also passed npm ci --dry-run and node scripts/ci-doctor.mjs (\"依赖环境就绪\"). Unrelated working-tree changes (.npmrc, vite.config.js, bunfig.toml.bak) were left untouched.",
  "ranges": "0-8,43-85",
  "source_extraction_id": "32944dce449f46dfa1d0b2fb5fc5e9d9",
  "version": 1,
  "memory_type": "events"
}
-->