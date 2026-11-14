# dsh 工具链

dsh 工具链是用户自研的一组 DSH 辅助工具，覆盖成本计量、计划门禁、验证码识别与结论化总结。

## 组成
- cost-meter：成本计量；`tools.guard` 白名单拦截整读/整 grep/整 dump，`bigMissStreak≥2` 触发，`perStepUncachedBudget=10000`
- plan-gate：计划门禁；对 pwsh git 命令做三态分类（write/not-git/unknown）拦截，并校验 `_review.json` 凭证
- solve-captcha.mjs：验证码识别；默认视觉模型 `auto/deepseek-v4.1-flash`，禁用 `auto/hy3` 识图
- concise-report：极简总结；结论/改动证据/待定项三段式，在 `dsh/AGENTS.md:94` 加指针生效

## 相关
- 同期维护 agent-guard 拦截体系（探索漂移三规则 enabled:true、mode:'warn'，只记账不阻断）与 dsh-explore 探索外包 skill

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术工具",
  "name": "dsh_toolchain",
  "source_extraction_id": "4fa61fcf496144728c4dd04547bf77da",
  "version": 1,
  "memory_type": "entities"
}
-->