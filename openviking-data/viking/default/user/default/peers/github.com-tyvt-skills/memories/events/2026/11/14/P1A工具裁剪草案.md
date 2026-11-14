# Summary
2026-11-14，起草 P1(A) 计划(p1a-trim-heavy-tools-20261114.md)裁剪重型低频工具组。核实六组工具真实落点后的关键结构约束：schedule/goal/workflow/session_query 可纯配置 disabled:true 关闭（有 plugin-manager 先例）；team_task_* 与 spawn_teammate/send_message 同在 tool-agent-team 插件内（spawn 使用率 25%，不能整插件关）；session_query/team_task 来自顶层 bundle（非预设内）需顶层覆盖。可达路径用「full-tools 预设切换」兜底。文档末尾留三待定项：①team_task 走 X(不动) 或 Y(等上游开关) ②可达路径用预设切换还是接受无该能力 ③批1/批2 是否一起。未送 plan_review，待用户定。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: P0 先落地闭环 → P1 走 A + 补可达路径 → 两个独立 plan 分别评审
...
**assistant [peer=github.com-tyvt-skills]**: P0 closure complete. Now the P1(A) plan. First I need facts: the exact tool packages/plugins in the standard preset to trim, and the reachability path (how them being "off" in main still stays reachable). The user wants **A1 = trim heavy low-frequency tool groups at profile level + supplement reachability paths**.

Let me gather the exact config anchors. Read the standard preset plugin list (the tools: team_task, schedule, session_event/search, workflow, goal).
**assistant [peer=github.com-tyvt-skills]**: This is the delegation group (tool-subagent, tool-workflow). I need the full preset-standard plugin list to find where `team_task_*`, `schedule`, `session_event/search`, `goal` tools are declared. Let me find those tool package names via grep across the profile.
**assistant [peer=github.com-tyvt-skills]**: So `tool-schedule` and `tool-goal` are declared in 3 presets (standard ~line 132/142, and two others ~369/716). `team_task_*`, `session_event_*`, `session_search`, `workflow` come from bundles (dsh-experimental-agent-team-profile, dsh-experimental-session-search, workflow-ptc/tool-workflow).

Key facts for the plan:
- `tool-schedule` / `tool-goal` → `disabled: true` in preset-standard (mirrors existing `tool-plugin-manager` disabled pattern at L166/306).
- `team_task_*` → from `dsh-experimental-agent-team-profile` bundle (L in package.json bundles). Removing from standard while keeping reachability = need a path.
- `session_search/session_event` → `dsh-experimental-session-search` bundle.
- `workflow` → `tool-workflow` in delegation group (L289-290).

Let me read the standard preset exactly (around 130-170) to confirm the disabled mechanism and full list of what standard loads, and find where agent-team tools come from.
**assistant [peer=github.com-tyvt-skills]**: I now have the anchors. Let me find where `team_task_*` tools come from (the agent-team bundle) and whether there's a plugin id I can disable, plus confirm `tool-workflow` location. Let me search the installed packages for the tool names mapping to plugin names.
**assistant [peer=github.com-tyvt-skills]**: No direct matches — these come from bundles. Let me find where `team_task_create` tool is defined in the installed tree, and the agent-team profile bundle.
**assistant [peer=github.com-tyvt-skills]**: Hmm, those @deepseek-ai packages aren't in node_modules — they're in the checkout (`D:\nvm\...\node_modules\@deepseek-ai\dsh\node_modules\@deepseek-ai\`). The profile's bundles resolve from the checkout. Let me search there.
**assistant [peer=github.com-tyvt-skills]**: Now I have the exact packages:
- `team_task_*` → `dsh-experimental-tool-agent-team`
- session search tools → `dsh-experimental-session-search`
- `workflow` → `dsh-tool-workflow` (in delegation group L289-290)
- `schedule_*` → `dsh-tool-schedule` (L132-133)
- `goal` → `dsh-tool-goal` (L142-143)

Now let me verify: are the agent-team/session-search tools added via the `dsh-experimental-agent-team-profile` bundle (which is in the profile bundles list in package.json), and can I disable them per-plugin or must I drop the bundle? Let me check that bundle's cordis.patch.yml.
**assistant [peer=github.com-tyvt-skills]**: Now I have the full picture. The agent-team bundle `insert`s `tool-agent-team` (provides team_task_* + spawn/send/etc). To trim `team_task_*` from standard, options:
- Disable `tool-agent-team` plugin → but that also removes `spawn_teammate`/`send_message`/team coordination (whole Agent Teams). Usage of spawn = 25%. Removing it entirely would break the Agent Teams feature this session uses.
- Better: `tool-agent-team` likely has config to control which tools. But it groups team_task + spawn together.

This is getting deep — exactly why P1 needs careful design and the user wants to see the plan first (not send to review yet). Let me check `dsh-experimental-tool-agent-team` tool registration to see if team_task_* and spawn are separable.
**assistant [peer=github.com-tyvt-skills]**: So `dsh-experimental-tool-agent-team/lib/index.js` registers ALL of: spawn_teammate, send_message, team_task_create/get/list/update, list_agents, wait_agent, interrupt_agent — **in one plugin, not independently toggleable by config**. team_task is bundled with spawn.

Key insight for P1(A) design: **the tool groups can't be trimmed per-tool via config** — they're grouped in plugins/bundles. So P1(A)'s "reachability path" is essential: e.g., drop the `tool-agent-team` / schedule / session-search from the *main/standard* preset to save ~6k tokens/every-step, but keep them reachable by loading them in a **subagent preset** or via a lightweight re-enable. The `tool-schedule`/`tool-goal` CAN be `disabled:true` (already a pattern used for plugin-manager).

This is important design nuance. Let me also verify what `when()` / conditional loading could do, and confirm the `tools` metrics per group so I size each cut. I already have per-tool: team_task 1,512 / schedule 1,495 / session_query 994 / workflow 848 / goal 433.

But one more critical check: **the reachability requirement**. If I `disabled:true` tool-schedule in standard, the model loses schedule tools entirely for that session. User wants "补可达路径" — a way to still reach them. Options:
1. Enable-on-demand via a skill or meta-tool.
2. Keep them only in a subagent/add-on preset.

Let me confirm whether there's a preset that already keeps them (the other two presets at 369/716), and check `dsh-experimental-session-search` too.
**assistant [peer=github.com-tyvt-skills]**: These are likely the `ptc` and `minimal` presets (other preset variants). So `tool-schedule`/`tool-goal` are loaded in standard + 2 others. The plan needs to touch the standard preset (the default `selectedDefault: standard`).

I have enough facts to draft P1(A). The design must handle the reachability question honestly. Let me also confirm the session-search bundle insertion point (is it in standard preset or top-level). Grep the profile for session-search insertion and the tool-workflow.
**assistant [peer=github.com-tyvt-skills]**: So `dsh-experimental-session-search` and `agent-team` come from the **package.json bundles list** (top-level bundle, applied to all sessions), NOT per-preset. That means:
- `session_search/session_event_*` (from session-search bundle) → present in every session regardless of preset.
- `team_task_*` + spawn (from agent-team-profile bundle) → present in every session.
- `workflow` (tool-workflow) → in the delegation group inside each preset.
- `schedule`/`goal` → per-preset (tool-schedule/tool-goal).

This is the crucial structural fact: **the biggest offenders (session_search 994 + team_task 1512 = ~2.5k) come from top-level bundles, so they can only be removed by dropping them from the `package.json` bundles list OR disabling their plugin ids at profile level.**

I now have all facts to write a solid P1(A) plan. Let me verify the plugin ids exist to disable: `session-search` bundle inserts an id (e.g., `tool-session-search`), and whether `disabled:true` can override a bundle-inserted plugin from profile (patch applies after bundle per the config note at line 5-6). Let me check what ids session-search bundle inserts.
**assistant [peer=github.com-tyvt-skills]**: Now I have all structural facts. `session-search` inserts `optional-session-search` group → `optional-tool-session-query` (the session_search/session_event tools). To disable it via profile, override `optional-tool-session-query` with `disabled: true` (profile patch applies after bundle).

I have enough to draft the P1(A) plan. Let me write it. Per the user's directive: **draft for review first, don't send to plan_review yet**. I'll write it as a plan file with `status: draft`.
**assistant [peer=github.com-tyvt-skills]**: Everything done. Let me check no leftover jobs and present the two deliverables.
**assistant [peer=github.com-tyvt-skills]**: No jobs; teammate inactive (done). Both deliverables ready.
**assistant [peer=github.com-tyvt-skills]**: 两件事都办了。

## P0 — 闭环验证（不重复实现，已完成）
发现 **P0 其实早已落地**：11-13 的 [A-1 计划](D:\repository\skills\.plan\A1-openviking-gateway.md) 已 approve+人工确认，现装包 `index.mjs:113-121` 有 `toolSurface` 闸门、`toolSurface:"off"` 已配。按你要求跑了四项验证，签核见 [p0-ovgw-closure-signoff-20261114.md](D:\repository\skills\.plan\p0-ovgw-closure-signoff-20261114.md)：

- **① 生效**：P0 后 4 个新会话工具数统一 46、内联 OV=0、`mcp_gateway`(269 tok)、toolsTokens≈9,825
- **② 记忆不受影响**：post-config 会话原始日志 460 行 → openviking 95 / recall 35 / commit 31，profile 注入正常
- **③ peer 隔离**：R1 已记录 broad-by-design（dev 单 peer 无实际泄漏，A-2 根治）；本单 workspace 会话无法无污染重做 S4b 三控，**如实记录未重做+原因**，不新增回退
- **④ 口径注脚已补**：调研报告的「38% 内联」已标注为 **P0 生效(11-14 14:08)前历史**——276 会话 mtime 全停在 11-13，现状已归零

## P1(A) — 草案待你过目（未送审）
[p1a-trim-heavy-tools-20261114.md](D:\repository\skills\.plan\p1a-trim-heavy-tools-20261114.md)。核实了六组工具真实落点后有个**关键结构约束**要你知道：

- `schedule`/`goal`/`workflow`/`session_query` 可纯配置 `disabled:true` 关闭（有 plugin-manager 先例）
- **`team_task_*` 关不掉**——它和 `spawn_teammate/send_message` 在**同一个插件** `tool-agent-team` 里，而 spawn 使用率 25%，不能整插件关
- `session_query`/`team_task` 来自**顶层 bundle**（非预设内），需顶层覆盖

草案里我把 team_task 给了 X（不动，认掉 1.5k）/ Y（等上游加开关）两选，可达路径用「full-tools 预设切换」兜底。**三个待定**写在文档末尾，请你先定：①team_task 走 X 还是 Y ②可达路径用预设切换还是接受无该能力 ③批1/批2 是否一起。定了我再改稿送 plan_review。

<!-- MEMORY_FIELDS
{
  "event_name": "P1A工具裁剪草案",
  "goal": "起草P1(A)裁剪方案",
  "summary": "2026-11-14，起草 P1(A) 计划(p1a-trim-heavy-tools-20261114.md)裁剪重型低频工具组。核实六组工具真实落点后的关键结构约束：schedule/goal/workflow/session_query 可纯配置 disabled:true 关闭（有 plugin-manager 先例）；team_task_* 与 spawn_teammate/send_message 同在 tool-agent-team 插件内（spawn 使用率 25%，不能整插件关）；session_query/team_task 来自顶层 bundle（非预设内）需顶层覆盖。可达路径用「full-tools 预设切换」兜底。文档末尾留三待定项：①team_task 走 X(不动) 或 Y(等上游开关) ②可达路径用预设切换还是接受无该能力 ③批1/批2 是否一起。未送 plan_review，待用户定。",
  "ranges": "0,49-90",
  "source_extraction_id": "f91504b9469c47e4b2eaa5a95cd0a43b",
  "version": 1,
  "memory_type": "events"
}
-->