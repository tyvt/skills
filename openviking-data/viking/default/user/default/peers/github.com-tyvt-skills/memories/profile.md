# github.com-tyvt-skills
- skills 仓 D:\repository\skills（origin/main，16 skill、8 dsh 插件）；链接 zentao-analyzer（D:\repository\skills\zentao-analyzer，附缓存下载 zentao_file.py）、worktree-snapshot、submodule-commit、session-handoff（2026-11-25 恢复 Junction）；未链接 cursor-model-routing、memory-migration-archive、openviking-autostart、vite-build-profiler。(as of 2026-11-25)
- dsh/AGENTS.md:7 验证门：截图内嵌路径锁 $env:TEMP、正斜杠、尖括号、时间戳命名，禁相对路径与 attachments 路径，内嵌前五项自检。(as of 2026-11-25)
- deploy-env 看板（端口 18098、SQLite 注册表 34 环境、nginx 站点与代理单源、五环境槽位视图、registry.sqlite 受 git 跟踪）；凭据库 34 env 行、两表加 password_plain 明文列、10 行斜杠式错配引用改 canonical viking 格式、补历史账号 5 个（管理员 2、业务测试 2、fdc-v3 local 1），privacy 库 deploy_env-pwd-county/-fangxun/-super 可解明文。(as of 2026-11-25)
- DSH web 多模型编排（LangGraph+Magpie）；planner 池 gpt-6-luna/gpt-5.4-mini、三级链；config.yaml 2026-11-24 起 15 处 deepseek id→hy4flash-free（workbuddy 10、auto 5）按请求加载免重启；router.py 峰时跳过策略自动 no-op。(as of 2026-11-25)
- dsh 工具链：cost-meter（bigMissStreak>=2、perStepUncachedBudget=10000、stepReminderThreshold=120）、plan-gate（git 三态拦截+_review.json 校验）、solve-captcha.mjs（默认 auto/deepseek-v4.1-flash）、concise-report（三段式）。(as of 2026-11-16)
- agent-guard：exploration-drift 为 warn 仅记账；verify-loop（agentBrowserMax 12、Start-Sleep 5、按 session 累计不重置）2026-11-24 由 block 降 warn，需重启 web 后新会话生效。(as of 2026-11-24)
- web 预设：preset-standard 禁用 tool-workflow，preset-cordis 与 preset-full-tools 仍启用；skill 目录 40 项（dsh-harness-dev-context 禁用），每步固定上下文约 14.6k token。(as of 2026-11-14)
- OpenViking：dsh-memory-plugin（profile-inject 注入+主动检索）；启动脚本与看门狗在 C:\Users\Administrator\.openviking\（git 仓 master、未配置 remote 无法 push，改动前备份 .bak），2026-11-25 起两处 LLM 切 hy4flash-free 主+hy4flash 积分兜底；记忆库约 6585 条、纯 Markdown 无 frontmatter、URI viking://user/default/memories/{entities,preferences,_archive}/...，ov CLI v0.5.5（ls -r/read/write/set-tags/glob、--output json），Python SDK 顶层无导出、脚本只能走 CLI；每日 08:30 记忆审计定时任务 schedule-e31f1263-6af2-4270-9031-b04f4a795ce9（target=new、active，下次 2026-11-26 08:30）。(as of 2026-11-25)
- 工具面：pwsh 不可用，改用 ops_bash；现有原生 schedule_* 工具。(as of 2026-11-25)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "f2a8db2e14684d0a99823d40cc5f06b1",
  "peer_id": "github.com-tyvt-skills",
  "source_extraction_ids": [
    "05c44fadf32a4b00bb008d75f7a71b8b",
    "56d0b39026ce4ed0b4e8d1445610ebe7"
  ],
  "version": 77,
  "memory_type": "profile"
}
-->