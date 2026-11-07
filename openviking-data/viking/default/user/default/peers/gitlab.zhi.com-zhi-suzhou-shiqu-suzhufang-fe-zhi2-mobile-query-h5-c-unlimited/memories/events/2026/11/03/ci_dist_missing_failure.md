# Summary
On 2026-11-03, GitLab CI for zhi2-mobile-query-h5-c-unlimited (苏住房防汛C端) failed with exit status 1 at `tar dist/*` reporting 'Cannot stat: No such file or directory'. The pipeline script nodejs-build.sh ran `install-dependencies` then `npm run test` (vitest, 20/20 passed), but the `test` script contained no build step, so no `dist/` was produced before tar.
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: [0KRunning with gitlab-runner 16.9.0 (656c1943)[0;m
[0K  on zhi-runner-pre WgnM5oiW, system ID: r_F1ksuTk5wX7U[0;m
section_start:1793687882:prepare_executor
[0K[0K[36;1mPreparing the "shell" executor[0;m[0;m
[0KUsing Shell (bash) executor...[0;m
section_end:1793687882:prepare_executor
[0Ksection_start:1793687882:prepare_script
[0K[0K[36;1mPreparing environment[0;m[0;m
Running on 32cb455cb14b...
section_end:1793687882:prepare_script
[0Ksection_start:1793687882:get_sources
[0K[0K[36;1mGetting source from Git repository[0;m[0;m
[32;1mFetching changes with git depth set to 1...[0;m
Initialized empty Git repository in /home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited/.git/
[32;1mCreated fresh repository.[0;m
[32;1mChecking out 04b0c7b5 as detached HEAD (ref is dev)...[0;m

[32;1mUpdating/initializing submodules recursively with git depth set to 1...[0;m
[32;1mUpdated submodules[0;m
section_end:1793687883:get_sources
[0Ksection_start:1793687883:step_script
[0K[0K[36;1mExecuting "step_script" stage of the job script[0;m[0;m
[32;1m$ /home/gitlab-runner/scripts/nodejs-build.sh[0;m
=========================================
Build Begin
PROFILE: dev
=========================================
-----------------------------------------
Environment Check:
Node version: v22.23.4
NPM version: 10.9.9
NODE_OPTIONS: --max-old-space-size=8192
Heap limit: 8240 MB
System memory:
              total        used        free      shared  buff/cache   available
Mem:           15Gi       2.6Gi       5.1Gi       785Mi       7.8Gi        11Gi
Swap:            0B          0B          0B
-----------------------------------------
Dependencies installation start.

> suzhufang-flood-mobile@0.1.0 install-dependencies
> node scripts/install-deps.mjs --no-audit --no-fund

[install-deps] 未检测到 Bun，回退到 npm 安装

[install-deps] $ npm install --no-audit --no-fund --legacy-peer-deps   (cwd=/home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited)
npm warn deprecated phin@2.9.3: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated phin@3.7.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.

added 620 packages in 4m
[install-deps] 安装测试工具链（独立 node_modules，避免 vite 版本冲突）

[install-deps] $ npm install --no-audit --no-fund --legacy-peer-deps --workspaces=false   (cwd=/home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited/tools/testing)

added 39 packages in 4s
Dependencies installed in 232 seconds.
Build start.
>>> Memory before build:
              total        used        free      shared  buff/cache   available
Mem:           15Gi       3.8Gi       7.3Gi       785Mi       4.4Gi        10Gi
Swap:            0B          0B          0B
>>> Node heap limit: 8240 MB
>>> Running: npm run test

> suzhufang-flood-mobile@0.1.0 test
> npm --prefix tools/testing run test

> test
> vitest run

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited[39m

 [32m✓[39m tests/request.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m tests/photos.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 13[2mms[22m[39m
 [32m✓[39m tests/counter.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 28[2mms[22m[39m
 [32m✓[39m tests/flood.test.ts [2m([22m[2m17 tests[22m[2m)[22m[32m 31[2mms[22m[39m

[2m Test Files [22m [1m[32m4 passed[39m[22m[90m (4)[39m
[2m      Tests [22m [1m[32m20 passed[39m[22m[90m (20)[39m
[2m   Start at [22m 14:41:57
[2m   Duration [22m 1.16s[2m (environment 65%, transform 20%, import 12%, tests 2%, worker 1%)[22m

Build success in 2 seconds.
---dev.tar.gz---
tar: dist/*: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
section_end:1793688118:step_script
[0K[31;1mERROR: Job failed: exit status 1
[0;m
dist没有生成到根目录?
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 是的，`dist` 没生成到根目录。原因不是构建输出路径错了，而是流水线根本没跑构建。

流水线脚本只执行了 `npm run test`，随后直接 `tar dist/*`。当时的 `test` 只跑 vitest，20 个单测都过了，但不会产出 `dist`，所以打包报 `Cannot stat: No such file or directory`。...

<!-- MEMORY_FIELDS
{
  "event_name": "ci_dist_missing_failure",
  "goal": "Explain CI tar failure",
  "summary": "On 2026-11-03, GitLab CI for zhi2-mobile-query-h5-c-unlimited (苏住房防汛C端) failed with exit status 1 at `tar dist/*` reporting 'Cannot stat: No such file or directory'. The pipeline script nodejs-build.sh ran `install-dependencies` then `npm run test` (vitest, 20/20 passed), but the `test` script contained no build step, so no `dist/` was produced before tar.",
  "ranges": "0-28,109",
  "source_extraction_id": "10819e945e134933a36c00a17e4499b4",
  "version": 1,
  "memory_type": "events"
}
-->