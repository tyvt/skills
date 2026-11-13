---
name: submodule-commit
description: 子模块改动的固定提交顺序。在分支 worktree 提交、推送并回写父仓 gitlink 时加载。不临场推演顺序。
---

# submodule-commit

按清单做，不写解释，不自己拼 `@{u}`、`head`、`tail`。提交前设 `$env:GIT_EDITOR='true'`。主检出是 DETACHED 时，编辑和提交都在分支所在 worktree（先看 worktree-snapshot）。

0. 动手前用封装脚本查 ahead/behind，**不要自己读 `git rev-list --left-right --count` 的左右列**（审计 P3-14：曾把 `0 1` 读反、多跑一次空 rebase）：
   `node D:\repository\skills\submodule-commit\scripts\git-ab.mjs <worktree> --fetch <branch>`
   输出 `ahead=X behind=Y`。behind > 0 先 `git pull --rebase`（脏的 `env/.env`、`public/version.json` 先 stash），再开始改。
1. 在分支所在 worktree 编辑
2. `node ../node_modules/eslint/bin/eslint.js <file> --ext .vue`（路径按该仓实际位置）
3. `git add <file>`；`git commit -m "<type>(scope): <desc>"`
4. 需要构建产物哈希：**commit → build → 核对** `version.json.gitHash == git rev-parse HEAD`。不一致 = 顺序反了，必须重 build，禁止写「acceptable」放过（bug6520 复盘 O5：build 在 commit 前，hash e8b351511 ≠ 实际提交 65b114c93）。
5. 推送前再跑一次 `node D:\repository\skills\submodule-commit\scripts\git-ab.mjs <worktree> --fetch <branch>`；behind > 0 先 `git pull --rebase` 再推；submodule gitlink 冲突取后代提交，不手改指针。
6. `git push origin <branch>`
7. `git -C <主检出> fetch origin <branch>` 后把主检出对齐到刚推送的 SHA（不要在 detached 主检出上直接改文件）
8. `git -C <父仓> add <submodule>`；`git commit`；父仓 push 同样先 fetch，behind 先 rebase。
9. 两端 `git ls-remote origin <branch>` 核对 SHA
