# zhi2-web-admin Git Submodule
zhi2-web-admin 是父仓「门户」的独立 git 子模块，改动经 submodule worktree 落地。

## Workflow
- 标准链路：子模块 worktree 开发 → commit → 快进合并进 develop/v3.0.0 推送 → 父仓提交 gitlink（`M zhi2-web-admin`）推送 → 删 worktree 与临时分支。
- 例外「在主线上做」（均在 develop/v2.6.2-suzhufang）：task2295 月度报表导出；2026-11-24 bug6903 隐患按钮右移（子模块 `5b6400983`/父仓 `6eef297`）、bug6915（子模块远端 `d9ed05cc7`/父仓 `36f559c`）、bug6932 录入分值现场图片逐项独立（子模块 `fee36597d`/父仓 `3315a33`）、bug6950 资金拨付作废 GET→POST（子模块 `79093564e` 连同既有 parkingSpace 提交 `e4430964e`，父仓 `2d3ca6cc`），推送后远程 SHA 均一致。
- 他人脏文件 `ScreenHeader.vue`、`particles.js`、`_review.json` 与父仓 `env/.env` 本地代理切换一律不纳入提交；2026-11-24 判定子模块 `public/version.json`（受保护构建产物，禁 git add）、`report.html`（3.5MB 已跟踪 build 报告，删除会产生 `D` 状态）、`_review.json`（早于任务 8 天的历史文件）均保留不删。
- 嵌套子模块 worktree（`.git` → `.git/worktrees/.../modules/zhi2-web-admin`）文件为空，需在新父仓 worktree 内 `git submodule update --init`；父仓 `-b` 只建父仓分支，子模块任务分支另建（2026-11-09 fix/contract-version-dialog-public-component 从干净 HEAD 建 worktree 与同名子模块分支；worktree `D:\repository\苏州市房地产监测V3-wt-bug-6363` 的子模块分支 `fix/bug-6363-attachment-lost` 基于 `6009ddf16`）。
- 父仓只 add 子模块指针、勿带 dirty 的防汛文件；避免 PowerShell `export &&` 链（静默失败），改 pwsh 设 env + 分号链并核对新 SHA。父仓 behind=1 时先 `pull --rebase`（设 `GIT_EDITOR` 免交互）再 add gitlink 提交推送，2026-11-24 bug6950 即此路（gitlink `6a95e30→7909356`）。

## Build / Lint
- worktree 无 node_modules：workspaces 依赖提升到父仓，worktree 在主目录外致 Node 向上查找错过根 node_modules；不要 junction 主 node_modules（残缺依赖），应干净 `npm install`（禁 husky）；SFC 编译检查借主工作区 node_modules（纯 Vue2 Options API 写法一致即安全），构建验证放主工作区（worktree 的 vite 更严可能失败）。
- Lint 门：`eslint-plugin-duplicate-attributes: "file:eslint-rules"` 依赖主工作区 eslint-rules/ 与 node_modules，缺失致 `npm run lint` 加载失败；worktree 干净 install 恢复插件后可跑，但全库基线为红（2026-11-09 共 12,509 条），真正的门是改动文件零引用；备选 ESLint 8 `--resolve-plugins-relative-to` 主仓；另按「改完必编译」跑生产构建。
- 禁用 PowerShell Get/Set-Content 处理中文 Vue 文件（破坏 UTF-8+BOM），改用读写工具。
- 榆林 worktree 与主仓共用 vite rootDir `D:/repository/榆林G` 覆盖同一 dist → 用 `--outDir` 隔离；榆林改动只落 develop/v2.6.2-yulin（无父仓分支）。

## Parallel / Remote
- 远程 develop/v3.0.0 并行前进不可快进 → 禁止 force push：fix 分支合并进子模块 develop/v3.0.0 并推送，再在父仓合并远程 develop 把 gitlink 冲突解到新子模块 head；同文件冲突两边都保留；用 merge 而非 rebase 以保留父仓 gitlink commit hash；远程 CI 的 unused-files vite.config.js 修复可合并进子模块。
- 同文件并行冲突例：#6337 beginDialogAsyncLoad 乱序守卫 vs #6235 paginateRows 切片（chooseHouseDialog.vue）→ 两方法都留，用 applyOriginPage（paginateRows 切片 + syncOriginSelection）。
- 仅落后 origin 时：fix 分支 rebase 到 origin/develop/v3.0.0 使推送成快进，单 gitlink 提交干净重放、子模块 SHA 不变；远程再前进则子模块 rebase 到新 origin tip、重指父仓 gitlink、再 rebase 父仓。

## Cleanup & Recovery
- worktree 清理：有 junction 到主 node_modules 先 `cmd /c rmdir` 再删 worktree；含子模块时 git 拒删 → 删自身目录后 prune。
- 2026-11-09 worktree 内合并 develop/v3.0.0（子模块 tip `c29dcdb87`、父仓 tip `2892034`，gitlink 解到 `c29dcdb87`）：恢复主父仓失败因 worktree 仍占用 develop（分支被锁）→ 先 detach 释放 develop 再恢复；wtSub 与 mainSub 是不同仓库，主子模块无碍。
- 子模块 .git 链接丢失时 `git -C $sub` 静默落到父仓 → 推送前恢复链接；误删 worktree 可用恢复链接 + checkout 找回，无损失。
- 2026-11-09 误删主工作区 zhi2-web-admin 的 .git 链接、worktree 与 node_modules：保留 gitdir 重建链接 + `reset --hard HEAD` 找回跟踪文件，`npm install` 恢复 870 依赖，git status 干净、构建通过，无损失。

<!-- MEMORY_FIELDS
{
  "category": "git_submodule",
  "name": "zhi2_admin_git",
  "source_extraction_id": "f61f579abe764cdfa8d29918a57cc7da",
  "version": 28,
  "memory_type": "entities"
}
-->