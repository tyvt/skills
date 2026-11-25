# dsh 工具链
dsh 工具链包含成本计量、计划门禁、验证码求解与简洁汇报工具，以下为截至 2026-11-16 的配置。

## 工具配置
- `cost-meter`：`bigMissStreak>=2`、`perStepUncachedBudget=10000`、`stepReminderThreshold=120`。
- `plan-gate`：执行 git 三态拦截与 `_review.json` 校验。
- `solve-captcha.mjs`：默认 `auto/deepseek-v4.1-flash`。
- `concise-report`：采用三段式输出。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "工具链",
  "name": "dsh_toolchain",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "version": 1,
  "memory_type": "entities"
}
-->