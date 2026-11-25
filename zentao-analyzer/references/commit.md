# 提交序列（仅准备提交时读）

优先加载 `submodule-commit` 并按清单执行。本文件是该 skill 不在会话目录里时的后备。顺序固定，不要临场推演「先 add 还是先 push」。

1. 只暂存本次改动。不要夹带 `env/.env`。`public/version.json` 是构建产物，脏了就 `git checkout -- public/version.json`，禁止提交。
2. 子模块先提交再构建再推送。要在禅道回写里引用构建哈希，构建必须在 commit 之后，否则 hash 是旧 HEAD。推送前 `git fetch origin <branch>`，behind > 0 先 rebase。
3. 父仓 gitlink **先判后动**：`git submodule status` 看子模块是否带 `+`。是才 `git add` 该 gitlink；否则跳过并说明。bug6401 先 add 后分析，空转一轮。
4. 自动化环境提交前设 `GIT_EDITOR=true`，避免等编辑器。
5. 禅道任务（带禅道链接）在用户确认验证通过后，直接提交并推送，不再弹 `ask_user_question` 询问提交方式——确认通过即默认提交推送+回写禅道，两件事都要做（见 AGENTS.md「禅道任务免二次问」）。**禁止只回写禅道不提交代码**：回写前必须确认代码已 commit 且已 push 到远程（git 工作区无未提交改动、无未推送提交），否则回写无从验证。仅当①非禅道任务、或②用户在确认时明确说「暂不提交/先别推/不用回写」时，才用 `ask_user_question`：仅提交 / 提交并推送 / 暂不处理（用户明示优先）。
