# langgraph-orchestrator
LangGraph+Magpie 多模型编排器，宿主做决策与最终审阅，编排器分摊定位、检索、读文件、改代码、跑命令、判读输出等可分流工作。
## 核心组件
- graph.py：guard 白名单 `_WHITELIST_PREFIX`、只读 bypass `_readonly_read_ok`、节点 `node_summarize`
- config.yaml：模型池配置（pwsh、file_reader、summarizer 等）
- AGENTS.md：编排器选型触发词表
## 2026-11-13 P0 优化
- P0-1：AGENTS.md 增「定位阶段一律走编排器」规则（≥2 轮定位强制走编排器）
- P0-2：graph.py `_WHITELIST_PREFIX` 补 `git log`，新增 `_GIT_WRITE_ARGS` 黑名单拒 `--output/--ext-diff/--upload-pack/--exec/--receive-pack`
- P0-3：config.yaml 新增 summarizer 独立池（deepseek-v4.1-flash 主 + glm 兜底）；node_summarize 改用该池，失败时回 `[未摘要·失败原因]···` + 行级脱敏（命令行 `[redacted]`，仅留 exit/文件名/状态行）
- 修复：行级白名单补 yaml/ps1/mjs 等扩展名与 numstat 行（避免 diff 输出过度脱敏）
## 提交状态
- 4 个本地提交（95919904、7e36eee9、b46d28c6、adbb61a3）落 skills 仓 main，2026-11-13 推送两次因网络失败，待重推
- b46d28c6 变更量偏大（+64/-25），疑似混入 2026-11-12 遗留未提交配置

## 2026-11-13 编排器池落地（commit a9dccf77）
- plan_reviewer 模型池首选 cursor/grok-4.7@256k（route 1.00 唯一满分，≈$0.02/次，失败落 deepseek）
- PLANNER_SYSTEM 新增硬约束三「简单任务一步聚合」：读+改+验证有依赖链 ≤3 步；活体冒烟验证简单题输出 1 步聚合管道
- security_guard 删 glm-5.3-flash 备选（M3-3 幻觉工具误判者）

## 2026-11-13 坏账修复 Fix3（commit ce99ed19，8 文件仅提交未推送）
- 产码时系统提示含「写前三秒自检」，随源码直接生效（python 从仓库源码目录 D:\repository\skills\dsh\langgraph-orchestrator 直接调起，无需重启）

## 2026-11-13 planner 池改配（commit 29cf959e，仅本地提交未推送）
- config.yaml 的 planner.models 改为 [codex/gpt-6-luna（首选，T8-T11 T_TOTAL 0.875 第1，≈6.4s/均耗）, codex/gpt-5.6-luna（次选，0.834 第2，Δ+0.067 最大正）, workbuddy/deepseek-v4.1-flash（第三兜底）]
- 每个模型保留 max_tokens: 8192（reasoning 模型过低会 502 empty reply）；块级 max_tokens: 8192、timeout: 120 不变
- 移除原 auto/deepseek-v4.1-flash 第四兜底（与 workbuddy 同底模型、仅路由入口不同），用户明确只列 3 个
- 经 plan_review（PASS 74/100，0 P0）+ 用户人工确认后实施；pytest 148 passed（1 个 test_condense_plan order-dependent 偶发失败与改动无关）
- 重启后 op:list 复验通过：planner 池按上述顺序正确加载，其余工具池（file_reader/code_editor/code_edit_with_signal/plan_reviewer）未受影响；长任务（build/test）拆解将优先用 gpt-6-luna 规划

<!-- MEMORY_FIELDS
{
  "category": "程序/仓库",
  "name": "langgraph-orchestrator",
  "source_extraction_id": "5ed5c00a36e742dc900a698bfc77b6c0",
  "version": 5,
  "memory_type": "entities"
}
-->