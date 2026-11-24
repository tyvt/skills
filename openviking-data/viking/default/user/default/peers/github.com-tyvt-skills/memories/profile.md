# github.com-tyvt-skills
- 维护 skills 仓库（本地 D:\repository\skills，远程 origin/main）：链接 16 个 skill 与 8 个 dsh 插件；加载集中在 zentao-analyzer、worktree-snapshot、submodule-commit，未链接 cursor-model-routing、memory-migration-archive、openviking-autostart、session-handoff、vite-build-profiler。(as of 2026-11-24)
- 维护 deploy-env 本地部署看板与收敛器：SQLite 注册表 32 行（8 个项目，local/dev/test/uat/prod 五环境；端口按 base+index：local=+0/dev=+1/test=+2/uat=+3/prod=+4）、看板端口 18098、nginx 站点与代理地址单源、五环境槽位视图；计划任务 deploy-env-dashboard + pythonw（install-autostart.ps1）开机静默自启；nginx UI 已移除、仅作静态服务；看板密码列 2026-11-24 起明文直显，/api/state 返回 Cache-Control: no-store；registry.sqlite 已入库并受 git 跟踪。(as of 2026-11-24)
- 维护 DSH web 多模型编排（LangGraph+Magpie）：planner 池 gpt-6-luna/gpt-5.4-mini；编排器 config.yaml 2026-11-24 起 15 处 deepseek 模型 id 全量换为 hy4flash-free（workbuddy 10 处、auto 5 处），配置按请求加载无需重启，router.py 峰时跳过策略因 id 不再命中自动 no-op，code_edit_with_signal 与 security_guard 主用 kimi-k3.1-pro，plan_reviewer/verifier 用 grok-4.7@256k，workbuddy 兜底 space-bunny（file_reader/code_editor/summarizer/pwsh）；网关 22 模型、cursor 池 10 个，auto/glm-5.3-flash 按量付费 A/B 进行中；子代理选模型未在仓库内配置，受逐工具开关与 Session 级 policy.routes 白名单控制。(as of 2026-11-24)
- dsh 工具链：cost-meter（bigMissStreak>=2、perStepUncachedBudget=10000、stepReminderThreshold=120）、plan-gate（git 三态拦截 + _review.json 校验）、solve-captcha.mjs（默认 auto/deepseek-v4.1-flash）、concise-report（三段式）。(as of 2026-11-16)
- agent-guard：exploration-drift 为 warn 仅记账；verify-loop（agentBrowserMax 12、Start-Sleep 5，按 session 累计不重置）2026-11-24 由 block 降为 warn，需重启 web 后新会话生效。(as of 2026-11-24)
- web 预设：preset-standard 禁用 tool-workflow，preset-cordis 与 preset-full-tools 仍启用；skill 目录 40 项（dsh-harness-dev-context 禁用），每步固定上下文约 14.6k token。(as of 2026-11-14)
- 维护 zentao-analyzer（D:\repository\skills\zentao-analyzer，附着缓存下载 zentao_file.py）与 OpenViking dsh-memory-plugin（profile-inject 注入 + 主动检索）；维护 C:\Users\Administrator\.openviking\ 下 OV 启动脚本与看门狗（非 git 仓，改动前备份 .bak）。(as of 2026-11-24)
- 评测资产：T1–T7 执行层任务、planner 归因样本 #1–#15、route_miss 日志、controller-bench（35 任务跨多模型）。(as of 2026-11-14)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "ea28dbbe77804524ba9b2f32dfda6b61",
  "peer_id": "github.com-tyvt-skills",
  "source_extraction_ids": [
    "05c44fadf32a4b00bb008d75f7a71b8b",
    "56d0b39026ce4ed0b4e8d1445610ebe7"
  ],
  "version": 57,
  "memory_type": "profile"
}
-->