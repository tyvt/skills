# DSH 上下文固定开销审计
2026-11-14 对 731 会话/75,055 步的上下文固定开销审计，量化每步固定重发成本并产出优化方案。

## 关键发现
- 每步固定重发上下文 = tools(~9–14k) + system(~2k) ≈ 11–16k token/步；inject 为 turn 级（非每步），约 7.3k/会话、9 事件
- 工具中位 12.7k token/步，其中 69%（≈6k）为低频重型工具：workflow 848tok 仅 0.7% 会话使用、schedule_* 1,495tok 1.4%、session_event_* ~600tok 1.5%、team_task_* 1,512tok 3.8%、session_search/trace 994tok 8.8%、goal 433tok 5.9%
- 核心工具 pwsh/read/edit/grep 使用率 90–97%，glob 59%，mcp_gateway 46%
- OpenViking 回退膨胀：38%（276/731）会话重新内联 24 个 mcp__openviking__* 独立工具，每步 +4,697 token（14.1k vs 9.4k）；mcp_gateway（246 token）本已是替代入口，两套并存纯浪费

## 优化方案
- P0 消除 OpenViking 内联回退（纯 profile 配置，零风险）≈ 省 13M 等效成本（1.2%）
- P1 重型低频工具改按需装载/裁剪 ≈ 省 40M（3.8%），合计约 5%，几乎零功能损失
- 落点均在 ~/.dsh/profiles/web/cordis.patch.yml（profile 层，非改核心），git 可回滚，改后需重启 DSH Web 生效
- 待拍板：①先做 P0 还是 P0+P1；②P1 走 profile 裁剪还是 deferLoading 懒加载（后者需先解决 magpie 路由剥除）；③是否落成正式改动计划走 plan_review

## 数据来源
- 审计基于 contextBreakdown / contextHeaders / contextTimeline 投影，覆盖 731 会话
- 报告落盘：D:\repository\skills\.plan\context-fixed-overhead-audit-20261114.md

## 落地验证（2026-11-14 批 1）
- 落地方式：profile 层（~/.dsh/profiles/web/cordis.patch.yml）在 standard 预设禁用 schedule_* 4 个与 goal 3 个工具，未走 deferLoading 懒加载
- 验证：全新会话 794ca361（preset=standard）工具数 46→39，恰好少这 7 个，无其它工具被误删（session_search/session_event_search/workflow/team_task_create/spawn_teammate/pwsh/read/edit/grep/glob 均在）
- 实测每步固定上下文 −1,275 token（schedule 829 + goal 446），新会话 toolsTokens 8,025；早前估算 1,928 偏高
- 未跑：断言 D（UI 切 full-tools 重现工具；composition 层已证 order 5 且 schedule 启用）、断言 C（/goal 命令实测）
- 收尾与下一步：备份 cordis.patch.yml.bak-p1a-20261114144410；计划+验证提交 b3b9a7a1（未推送）；下一批拟裁 session_query + workflow，预计再省约 2,100 token/步，待出草案送审

## 落地验证（2026-11-14 批 2 与生效确认）
- 批 2 定稿走方案 B：裁 tool-workflow（≈848 token/步，会话使用率仅 0.7%）、session_query 不裁（8.8% 使用率且无可切兜底）；p1a-batch2 仍为 approved、human_confirmed: false
- 配置文件实况（~/.dsh/profiles/web/cordis.patch.yml）：standard 预设 tool-schedule/tool-goal/tool-workflow 均 disabled: true，顶层 optional-tool-session-query disabled，新增 preset-full-tools 作可切回兜底
- 生效证据：配置 mtime 15:29:00，web 进程 15:34/15:35 重启；旧会话工具目录创建时冻结，15:31 截图仍为 33 项/6.2k，重启后新会话已无 schedule_*/goal/workflow/session_search（约 31 项，预期省 2–2.5k/步）
- 单条 hi 实测拆解：工具定义 6.2k(51%，33 项)、注入 4 项 3.3k(28%)、系统提示 1.7k(14%)、技能 766(6%)、助手回复 69–149、用户消息 9–11；team 工具（team_task_*/spawn/send/wait）为本会话运行时动态注入而非 profile 配置，≈1.5k 按前序决策认掉不动
- 剩余可挖：OpenViking 记忆预注入改按需 search 预计再省 1–2k；`deepseek-v4.1-flash (off)` 的 off 是推理档位（settings.yaml reasoningEfforts "off": none）而非缓存开关，缓存命中率 57% 偏低另有原因

<!-- MEMORY_FIELDS
{
  "category": "上下文优化",
  "name": "context_overhead_audit",
  "source_extraction_id": "a99f3affed2044db87ef72c4487e4122",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->