# Summary
用户于 2026-11-13 指示起草 A-2 上游 issue/PR 文本（三块论据 + API 形态建议），发出去或先内部评审。助手在 dsh/reports/A2-upstream-issue-20261113.md 起草，含三块论据（24 工具 8.4k tokens 占目录 52% 固定开销；dbx/context-mode 已有 gateway 先例，本插件是唯一逆行直连；无 toolSurface/toolFilter 开关只能 fork）与 API 形态建议（toolSurface?: 'direct'|'gateway'|'off' 默认 direct + 可选 toolFilter?: string[]，需 per-session peer 透传），默认先内部评审，未 outward 发送。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...今天：起草 A-2 issue/PR 文本（三块论据 + API 形态建议），发出去或先内部评审；

今天：本地提交 A-1 三处改动，暂不推送（或推送但 PR 描述注明 workaround 状态）；

A-2 有回应后：按上游语义调整 patch 形态，再决定推送/合入。
...
**assistant [peer=github.com-tyvt-skills]**: Step 2 done. **Step 3: draft A-2 upstream issue/PR text (three-block argument + API shape suggestion).** Let me write it as a standalone doc.
...
**assistant [peer=github.com-tyvt-skills]**: A-2 draft done. You said "发出去或先内部评审" — I'll default to internal review (safer, since I can't confirm the upstream repo/account). Let me note that and move to step 4 (local commit).

**Step 4: local commit of A-1 changes, no push.** First load worktree-snapshot per rules, then check what changed.
...
**assistant [peer=github.com-tyvt-skills]**: ...## ✅ 3. A-2 上游 issue 草案（今天）
[reports/A2-upstream-issue-20261113.md](dsh/reports/A2-upstream-issue-20261113.md)：
- **三块论据**：① 24 工具 8.4k tokens 占目录 52% 固定开销；② dbx/context-mode 已有 gateway 先例，本插件是唯一逆行直连；③ 无 `toolSurface`/`toolFilter` 开关，只能 fork。
- **API 形态建议**：`toolSurface?: 'direct'|'gateway'|'off'`（默认 direct）+ 可选 `toolFilter?: string[]`；附副作用/设计约束（记忆旁路独立、**per-session peer 必须透传**——本地无法根治的核心）。...

<!-- MEMORY_FIELDS
{
  "event_name": "上游issue草案起草",
  "goal": "起草上游议题",
  "summary": "用户于 2026-11-13 指示起草 A-2 上游 issue/PR 文本（三块论据 + API 形态建议），发出去或先内部评审。助手在 dsh/reports/A2-upstream-issue-20261113.md 起草，含三块论据（24 工具 8.4k tokens 占目录 52% 固定开销；dbx/context-mode 已有 gateway 先例，本插件是唯一逆行直连；无 toolSurface/toolFilter 开关只能 fork）与 API 形态建议（toolSurface?: 'direct'|'gateway'|'off' 默认 direct + 可选 toolFilter?: string[]，需 per-session peer 透传），默认先内部评审，未 outward 发送。",
  "ranges": "1,26,30,50-52",
  "source_extraction_id": "8d26e42b5a0f4e92aff2b084b4115209",
  "version": 1,
  "memory_type": "events"
}
-->