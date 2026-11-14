# langgraph-orchestrator
LangGraph+Magpie 多模型编排器，宿主做决策与最终审阅，编排器分摊定位、检索、读文件、改代码、跑命令、判读输出等可分流工作。

## 核心组件
- graph.py：guard 白名单 `_WHITELIST_PREFIX`、只读 bypass `_readonly_read_ok`、节点 `node_summarize` 与 `node_verify`
- config.yaml：模型池配置（pwsh、file_reader、summarizer、verifier、plan_reviewer 等）
- AGENTS.md：编排器选型触发词表

## 2026-11-13 优化与改配
- P0-1：AGENTS.md 增「定位阶段一律走编排器」规则（≥2 轮定位强制）
- P0-2：graph.py `_WHITELIST_PREFIX` 补 `git log`，新增 `_GIT_WRITE_ARGS` 黑名单拒 `--output/--upload-pack` 等
- P0-3：config.yaml 新增 summarizer 独立池（deepseek 主 + glm 兜底）；node_summarize 改用该池，失败时回 `[未摘要·失败原因]` + 行级脱敏
- 行级白名单补 yaml/ps1/mjs 等扩展名与 numstat 行
- 编排器池落地（commit a9dccf77）：plan_reviewer 首选 `cursor/grok-4.7@256k`（route 1.00），PLANNER_SYSTEM 硬约束三「简单任务一步聚合」，security_guard 删 glm-5.3-flash
- 坏账修复 Fix3（commit ce99ed19）：系统提示含「写前三秒自检」
- planner 池改配（commit 29cf959e）：models=[codex/gpt-6-luna, codex/gpt-5.6-luna, workbuddy/deepseek-v4.1-flash]，各 max_tokens:8192；经 plan_review PASS 74/100 + 用户确认，pytest 148 passed

## 2026-11-14 验证门控
- 新增验证门控机制（详见 verification_gate 机制记忆）：verify.py、verifier 池、node_verify、PLANNER_SYSTEM 硬约束四、api.py _review.json、index.js 渲染；全量 157 测试通过；方案 approved + human_confirmed，代码待本地提交

## 提交状态
- 2026-11-13：4 个本地提交（95919904、7e36eee9、b46d28c6、adbb61a3）落 skills 仓 main，推送两次因网络失败待重推；b46d28c6 变更量偏大疑似混入遗留配置


<!-- MEMORY_FIELDS
{
  "category": "程序/仓库",
  "name": "langgraph-orchestrator",
  "source_extraction_id": "b28f6220e1ae4a8a80e42f8cab9b0ea0",
  "version": 6,
  "memory_type": "entities"
}
-->