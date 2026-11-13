# 实施优化方案会话P0复盘
2026-11-13 用户对「实施上一会话优化方案」会话做 P0 复盘，文档 .plan/p0-retro-implement-session-20261113.md 已定稿为「实施类会话」基线文档。

## 会话真实指标
- 未命中 59.3k（97% 缓存命中），总输入 2.10M，输出 20.3k
- 活跃 603s（10m3s），编排器仅调用 1 次（plan_review，34.3s）
- 总活跃 603s；人工切换 ~61s（51.5s 决策 + 9.8s 抖动）不计入 agent 成本
- agent 有效耗时 542s：执行 42s（7.7%），模型侧 ~92%
- 耗时结构：参数 183s(33.8%) + 等待 193s(含人工61s) + 思考 139s(25.6%) + 回复 44.5s(8.2%) + 执行 42s(7.7%)

## 耗时根因（T1已撤回，T2-T5）
- T2 单步 5.8k output：step 28 reasoning 预演 8 条修订只发 1 个 edit（39.9s+6k未命中）
- T3 工具参数 183s(33.8%)：57 次调用×3.2s，10 次 edit 中文长 new_string 为主因（耗时第一）
- T4 ≥10 次无效调用：glob 失败 4、grep 被 orchestrator-gate 拒 3、write 被 plan-gate 拒 1、read 路径错 1（≈35-45s）
- T5 ask 选项错位：step 9 问实施范围未覆盖「先改方案」（1 轮往返）

## Token根因（K1-K6）
- K1 工具结果 781.2k(36.9%)：step 51 git status --short 打 23,259 bytes（openviking-data 未跟踪 spill）
- K2 工具定义 486.1k(23.0%)：9.1k/步×56 步固定重发，23 工具全量注入
- K3 AGENTS.md 编辑复利：2 次 edit 触发 3 次全量 instructions 注入（seq 275/283/285，其中 283/285 同 digest 重复注入，疑 harness 冗余）；step 45 input=457（seq 271），step 46=3,356、step 47=3,370（原文档误将 3,356 记到 step 45 并自相矛盾，已更正）
- K4+K5 注入 351.0k（recall+成本告警含18k冷启误报+3次system-reminder）；未命中59.3k中40%可避免（首步18.3k+step28的6k）
- K6 定位阶段 18 步低效(step10-27)：12 grep+8 glob+1 pwsh 拿 4 组文件:行号，6 次失败/0 结果

## 根因归纳与交付
- 步数膨胀：56 步中 18 步定位、≥10 步无效、4 步可合并小 edit(step29-32)，有效步<30
- 单步过大：step28 一步 5.8k output+6k 未命中+40s
- 固定开销 655k(31%)：工具定义486k+系统提示110k+技能注入59k，随步数线性放大
- 反证与动作：违反 R5（step51 裸 git status 未限子模块）需 hook enforcement；最优先3动作=合并/拆分edit、检索前先pwsh定位、工具定义按需加载；次级=instructions批量改、R5升级hook；新增第6条「提交返工(step51→53)」
- 交付文档：.plan/p0-retro-implement-session-20261113.md（TEMPLATE六节，已定稿基线；来源会话2026-11-13；T3证据行误归属与K3括号自相矛盾已在本会话修正；文档本身无代码改动未走plan_review）
- 后续落地（2026-11-13）：实施计划 .plan/implement-retro-optimizations-20261113.md 获批并执行——R5 hook（dsh/agent-guard/lib/rules.js 新增导出 warnBareGitStatus 纯告警函数 + repairArguments 分派，单测11/11通过）、AGENTS.md 四条规则文本（④-1合并edit、④-2 pwsh定位、④-4 instructions批量改、④-6 提交前校验）落地，提交 f95d1add（main，未推送）；④-3 工具懒加载（harness核心）未做留议；R5 hook 需重启 dsh web 生效

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "implement_session_retro",
  "source_extraction_id": "28c3d0ada6314a048aee894288d0b379",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->