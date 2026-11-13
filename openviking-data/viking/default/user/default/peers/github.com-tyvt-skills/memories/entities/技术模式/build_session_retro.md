# 苏住房防汛C端构建会话P0复盘
2026-11-13 用户对苏住房防汛C端项目构建/测试会话做 P0 耗时与 Token 复盘，并获助手交付优化方案。

## 会话真实指标
- 总耗时 9分34秒（seq 5→366），用户离开 2分00秒（3 次 ask_user_question），纯模型+编排器 ~7分34秒
- 宿主 2.39M 输入/16.8k 输出（命中 98%、未命中 40.6k）；编排器 48.2k token/57 次调用/3m45s
- 纯模型时间约 454s：测试 110s（happy-dom 跨源 9 用例全挂+重跑 2 次）、提交 62s、构建 48s、计划审核 91s

## P0 根因（路径/文本/日志）
- P0-1 编排器 cwd 落 langgraph-orchestrator，子模型把 `D:\repository\苏住房防汛C端` 写成 `D:\苏住房防汛C端`，build 试 3 次（seq 47/51/52，~60s+大 token 回灌）
- P0-2 计划写 4 遍+edit 失败重试（seq 21/26/27/29，~3.5k output 浪费），根因违反「先 read 再 edit、plan_review 传 diff 而非全文」
- P0-3 编排器回灌完整日志/审核意见撑起 40.6k 未命中（seq 25/26/44/47/51/52），根因 op:"full" summarizer 贴原始输出尾部

## P0 根因（编排/规则）
- P0-4 过度编排 57 次子调用/3m45s（占纯工作 ~50%），git 提交拆 4 步 4 次 pwsh（~40s），根因 AGENTS.md 要求命令/构建/检索一律 op:full
- P0-5 gate 未首次给可执行替代命令（grep path=src 被拒、Get-ChildItem 被拒、窄 grep 却放行），模型试→拒→缩范围→再试（每轮 ~3–5s+数百 token）

## 结论与预估
- 最大 P0 为「路径/命令不稳+日志回灌+计划重复」叠加，吃掉 ~2 分钟和 40k 未命中；其次为过度编排（57 次子调用）
- 修 P0-1~P0-3 预计省 30–40% 耗时、50%+ 未命中（用户预估，助手列为待验证进阶目标，因耗时重叠不可简单相加）
- 项目路径 `D:\repository\苏住房防汛C端`；优化方案见助手交付的「执行确定性与上下文预算治理」

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "build_session_retro",
  "source_extraction_id": "e7618476e4a54e1f85d37df8bc51ec11",
  "version": 1,
  "memory_type": "entities"
}
-->