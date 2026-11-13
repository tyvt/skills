# Summary
助手完成 op=full workdir 必填缺陷修复（三级 workdir 解析、_is_blank 判定、显式传 project_cwd），于 2026-11-13 提交 e7318dba，仅本地提交未推送；计划留档 .plan/workdir-required-fix.md，主要改动 api.py:365 与 index.js:381。用户随后询问是否已生效。
# 2026-11-13 (Friday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: 已提交 `e7318dba`。我来做收尾和校验。
**assistant [peer=github.com-tyvt-skills]**: 修复范围已经清理干净。`test_scheduling.py` 和 `config.js` 是本次修复之前就已存在的改动，不在本次修复范围内，因此未纳入提交。

## 完成

**根本原因**：这是配置约定不一致导致的必然故障，并非你“漏传 workdir”那样由使用纪律造成的失误。

| 层 | 行为 |
|---|---|
| `lib/index.js:381` | schema 声明 `workdir` 是 **optional**，但描述里写的是 “required for every full request” |
| `api.py:365-369` | `run_full` 收到空字符串就**提前返回** `WORKDIR_REQUIRED` |

两处说法不一致，导致**任何不显式写 workdir 的调用（也是 schema 的默认用法）有 100% 的概率不会触发 graph 构建**——这正是“看不到 composer”的原因：编排器根本没有运行起来。

**修复**：采用三级 workdir 解析，依次为 `workdir` → `project_cwd` → 进程 cwd。

- 判定统一改用 `_is_blank()`（`None`、键缺失、纯空白都算为空），不再使用 `v == ""`——原缺陷正是只判断空字符串的形态
- 插件侧**显式**传入 `project_cwd: config.projectDir`，不再依赖对隐式子进程 cwd 的假设
- 显式传入的 workdir 非法时**仍会立即报错**（`WORKDIR_NOT_FOUND` 和 `hint`），不会静默回落，避免你在写错目录时仍静默运行
- 成功返回中新增 `workdir` 和 `workdir_source`，以后一眼就能看出这一次用的是哪个来源
- 相对路径改为以 `project_cwd` 为基准解析，避免 `.`、`build` 被解析到错误目录

**验证**：
- `pytest`：**131 个通过**（基线 123 + 新增 8）
- 真实流程：`orchestrate {op:"full", request:"列出..."}` **不传 workdir**，现在能完整走完 plan → execute → summarize，cwd 正确落在编排器工程根目录
- 反向验证：`workdir="Z:/definitely-missing"` 仍会返回 `WORKDIR_NOT_FOUND` 和 `hint`

计划经 `plan_review` 四轮审核（期间被驳回一次 P0：我把“非绝对路径”和“不是目录”混为一谈，导致 `.` 的成功或失败自相矛盾），最终通过。已提交 `e7318dba`，仅提交到本地，未推送。

主要改动见 [api.py](dsh/langgraph-orchestrator/src/api.py:365) 与 [index.js](dsh/orchestrator/lib/index.js:381)，计划留档在 [workdir-required-fix.md](.plan/workdir-required-fix.md)。

一点提醒：兜底到 `process_cwd` 时目录是**编排器工程根，不是你的业务仓库**。跨仓库操作仍应显式传绝对 workdir——现在返回中带 `workdir_source`，你可以据此判断每次执行落在哪里。
**user [peer=github.com-tyvt-skills]**: 现在可以生效了吗？

<!-- MEMORY_FIELDS
{
  "event_name": "workdir修复本地提交",
  "goal": "记录修复提交状态",
  "summary": "助手完成 op=full workdir 必填缺陷修复（三级 workdir 解析、_is_blank 判定、显式传 project_cwd），于 2026-11-13 提交 e7318dba，仅本地提交未推送；计划留档 .plan/workdir-required-fix.md，主要改动 api.py:365 与 index.js:381。用户随后询问是否已生效。",
  "ranges": "0-15",
  "source_extraction_id": "b60129e53e214b45abe5b188850b3b57",
  "version": 1,
  "memory_type": "events"
}
-->