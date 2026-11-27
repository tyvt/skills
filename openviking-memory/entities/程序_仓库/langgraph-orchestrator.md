---
audit_status: valid
last_checked: 2026-11-27T14:47:13+08:00
verdict_note: skills/dsh/langgraph-orchestrator 含 langgraph/security_guard/node_verify/code_edit_with_signal，架构描述与代码一致。
---
# langgraph-orchestrator
LangGraph+Magpie 多模型编排器，位于 D:\repository\skills\dsh\langgraph-orchestrator，宿主做决策与最终审阅，编排器分摊定位、检索、读文件、改代码、跑命令、判读输出。

## 定位与架构
- 目的：不同工具交不同 magpie 模型执行，单工具可配多备切换；参考 mmvp-bench/orchestrate.py 的扇出模式；依赖 magpie 网关（base_url + api_key “magpie”）、langgraph 0.2.35、langchain-openai 0.3.35
- 核心组件：src/router.py（路由与故障转移）、src/graph.py（编排图）、src/config.py、src/cli.py；dispatch 与 execute 间插 security_guard 审 pwsh/db_write 高危调用；State 的 environment_context（cwd、env）外置、执行后写回
- AGENTS.md 为编排器选型触发词表；2026-11-13 P0-1 增「定位阶段一律走编排器」规则（≥2 轮定位强制）
- file_reader/code_editor 无本地读取权限（_NO_LOCAL_READ_TOOLS），读文件返回 [ERROR]、实为文本摘要器，真实读取走 pwsh 的 Get-Content；2026-11-12 在 PLANNER_SYSTEM 加提示并在 config.yaml 描述澄清
- 触达 composer 两路：显式 op:tool 调 code_edit_with_signal，或 op:full 写明「由 code_edit_with_signal 生成代码」
- 降级：主模型抛错/超时/空回复/命中 retry_on 关键字时降级，单模型指数退避重试，失败模型进冷却期后排队尾

## 模型池（config.yaml）
- 每工具一有序模型池（主+备）；config 按请求加载，改动免重启
- 2026-11-25 按网关 11 项清单重分配，免费优先：file_reader / image_analyst / security_guard_fast / summarizer / pwsh 主选 hy4flash-free，auto↔workbuddy 跨通道互备（规避 429）
- 积分兜底：planner 补 auto/hy4flash-free + workbuddy/hy4flash，形成三级链
- 高级任务：plan_reviewer / verifier 主选 grok-4.7@256k（网关另有 @500k）；security_guard / code_edit_with_signal 主选 kimi-k3.1-pro
- composer-2.5 重新启用：code_editor 主选 + code_edit_with_signal 中间兜底（signal 主选仍 kimi），套餐量大、消耗低，承担高频代码生成；因历史「非 JSON 坍缩」不进任何纯 JSON 角色；smoke 5.25s 返回正确代码
- 5 处 workbuddy/space-bunny 兜底全部清除（不在网关清单，属失效 id）
- 网关现 11 项：hy4flash-free×3、hy4flash×3（auto / workbuddy / workbuddy-ai）+ grok-4.7@256k 与 @500k + deepseek-v41-flash + composer-2.5 + kimi-k3.1-pro
- 2026-11-24 前置切换：15 处 deepseek-v4.1-flash → hy4flash-free（workbuddy 10、auto 5）；router.py 的 DEEPSEEK_FLASH 峰时跳过策略因 id 不再命中自动 no-op，未改代码

## 关键改动与验证
- 2026-11-13 P0-2：graph.py 白名单与 git 写参数黑名单、行级白名单扩展
- 坏账修复 Fix3（commit ce99ed19）：系统提示含「写前三秒自检」
- 2026-11-14 验证门控：verify.py、verifier 池、node_verify、PLANNER_SYSTEM 硬约束四、api.py _review.json、index.js 渲染；全量 157 测试通过
- commit a9dccf77：PLANNER_SYSTEM 硬约束三「简单任务一步聚合」；summarizer 独立池（P0-3）供 node_summarize，失败回 [未摘要·失败原因] + 行级脱敏
- 2026-11-25：tests/test_tool_signal_split.py:51/169 写死断言同步为 composer-2.5；pytest 173 passed、op:list 全池符合方案、composer-2.5 真实调用 200

## 用量统计
- 2026-11-10 前 ToolResult 仅记 tool/ok/content/model_used/attempts、Attempt 仅记 model/ok/elapsed/error，网关 usage（prompt_tokens、completion_tokens）未落盘；2026-11-10 补全：router.py 新增 Usage 数据类，_call_once 读 resp.usage 挂 ToolResult.usage 并打 [usage] 行；graph.py 每次调用追加 model_calls（角色、模型、耗时、usage）；api.py 的 run_full 返回 model_calls 与 usage_totals；审查节点补提前返回避免漏记失败审查调用

## 提交状态
- 2026-11-25：commit c33d4395 已推送 origin/main，远端 SHA 与本地一致，工作区干净

<!-- MEMORY_FIELDS
{
  "category": "程序/仓库",
  "name": "langgraph-orchestrator",
  "source_extraction_id": "2b023fef314a47ff8f7ffec192859473",
  "version": 9,
  "memory_type": "entities"
}
-->