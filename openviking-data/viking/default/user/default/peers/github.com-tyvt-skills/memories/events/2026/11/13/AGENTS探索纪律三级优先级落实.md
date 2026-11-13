# Summary
2026-11-13 将 dsh/AGENTS.md:16（即 ~/.dsh/AGENTS.md symlink）重排为三级优先级：①默认首选=派 dsh-explore 只读子代理（未知根/跨模块/批量≥3/需试错时一律先派，子代理豁免 agent-guard exploration 三规则，主控只收≤30行结论）；②已知具体目录=主模型带 path 的窄 grep/glob；③兜底=主模型自己发 pwsh Get-ChildItem/Select-String 盲搜，仅当派子代理失败/超时或只差一条命令且连续≤2次，超限强制改派。grep 复查无残留矛盾。提交 5abe7a2d「docs(agents): 探索纪律改为子代理探索首选、主模型 pwsh 盲搜兜底」，仅 2 files changed 未推送；dsh-explore/SKILL.md 按计划未改动。
# 2026-11-13 (Friday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Confirmed. Now set the plan frontmatter to approved and make the edit.
**assistant [peer=github.com-tyvt-skills]**: Now edit AGENTS.md:16. I'll split the currently-overloaded line into a clean prioritized structure. Let me craft the replacement keeping the P0-2 evidence but reordering the priority.
**assistant [peer=github.com-tyvt-skills]**: The edit landed and the updated AGENTS.md is now reflected. Let me verify the line and check for any residual conflicts (the P1-3 verification requirement).
**assistant [peer=github.com-tyvt-skills]**: Only one match, self-consistent — no residual conflicting pwsh/grep exploration statements elsewhere. Now update the dsh-explore SKILL.md "何时用" to lead with "默认首选" so the skill itself matches the AGENTS.md priority (this is the skill's frontmatter description too). The plan locked scope to AGENTS.md single bullet, but tightening the skill's framing to match is a natural pairing. Let me check the skill's current description already says "主会话禁止裸 grep 探索" — it's consistent. I'll make one small alignment edit to the skill's "何时用" so it explicitly says "默认首选".

Actually, the plan explicitly scoped out SKILL.md changes ("不联动 dsh-explore/SKILL.md"). The SKILL.md already reflects the right priority. I'll keep scope discipline and not touch it. Let me update todos and verify.
**assistant [peer=github.com-tyvt-skills]**: 完成了。M2 探索外包的优先级已在 AGENTS.md 里改到位。

## 改了什么

把 `dsh/AGENTS.md:16`（即 `~/.dsh/AGENTS.md`，symlink）原有那条 bullet 重排为明确的**三级优先级**：

| 级别 | 方式 | 条件 |
|---|---|---|
| ① **默认首选** | 派 `dsh-explore` 只读子代理 | 未知根/未知层级/跨模块/批量≥3/需试错定位时**一律先派**；子代理会话对 agent-guard `exploration` 三规则整体豁免，可放开试错，主控只收 ≤30 行结论后再带 offset/limit 局部读 |
| ② 已知具体目录 | 主模型直接用带 `path` 的窄 grep/glob | 目录已确定时 |
| ③ **兜底** | 主模型自己发 `pwsh Get-ChildItem`/`Select-String` 盲搜 | **仅当**派子代理失败/超时，或只差一条命令即可定位，且同一任务连续盲搜 ≤2 次，超限必须改派子代理 |

并按你的原话加了复盘注脚：**pwsh 不被 agent-guard 拦，主模型盲搜的物理延迟与上下文膨胀必须外包给子代理承受。**

## 关于流程

- 计划 `m2-explore-outsourcing-preferred-20261113.md` 已过 plan_review（82/100，0 P0），采纳了 3 条 P1（范围锁定单文件单 bullet、兜底给可判定条件+≤2 次上限、验证加 grep 排查残留矛盾），并经你人工确认后置 `status: approved / human_confirmed: true`。
- 复查结果：grep 全文件 `pwsh|裸 grep|dsh-explore|盲搜` 只命中第 16 行这一条，无残留冲突表述。`dsh-explore/SKILL.md` 本就写着「主会话禁止裸 grep 探索」，与新排序一致，按计划未改动。

## 收尾

改动落在 Git 仓库（`D:\repository\skills`），涉及已修改的 `dsh/AGENTS.md` 和新增的计划文件。后续如何处理？
**assistant [peer=github.com-tyvt-skills]**: Committing only (no push). Let me check the repo state and load the submodule-commit guidance.
**assistant [peer=github.com-tyvt-skills]**: There are many pre-existing dirty files (other work in this repo). I must commit **only** my changes: `dsh/AGENTS.md` and the new plan file. Let me stage those two specifically.
**assistant [peer=github.com-tyvt-skills]**: 已提交（仅提交，未推送）。

## 收尾总结

**提交**：`5abe7a2d` — `docs(agents): 探索纪律改为子代理探索首选、主模型 pwsh 盲搜兜底`，2 files changed（`dsh/AGENTS....

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS探索纪律三级优先级落实",
  "goal": "记录AGENTS变更提交",
  "summary": "2026-11-13 将 dsh/AGENTS.md:16（即 ~/.dsh/AGENTS.md symlink）重排为三级优先级：①默认首选=派 dsh-explore 只读子代理（未知根/跨模块/批量≥3/需试错时一律先派，子代理豁免 agent-guard exploration 三规则，主控只收≤30行结论）；②已知具体目录=主模型带 path 的窄 grep/glob；③兜底=主模型自己发 pwsh Get-ChildItem/Select-String 盲搜，仅当派子代理失败/超时或只差一条命令且连续≤2次，超限强制改派。grep 复查无残留矛盾。提交 5abe7a2d「docs(agents): 探索纪律改为子代理探索首选、主模型 pwsh 盲搜兜底」，仅 2 files changed 未推送；dsh-explore/SKILL.md 按计划未改动。",
  "ranges": "39-55",
  "source_extraction_id": "84a205cebe754ae086ba02758c76092c",
  "version": 1,
  "memory_type": "events"
}
-->