# dsh 工具链
github.com-tyvt-skills 使用的 dsh 工具集合。

## 工具
- cost-meter：bigMissStreak>=2、perStepUncachedBudget=10000、stepReminderThreshold=120。
- plan-gate：git 三态拦截 + _review.json 校验。
- solve-captcha.mjs：默认 auto / deepseek-v4.1-flash。
- concise-report：三段式。

## agent-guard
- exploration-drift 为 warn 仅记账。
- verify-loop：agentBrowserMax 12、Start-Sleep 5、按 session 累计不重置；2026-11-24 由 block 降 warn，需重启 web 后新会话生效。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "工具集",
  "name": "dsh 工具链",
  "source_extraction_id": "39f47e941bc2409e8b998b592259bf89",
  "version": 1,
  "memory_type": "entities"
}
-->