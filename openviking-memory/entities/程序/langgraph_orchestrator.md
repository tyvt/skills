# langgraph-orchestrator
基于 LangGraph 的多模型工具编排框架，位于 D:\repository\skills\dsh\langgraph-orchestrator（2026-11-10 确认）。

## 架构与模型池
- 配置驱动：config.yaml 每工具一个有序模型池（主+备）；composer 仅在 code_edit_with_signal 池（config.yaml:84，2026-11-13 恢复）；其余池 pwsh/planner/file_reader/code_editor/summarizer/plan_reviewer/security_guard* 为 deepseek-v4.1-flash / glm-5.3-flash 系
- pwsh 池（config.yaml L177-183）：主 workbuddy/deepseek-v4.1-flash（max_tokens 4096）→ 备 workbuddy/glm-5.3-flash（1024）；glm 全史 0 调用；61 次 grok-4.7 属旧期 guard/review 遗留、已归零（2026-11-13 核实）
- 核心组件 src/router.py（路由与故障转移）、src/graph.py（编排图）、src/config.py、src/cli.py；dispatch 与 execute 间插 security_guard 审查 pwsh/db_write 高危调用；State 的 environment_context（cwd、env）外置、执行后写回
- 降级：主模型抛错/超时/空回复/命中 retry_on 关键字时降级，单模型指数退避重试，失败模型进冷却期后排队尾
- file_reader/code_editor 纯 LLM 无本地文件权限（_NO_LOCAL_READ_TOOLS），读文件返回 [ERROR]、实为文本摘要器，真实读取经 pwsh（_run_pwsh Get-Content）；2026-11-12 在 PLANNER_SYSTEM 加提示并在 config.yaml 描述澄清；触达 composer 两条路：显式 op:tool 调 code_edit_with_signal，或 op:full 写明『由 code_edit_with_signal 生成代码』

## 依赖与目的
- 目的：不同工具交由不同 magpie 模型执行，一个工具可配多个备用模型灵活切换
- 依赖 magpie 模型网关（base_url+api_key "magpie"）、langgraph 0.2.35、langchain-openai 0.3.35；参考 mmvp-bench/orchestrate.py 的扇出模式

## Usage 统计
- 2026-11-10 前 ToolResult 仅记 tool/ok/content/model_used/attempts、Attempt 仅 model/ok/elapsed/error，未落盘网关 usage（prompt_tokens、completion_tokens）
- 2026-11-10 补全：router.py 新增 Usage 数据类，_call_once 读 resp.usage 挂 ToolResult.usage 并打 [usage] 行；graph.py 每次调用追加 model_calls（角色、模型、耗时、usage）；api.py 的 run_full 返回 model_calls 与 usage_totals；审查节点补提前返回避免漏记失败审查调用

## Guard 降本（2026-11-12）
- 根因：grok 升级在 instruction 阶段（node_security_guard），白名单只匹配命令而 planner 总给 instruction 补中文说明致永不命中；方案见 .plan/6f0992433bb9.md（grok 审核通过+用户确认），仅改 src/graph.py，config.yaml 未动
- pwsh 的 flash 拒绝后改 guard defer（reason=defer-to-command），延迟到 node_execute 命令级终审；命令级 _whitelist_bypass 命中即免 grok，trace 记 guard ALLOW (bypass local rule[readonly-read])
- _readonly_read_ok 窄放行 Get-Content/Select-String：显式 cmdlet 全名、相对路径（拒盘符/UNC/./通配）、敏感名黑名单(.env|id_rsa|.pem|credential|secret|token)、参数白名单(-Path/-Raw/-Encoding/-TotalCount \d{1,4}(?!\d)/-Pattern)、允许前导 $var=；_WHITELIST_PREFIX 加 Get-Date|Test-Path；pwsh 生成提示要求读取类输出裸命令
- 坑：-TotalCount \d{1,4} 会被回溯吃 9999 再用裸路径 token 吃剩的 9，必须 (?!\d)；generate_command 产出的复合脚本（$c=Get-Content...）永匹配不上白名单
- 端到端验证：纯 Get-Content 走 readonly-read bypass 零 grok 调用；Remove-Item -Recurse -Force 仍走 grok 终审 fail-safe 成立；每次省 ~1.7k grok tokens/升级

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "langgraph_orchestrator",
  "source_extraction_id": "64fa625c7f0f4357a0b7fb3d6d896419",
  "version": 10,
  "memory_type": "entities"
}
-->