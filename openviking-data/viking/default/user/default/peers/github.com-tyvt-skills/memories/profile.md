# github.com-tyvt-skills
- 维护 LangGraph+Magpie 多模型编排器：planner 池 gpt-6-luna/gpt-5.4-mini/dsv4.1-flash；code_edit_with_signal 与 security_guard 主选 kimi-k3.1-pro；plan_reviewer/verifier 用 grok-4.7@256k；workbuddy 兜底 space-bunny（file_reader/code_editor/summarizer/pwsh） (as of 2026-11-14)
- 网关 22 个可用模型（2026-11-14 关停 composer-2.5、gpt-5.3-codex、gemini-4-hydrogen、gpt-5.4-nano，cursor 由 14 减至 10）；A/B 对照 auto/glm-5.3-flash（按量计费） (as of 2026-11-14)
- 已关停/淘汰模型：codex/gpt-6-astra、cursor/composer-2.5、codex/gpt-5.6-luna 全系、workbuddy/glm-5.3-flash、workbuddy/deepseek-v4-pro、workbuddy/glm-5.3、cursor/glm-5p3-flash、cursor/gpt-5.5@1m、cursor/gpt-5.5@272k、cursor/kimi-k3、cursor/muse-spark-1.3@300k、cursor/gpt-5.3-codex、cursor/gemini-4-hydrogen、cursor/gpt-5.4-nano (as of 2026-11-14)
- 维护 agent-guard 拦截体系（探索漂移三规则 enabled:true、mode:'warn'，只记账不阻断）与 dsh-explore 探索外包 skill (as of 2026-11-14)
- 维护 dsh 工具链：cost-meter（tools.guard 白名单拦截整读/整 grep/整 dump，bigMissStreak≥2 触发，perStepUncachedBudget=10000）、plan-gate（pwsh git 三态拦截 write/not-git/unknown 与 _review.json 凭证校验）、solve-captcha.mjs（默认视觉模型 auto/deepseek-v4.1-flash，禁用 auto/hy3 识图）、concise-report（结论/改动证据/待定项三段式，AGENTS.md:94 加指针生效） (as of 2026-11-14)
- 维护 zentao-analyzer（附件缓存下载器 zentao_file.py 在 D:\repository\skills\zentao-analyzer）与 OpenViking dsh-memory-plugin（profile-inject 注入、主动检索；L1 主动检索已验证生效，caller=user 基线 0，按 5 个排障会话观测） (as of 2026-11-14)
- dsh 子代理模型选择（subagent-model-selection）内建未配置：受每工具 enabled 开关与 Session 级 policy.routes 白名单控制，无 policy 时子代理继承父模型 (as of 2026-11-14)
- 评测资产：T1–T7 执行层题、planner 归因样本 #1–#15、route_miss 日志、controller-bench（35 题×多模型） (as of 2026-11-14)
- 维护 DSH web profile 配置 cordis.patch.yml（C:\Users\Administrator\.dsh\profiles\web\，不在 git 仓库），配置改动由本人手动重启 web 生效 (as of 2026-11-14)
- skills 仓受管副本 `dsh/profiles/web/cordis.patch.yml` 是旧快照（1055 行，与 live 1418 行差约 409 行），只按每次语义改动增量补一行并单文件提交 (as of 2026-11-14)
- web profile 预设现状：preset-standard 的 tool-workflow 已 disabled，preset-cordis 与 preset-full-tools 仍 enabled；批 1+批 2 合计每步省约 2,123 token (as of 2026-11-14)
- web profile 技能目录已由 120 收到 40、dsh-harness-dev-context 已禁用；单步固定上下文 15.5k→14.6k（系统提示 1716→1383、技能注入 766→461），累计省约 900 token/步，14.6k 视为合理终态 (as of 2026-11-14)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "fa049ff27bf94cea909ff331a50cdbbf",
  "peer_id": "github.com-tyvt-skills",
  "source_extraction_ids": [
    "0924dc862aaa409aa51cbab9170f1d9e",
    "1f9af026e7b54d939eb27b0664623a3e"
  ],
  "version": 35,
  "memory_type": "profile"
}
-->