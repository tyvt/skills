# Summary
On 2026-11-04, after the outDir fix was merged and pushed to dev_wuxi-sfb, tag 202608171350 was deleted and re-cut to point to the new fixed commit d778f9f. The old tag had pointed to a790f5a7, which lacked the ./dist fix and caused the CI packaging failure.
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited]**: [0KRunning with gitlab-runner 16.9.0 (656c1943)[0;m
[0K  on zhi-runner-pre WgnM5oiW, system ID: r_F1ksuTk5wX7U[0;m
section_start:1793758033:prepare_executor
[0K[0K[36;1mPreparing the "shell" executor[0;m[0;m
[0KUsing Shell (bash) executor...[0;m
section_end:1793758033:prepare_executor
[0Ksection_start:1793758033:prepare_script
[0K[0K[36;1mPreparing environment[0;m[0;m
Running on 32cb455cb14b...
section_end:1793758033:prepare_script
[0Ksection_start:1793758033:get_sources
[0K[0K[36;1mGetting source from Git repository[0;m[0;m
[32;1mFetching changes with git depth set to 1...[0;m
Initialized empty Git repository in /home/gitlab-runner/builds/WgnM5oiW/0/zhi/huaian/all/wuguan/fe/zhi2-mobile-admin-h5-c-unlimited/.git/
[32;1mCreated fresh repository.[0;m
[32;1mChecking out a790f5a7 as detached HEAD (ref is 202608171350)...[0;m

[32;1mUpdating/initializing submodules recursively with git depth set to 1...[0;m
[32;1mUpdated submodules[0;m
section_end:1793758035:get_sources
[0Ksection_start:1793758035:step_script
[0K[0K[36;1mExecuting "step_script" stage of the job script[0;m[0;m
[32;1m$ /home/gitlab-runner/scripts/nodejs-build.sh[0;m
=========================================
Build Begin
PROFILE: rel
=========================================
-----------------------------------------
Environment Check:
Node version: v22.23.4
NPM version: 10.9.9
NODE_OPTIONS: --max-old-space-size=8192
Heap limit: 8240 MB
System memory:
              total        used        free      shared  buff/cache   available
Mem:           15Gi       6.2Gi       1.7Gi       785Mi       7.6Gi       8.2Gi
Swap:            0B          0B          0B
-----------------------------------------
Dependencies installation start.

> uni-preset-vue@0.0.0 install-dependencies
> npm i -f --no-audit --no-fund

npm warn using --force Recommended protections disabled.
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated phin@2.9.3: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated @volar/vue-typescript@1.0.24: WARNING: This project has been renamed to @vue/typescript. Install using @vue/typescript instead.
npm warn deprecated phin@3.7.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @babel/plugin-proposal-private-property-in-object@7.21.11: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-property-in-object instead.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
npm warn deprecated crypto-js@4.2.0: Active development of CryptoJS has been discontinued. This library is no longer maintained.
npm warn deprecated @dcloudio/uni-ui@1.4.28: @1.4.29
npm warn deprecated eslint@8.56.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 743 packages in 18s
Dependencies installed in 18 seconds.
Build start.
>>> Memory before build:
              total        used        free      shared  buff/cache   available
Mem:           15Gi       6.2Gi       1.4Gi       785Mi       7.9Gi       8.2Gi
Swap:            0B          0B          0B
>>> Node heap limit: 8240 MB
>>> Running: npm run build

> uni-preset-vue@0.0.0 build
> uni build --outDir ../dist

Compiling...
[warn]
../../static/images/history-szf.png referenced in /home/gitlab-runner/builds/WgnM5oiW/0/zhi/huaian/all/wuguan/fe/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/house/index.vue?vue&type=style&index=0&scoped=17c52e3b&lang.scss didn't resolve at build time, it will remain unchanged to be resolved at runtime
[warn]
../../static/images/svg/flag-szf.svg referenced in /home/gitlab-runner/builds/WgnM5oiW/0/zhi/huaian/all/wuguan/fe/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/sort/ResultStatistics.vue?vue&type=style&index=0&scoped=8d02c575&lang.scss didn't resolve at build time, it will remain unchanged to be resolved at runtime
[warn]
../../static/images/svg/flag-szf.svg referenced in /home/gitlab-runner/builds/WgnM5oiW/0/zhi/huaian/all/wuguan/fe/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/components/StepConfirm.vue?vue&type=style&index=0&scoped=00749cd9&lang.scss didn't resolve at build time, it will remain unchanged to be resolved at runtime
[warn] node_modules/eruda/eruda.js (2:375692) Use of eval in "node_modules/eruda/eruda.js" is strongly discouraged as it poses security risks and may cause issues with minification.
[log]
[log] 欢迎将web站点部署到uniCloud前端网页托管平台，高速、免费、安全、省心，详见：https://uniapp.dcloud.io/uniCloud/hosting
[log] DONE  Build complete.
Build success in 43 seconds.
---202608171350.tar.gz---
tar: dist/*: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
section_end:1793758097:step_script
[0K[31;1mERROR: Job failed: exit status 1
[0;m
...
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited]**: Push succeeded (`b40d788..d778f9f dev_wuxi-sfb -> dev_wuxi-sfb`). The exit 1 is just PowerShell treating git's stderr output as an error. Now re-cut tag `202608171350` to the new tip.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited]**: Tag `202608171350` now points to `d778f9f` on the remote. Everything is done. Let me clean up the worktree and verify final state.
**assistant [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited]**: Done. Worktree cleaned up, remote `dev_wuxi-sfb` tip is `d778f9f`, tag re-pointed.

## 结论：CI 失败根因已修复

**这不是编译问题，编译是成功的**（日志里 `Build complete`）。失败发生在最后打包步骤：

```
tar: dist/*: Cannot stat: No such file or directory
```

**根因**：本次流水线构建的是 tag `202608171350`（指向提交 `a790f5a7`，即 `dev_wuxi-sfb` 无锡苏服办分支的提交）。该分支的 `package.json` 仍是：

```
"build": "uni build --outDir ../dist"
```

`uni build` 把产物写到了**仓库根目录的上一级**（`.../fe/dist`），而打包脚本是在仓库根目录执行 `tar czf ...-202608171350.tar.gz dist/*`，根目录下根本没有 `dist/`，于是 tar 报错、job 以 `exit 1` 失败。

对照 `dev` 主分支，它早已把 outDir 改成 `./dist`（`9a2065d 修改编译命令`），产物落在仓库根、与 `tar dist/*` 匹配。`dev_wuxi-sfb` 这条发布线一直没同步这个修复。

**修复**：把 `dev_wuxi-sfb` 的 `test` / `build` 脚本 `../dist` → `./dist`。

**验证**（独立 worktree 内真实执行）：
- `npm run build` → `Build complete`，仓库根下生成 `dist/`（7 个条目）
- 模拟 CI 打包 `tar czf ...-202608171350.tar.gz dist/*` → exit 0，产物约 4.3 MB ✅

**落地结果**：
- 分支 `fix/ci-outdir-202608171350` → 已 fast-forward 合并回 `dev_wuxi-sfb` 并推送到 origin
- 重新打 tag `202608171350` 指向修复后提交 `d778f9f`（已删旧 tag 并推送）
- worktree 已清理，主工作区 `dev` 未受影响

如需触发流水线重跑，直接让 CI 基于新的 tag `202608171350`（或 `dev_wuxi-sfb`）重新构建即可，打包阶段不会再报 `dist/*` 找不到。

> 注：本次构建的 `202608171350` 是 tag 而非分支；`dev_wuxi-sfb` 是 `dev` 之外的一条独立发布线（曾派生出 `bac8cb8` 把 outDir 改回 `../dist` 的提交）。若后续其它版本分支也是从老基线上出的，可能有同样问题，需要一并排查。

<!-- MEMORY_FIELDS
{
  "event_name": "tag_recut_done",
  "goal": "Record tag re-point",
  "summary": "On 2026-11-04, after the outDir fix was merged and pushed to dev_wuxi-sfb, tag 202608171350 was deleted and re-cut to point to the new fixed commit d778f9f. The old tag had pointed to a790f5a7, which lacked the ./dist fix and caused the CI packaging failure.",
  "ranges": "0-39,119-134",
  "source_extraction_id": "8b6159ec325948c5b1b2438fddb2b790",
  "version": 1,
  "memory_type": "events"
}
-->