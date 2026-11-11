# Summary
2026-11-11 提议创建 submodule-commit（原称 suzhufang-submodule-commit）技能：封装分支 worktree 改→eslint→commit→push→主检出对齐SHA→父仓 gitlink 固定序列，Agent 按清单执行，命令收进脚本不靠 lint hook，不写进 AGENTS.md。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...md 的职责。但注意 **AGENTS.md 要控制体量**：Codex 默认 32 KiB 会截断，Claude Code 超过约 200 行后遵从度明显下降。所以这条规则要短，不要展开。

### 6. 提交序列（子模块 → worktree → gitlink → 父仓）

**不适合 AGENTS.md**（细节太多、每次加载太贵），**适合 Skill**。

把“在分支 worktree 编辑 → eslint → commit → push → 主检出 checkout 新 SHA → 父仓 `git add` → commit → push → `ls-remote` 复核”封装成 `suzhufang-submodule-commit` Skill。Agent 按需加载，AGENTS.md 只写一句“提交走 `suzhufang-submodule-commit` 技能”。

---

## 三、推荐的落地结构

```
AGENTS.md                     # <150 行，只放“地图”和硬规则指针...
...
**user [peer=github.com-tyvt-skills]**: ...- `submodule-commit`：替代 Step 12–16 的临时推演。

3. **最后精简 AGENTS.md**
   - 删除重复的流程性文字，只保留“地图”和指向 Skill 的指针。...
...
**assistant [peer=github.com-tyvt-skills]**: ...会话开头读结果，禁止现场拼 `git status`。
- `submodule-commit`：分支 worktree 里改 → eslint → commit → push → 主检出对齐 SHA → 父仓 gitlink。Agent 只按清单执行。

PowerShell 语法不靠 lint hook。命令收进这两个脚本，Agent 不自己拼 `@{u}`、`head`、`tail`。

**4. 硬门禁维持现状，插件打包先不做**...

<!-- MEMORY_FIELDS
{
  "event_name": "submodule-commit技能提议",
  "goal": "创建子模块提交技能",
  "summary": "2026-11-11 提议创建 submodule-commit（原称 suzhufang-submodule-commit）技能：封装分支 worktree 改→eslint→commit→push→主检出对齐SHA→父仓 gitlink 固定序列，Agent 按清单执行，命令收进脚本不靠 lint hook，不写进 AGENTS.md。",
  "ranges": "19-21,30,51-52",
  "source_extraction_id": "cab19e04d9184da3b1ad3626e78acf22",
  "version": 1,
  "memory_type": "events"
}
-->