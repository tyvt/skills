# dsh-plan-gate —— 计划审批门插件

强制「先计划、后实施」：任何改动类工具（`edit` / `write` / `apply_patch`）落地前，
要求仓库根 `.plan/` 下存在**已审核通过（`status: approved`）且已人工确认（`human_confirmed: true`）**
的 Markdown 计划，否则拒绝改动并提示正确流程。

## 机制

```
产出计划(Markdown) → 高级模型审核(plan_review) → 打回则改 → pass → 人工终稿确认 → 才允许 edit/write
```

- **审核器**：`orchestrate {op:"plan_review", plan:"<Markdown 正文>", context:"<任务背景>"}`
  走 langgraph-orchestrator 的 `plan_reviewer` 工具池（首选 `cursor/grok-4.7@256k`，
  回退 `workbuddy/hy3` → `cursor/composer-2.5`），返回 JSON：
  `{verdict:"pass"|"reject", score:0-100, issues:[...], suggestions:[...]}`。
- **打回**：`verdict=reject` 时按 `issues`/`suggestions` 修改计划后**重新送审，直到 pass**。
- **人工确认**：pass 后必须用 `ask_user_question` 让用户确认终稿；用户确认后把计划
  frontmatter 改为 `status: approved` / `human_confirmed: true`。
- **门禁**：本插件在改动落地前读取 `.plan/<sessionId>.md`（或 `.plan/` 下任一已放行计划），
  校验 frontmatter 满足 `requireFrontmatter`；不满足则返回拒绝文案。

## 完整调用示例

### 1) 写计划文件
复制 `.plan/TEMPLATE.md` 为 `.plan/<sessionId>.md`，填写各节，此时：
```yaml
status: draft
human_confirmed: false
```

### 2) 送审
调用（经编排器 op）：
```
orchestrate {
  op: "plan_review",
  plan: "<.plan/<sessionId>.md 的全文>",
  context: "<任务背景，如：禅道 bug #1234 前端按钮无响应>"
}
```
返回渲染后的 Markdown，例如：
```
## 计划审核结果：❌ REJECT（打回修改）
- 评分：58/100
- 审核模型：cursor/grok-4.7@256k

### 问题（issues）
1. 实施方案未写明每步验证方式
2. 缺少回滚方案

### 修改建议（suggestions）
1. 为步骤 2/3 各补一条验证命令
2. 增加「回滚：git checkout -- <文件>」

> 审核未通过：请按 issues/suggestions 修改计划后重新送审，直到 pass。
```

### 3) 修改后重审，直到 pass
```
## 计划审核结果：✅ PASS（审核通过）
- 评分：92/100
...
> 审核通过：请把计划提交用户人工确认（ask_user_question）……
```

### 4) 人工确认
用 `ask_user_question` 给出「确认实施 / 继续修改」选项，用户选「确认实施」后，
把计划 frontmatter 落为终态，并将审核响应中的 `plan_sha256`、`version` 分别填入 `approved_sha256`、`approved_version`。门禁要求 schema v2 的最新审核为 pass、session 匹配、正文摘要匹配及人工确认绑定同一版本；旧审批须重新审核。摘要统一 LF，排除审批 frontmatter 字段；正文变更必须重审。

差量审核通过 `run_plan_review` 的 `workdir`、`plan_path`、`session_id`、`base_sha`、`base_version`、`delta` 传入；此时全文参数为空。`delta` 为 `[{"old":"唯一原文","new":"替换内容"}]`，服务端逐项精确替换并审核重建全文。旧基线、重复匹配和 `.plan` 外路径均拒绝。

终态示例：
```yaml
status: approved
human_confirmed: true
approved_sha256: "<审核响应plan_sha256>"
approved_version: 1
reviewer: cursor/grok-4.7@256k
reviewed_at: "2026-11-12T15:00:00+08:00"
```

### 5) 实施
此后 `edit` / `write` / `apply_patch` 才能通过 plan-gate 门禁。

## 配置（cordis.patch.yml）

```yaml
- insert:
    - id: plan-gate
      name: dsh-plan-gate
      config:
        enabled: true
        planDir: ".plan"
        guardTools: [edit, write, apply_patch]
        requireFrontmatter:
          status: approved
          human_confirmed: true
        repoRoot: ""   # cwd 缺失时兜底仓库根
```

## 说明

- 门禁优先检查 `<planDir>/<sessionId>.md`；不存在则检查该 session 的活跃计划
  （文件名以 sessionId 前缀），最后才接受 `.plan/` 下任意已放行计划。
- 校验异常时**保守拒绝**改动，避免门禁失效放过未审批改动。
- 本插件零依赖（不 import `@deepseek-ai/*`），与 `dsh-orchestrator-gate` 同构。
- 「审核通过后自动写回 .plan 并等人工确认」当前为**手动/半自动**：结果显示在 orchestrate
  返回文本里，由主控修改计划文件并提问确认；如需全自动回写，可后续扩展。
