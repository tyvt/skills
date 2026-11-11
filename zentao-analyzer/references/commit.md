# 提交序列（仅准备提交时读）

优先加载 `submodule-commit` 并按清单执行。本文件是该 skill 不在会话目录里时的后备。顺序固定，不要临场推演「先 add 还是先 push」。

1. 只暂存本次改动。不要夹带 `env/.env`。`public/version.json` 是构建产物，脏了就 `git checkout -- public/version.json`，禁止提交。
2. 子模块先提交再构建再推送。要在禅道回写里引用构建哈希，构建必须在 commit 之后，否则 hash 是旧 HEAD。推送前 `git fetch origin <branch>`，behind > 0 先 rebase。
3. 父仓 gitlink **先判后动**：`git submodule status` 看子模块是否带 `+`。是才 `git add` 该 gitlink；否则跳过并说明。bug6401 先 add 后分析，空转一轮。
4. 自动化环境提交前设 `GIT_EDITOR=true`，避免等编辑器。
5. 推送前用户未明确说「提交并推送」时，用 `ask_user_question`：仅提交 / 提交并推送 / 暂不处理。
