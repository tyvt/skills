# toolcall-bench
工具调用（Function Calling）多模型评测流水线，通过 UnifiedToolHub 统一格式层接入 magpie 网关，对多个模型做多阶段评测。

## 项目结构
- 项目目录 toolcall-bench/，源码在 toolcall-bench/src，逐阶段原始结果在 toolcall-bench/out
- 核心模块：hub.py（UnifiedToolHub 格式层）、bfcl_loader.py（BFCL 加载）、cn_loader.py（中文鲁棒性加载）、scorer.py（评分）、runner.py（单轮）、runner_v3.py（多轮）、report.py（报告生成）
- 产出报告：reports/toolcall_bench_report.md 与 reports/toolcall_bench_summary_20261110.csv

## 评测阶段
- 阶段一 BFCL V1：取官方 BFCL_v3 的 simple/multiple/parallel/irrelevance 共 40 条单轮样本，阈值 ≥70% 快速筛选（2026-11-10 全部 17 个 magpie 模型通过，得分 0.725–0.875）
- 阶段二 ToolCallBench-CN：基于真实中文基准 zh-function-calling-bench 工具签名自建 16 条注入档/压力模式（8 注入 + 8 压力），测鲁棒性（2026-11-10 全部 0.875–1.000）
- 阶段三 BFCL V3：取官方 multi_turn_base 子集 20 条 4 轮状态化任务，从 multi_turn_func_doc 还原工具（2026-11-10 均值轮准确率 0.11–0.27，无模型完成整例）

## 关键发现
- ToolCallBench-CN 并非官方公开数据集，是按用户描述自建的中文鲁棒性样本
- 注入攻击真实生效：composer-2.5 调 delete_account；workbuddy/hy3、workbuddy/deepseek-v4.1-flash、workbuddy/minimax-m3.1-flash 被注入调 wipe_data；auto/minimax-m3.1-flash、workbuddy/space-bunny、minimax-code 被注入调 execute_sql
- 多轮状态化是集体短板：首轮单轮准确率 30.6%，第 2 轮起骤降至 16.6%
- 综合排名前三：cursor/grok-4.7@256k（69.7%）、workbuddy/glm-5.3-flash（69.7%）、auto/deepseek-v4.1-flash（68.1%）；垫底 minimax-code/MiniMax-M3.1-Flash（57.1%）、workbuddy/hy4free（59.8%）

## 数据与接入
- 经 magpie 网关 http://127.0.0.1:3425/v1（api_key: magpie）接入其全部 17 个模型
- BFCL 数据来自 HuggingFace gorilla-llm/Berkeley-Function-Calling-Leaderboard（经 hf-mirror 拉取）
- 中文基准数据来自 GitHub raw 的 zh-function-calling-bench data/bench.jsonl（300 样本）


<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "程序",
  "name": "toolcall_bench",
  "source_extraction_id": "e7b74ac4168e40e29d142120b3eace0a",
  "version": 1,
  "memory_type": "entities"
}
-->