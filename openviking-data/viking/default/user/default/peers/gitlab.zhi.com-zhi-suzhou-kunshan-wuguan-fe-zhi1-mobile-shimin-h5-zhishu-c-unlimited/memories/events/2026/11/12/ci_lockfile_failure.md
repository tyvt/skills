# Summary
On 2026-11-12, a CI job for the zhi1-mobile-shimin-h5-zhishu-c project failed at `npm ci` with errors "Missing: crypto-js@4.1.1 from lock file" and "Missing: jsencrypt@3.0.0-rc.1 from lock file". Root cause: commit 0998dfe (feat: 新增响应解密拦截器 / response-decryption interceptor) added crypto-js@4.1.1 and jsencrypt@3.0.0-rc.1 to package.json but did not regenerate package-lock.json, so npm ci failed the sync check.
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
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: I see a CI failure from `npm ci`. Let me look into the actual repo state before deciding on a fix.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: The root cause is clear: `package.json` declares `crypto-js@4.1.1` and `jsencrypt@3.0.0-rc.1`, but `package-lock.json` isn't in sync. Let me check the lockfile and `.npmrc` changes.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: Confirmed root cause: commit `0998dfe` added `crypto-js@4.1.1` and `jsencrypt@3.0.0-rc.1` to `package.json` (for the response-decryption interceptor) but did **not** regenerate `package-lock.json`. CI runs `npm ci` which fails the sync check. Let me check `.npmrc` context and the uncommitted changes before planning the fix.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-mobile-shimin-h5-zhishu-c-unlimited]**: I have the full picture. Root cause: commit `0998dfe` bumped `package.json` with `crypto-js`/`jsencrypt` but didn't update `package-lock.json`, so CI's `npm ci` fails the sync check. The fix is to regenerate the lockfile. Let me write the plan (required before edits per workspace rules) and check the CI doctor reference.

<!-- MEMORY_FIELDS
{
  "event_name": "ci_lockfile_failure",
  "goal": "Record npm ci failure cause",
  "summary": "On 2026-11-12, a CI job for the zhi1-mobile-shimin-h5-zhishu-c project failed at `npm ci` with errors \"Missing: crypto-js@4.1.1 from lock file\" and \"Missing: jsencrypt@3.0.0-rc.1 from lock file\". Root cause: commit 0998dfe (feat: 新增响应解密拦截器 / response-decryption interceptor) added crypto-js@4.1.1 and jsencrypt@3.0.0-rc.1 to package.json but did not regenerate package-lock.json, so npm ci failed the sync check.",
  "ranges": "0-23",
  "source_extraction_id": "32944dce449f46dfa1d0b2fb5fc5e9d9",
  "version": 1,
  "memory_type": "events"
}
-->