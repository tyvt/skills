# langgraph-orchestrator
LangGraph+Magpie 多模型编排器，位于 D:\repository\skills\dsh\langgraph-orchestrator，宿主做决策与最终审阅，编排器分摊定位、检索、读文件、改代码、跑命令、判读输出。

## 定位与架构
- 目的：不同工具交不同 magpie 模型执行，单工具可配多备切换；参考 mmvp-bench/orchestrate.py 的扇出模式；依赖 magpie 网关（base_url + api_key "magpie"）、langgraph 0.2.35、langchain-openai 0.3.35
- 核心组件：src/router.py（路由与故障转移）、src/graph.py（编排图）、src/config.py、src/cli.py；dispatch 与 execute 间插 security_guard 审 pwsh/db_write 高危调用；State 的 environment_context（cwd、env）外置、执行后写回
- AGENTS.md 为编排器选型触发词表；2026-11-13 P0-1 增「定位阶段一律走编排器」规则（≥2 轮定位强制）
- file_reader/code_editor 无本地读取权限（_NO_LOCAL_READ_TOOLS），读文件返回 [ERROR]、实为文本摘要器，真实读取走 pwsh 的 _run_pwsh Get-Content；2026-11-12 在 PLANNER_SYSTEM 加提示并在 config.yaml 描述澄清
- 触达 composer 两路：显式 op:tool 调 code_edit_with_signal，或 op:full 写明「由 code_edit_with_signal 生成代码」
- 降级：主模型抛错/超时/空回复/命中 retry_on 关键字时降级，单模型指数退避重试，失败模型进冷却期后排队尾

## 模型池（config.yaml）
- 每工具一有序模型池（主+备）；composer 仅挂 code_edit_with_signal 池（config.yaml:84，2026-11-13 恢复）；planner/file_reader/code_editor/summarizer/plan_reviewer/security_guard* 池原为 deepseek-v4.1-flash / glm-5.3-flash 系
- 2026-11-24 全量切换：15 处 deepseek-v4.1-flash 模型 id 替换为 hy4flash-free（workbuddy/deepseek-v4.1-flash → workbuddy/hy4flash-free，auto/ 同规则），用户明确选 free 变体以保持通道前缀与免费定位；网关实测有 auto/hy4flash-free、workbuddy/hy4flash-free、workbuddy/hy4flash（非 free）、workbuddy-ai/hy4flash-free，无 auto/hy4flash 非 free；router.py 的 DEEPSEEK_FLASH 峰时跳过策略因 id 不再命中自动 no-op，未改代码；旧记忆「主控模型池首选 workbuddy/deepseek-v4.1-flash」「planner 池首 deepseek」已过期
- pwsh 池（L177-183，2026-11-13 快照）：主 workbuddy/deepseek-v4.1-flash（max_tokens 4096）→ 备 workbuddy/glm-5.3-flash（1024）；glm 全史 0 调用；61 次 grok-4.7 系旧期 guard/review 遗留已归零
- planner 池（commit 29cf959e）：models=[codex/gpt-6-luna, codex/gpt-5.6-luna, workbuddy/deepseek-v4.1-flash]，各 max_tokens 8192；经 plan_review PASS 74/100 + 用户确认，pytest 148 passed
- 编排器池落地（commit a9dccf77）：plan_reviewer 首选 cursor/grok-4.7@256k（route 1.00）；PLANNER_SYSTEM 硬约束三「简单任务一步聚合」；security_guard 删 glm-5.3-flash
- summarizer 独立池（P0-3）：deepseek 主 + glm 兜底；node_summarize 改用该池，失败时回 [未摘要·失败原因] + 行级脱敏

## 关键改动与验证
- 2026-11-13 P0-2：graph.py 白名单与 git 写参数黑名单、行级白名单扩展（细节见 guard_whitelist_bypass 机制）
- 坏账修复 Fix3（commit ce99ed19）：系统提示含「写前三秒自检」
- 2026-11-14 验证门控：verify.py、verifier 池、node_verify、PLANNER_SYSTEM 硬约束四、api.py _review.json、index.js 渲染；全量 157 测试通过；方案 approved + human_confirmed，代码待本地提交
- 2026-11-24：同步修正 tests/test_tool_signal_split.py 兜底断言（deepseek→hy4flash）；test_scheduling.py、test_offtask_guard.py 用合成/日志字符串未改；验证 config load OK、orchestrate op:list 全池显示 hy4flash 无 deepseek、pytest 173 passed、auto/hy4flash-free 真实调用 200 OK（workbuddy/hy4flash-free 因账号频率限制 429）

## 用量统计
- 2026-11-10 前 ToolResult 仅记 tool/ok/content/model_used/attempts、Attempt 仅记 model/ok/elapsed/error，网关 usage（prompt_tokens、completion_tokens）未落盘
- 2026-11-10 补全：router.py 新增 Usage 数据类，_call_once 读 resp.usage 挂 ToolResult.usage 并打 [usage] 行；graph.py 每次调用追加 model_calls（角色、模型、耗时、usage）；api.py 的 run_full 返回 model_calls 与 usage_totals；审查节点补提前返回避免漏记失败审查调用

## 提交状态
- 2026-11-13：4 个本地提交（95919904、7e36eee9、b46d28c6、adbb61a3）落 skills 仓 main，推送两次因网络失败待重推；b46d28c6 变更量偏大疑似混入遗留配置
- 2026-11-24：commit 636e780b 已本地提交；push origin/main 因网络（Connection reset / Empty reply）失败，本地 ahead 2，待网络恢复后推送

<!-- MEMORY_FIELDS
{
  "category": "程序/仓库",
  "name": "langgraph-orchestrator",
  "source_extraction_id": "266e30ba55914128804a7266270dd40f",
  "version": 7,
  "memory_type": "entities"
}
-->