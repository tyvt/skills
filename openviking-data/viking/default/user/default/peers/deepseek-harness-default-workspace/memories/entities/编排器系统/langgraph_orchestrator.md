# 编排器（LangGraph+Magpie 多模型编排）
按需调用的多模型协作工具网关，提供工具分发与模型池自动故障转移能力。

## 接口与工具池
- 网关 http://127.0.0.1:3425/v1，api_key=magpie；op=list 看工具/模型池，op=full 完整编排，op=tool 指定单工具；全局默认 request_timeout 120s、temperature 0.2、max_tokens 2048、单模型重试 1 次、失败冷却 600s
- file_reader：auto/deepseek-v4.1-flash→workbuddy-ai/hy3→cursor/deepseek-v41-flash-1017；max_tokens 2048；每次调用携带 graph.py 的 NO_LOCAL_FILE_SYSTEM 系统提示：读不到目标路径只返回 [ERROR] 无法读取本地文件，请宿主提供源码片段。，禁止猜测代码与超20字说明（2026-11-10 新增）
- code_editor：workbuddy/deepseek-v4.1-flash→auto/deepseek-v4.1-flash→cursor/deepseek-v41-flash-1017；max_tokens 4096，timeout 300；每次调用携带 NO_LOCAL_FILE_SYSTEM 系统提示（2026-11-10 新增）
- planner：cursor/grok-4.7@256k→auto/hy3→autoclaw-cn/zai_glm-5.3-flash；max_tokens 4096，timeout 300
- image_analyst：cursor/deepseek-v41-flash-1017（2026-11-10 强制单模型）；max_tokens 4096
- security_guard：cursor/grok-4.7@256k（仅单模型，失败或回复非合法 JSON 拒绝）；max_tokens 512，timeout 60
- pwsh：workbuddy/deepseek-v4.1-flash→auto/hy3；description 覆盖 pytest/git 场景（python -m pytest -q --tb=short、git status --short、git switch -c、git add、git commit），禁 push --force/reset --hard/rm -rf，只输出命令；max_tokens 512，timeout 60；受 security_guard 审查（2026-11-10 新增）
- db_write：受 security_guard 审查高危工具，无独立模型池（2026-11-10 状态）
- git：local:true 本地工具，不进模型池（2026-11-10 新增）；仅执行 git status --short 与 git diff --stat，合计超20行截断；rebase/stash 冲突仅回 Conflict detected 与冲突文件名，不回灌 Git hint；pwsh 生成的 git 命令输出同样走此截断

## 执行与调度
- config.yaml execution 段：mock_execution（默认 true 模型扮演，2026-11-10 用户改 false 后本地真跑）、pwsh_timeout 30（2026-11-10 新增）
- node_execute 内 security_guard 放行后 pwsh 走 router.run_tool 生成命令；mock=true 不调 subprocess 回执带命令，=false 调 _run_pwsh 真实执行（2026-11-10 新增）
- _run_pwsh(command,cwd,env,timeout)：subprocess.run(["powershell.exe","-NoProfile","-NonInteractive","-ExecutionPolicy","Bypass","-Command",command], capture_output=True, text=True)，返回"$ 命令/exit=码/stdout/stderr"（2026-11-10 新增）
- _apply_env_delta 仅从最终 command 匹配 Set-Location/cd 与 export/$env: 写回 cwd/env，不再扫描回执（2026-11-10 修复双计 bug：原回执重复带 Set-Location 致双重目录）；回执仅 JSON ENV_UPDATE 兜底
- src/cli.py 启动将 stdout/stderr 包成 UTF-8（io.TextIOWrapper encoding='utf-8'），修复 Windows 终端中文乱码（2026-11-10 修复）
- 默认不自动触发，仅会话显式发起或 AGENTS.md 编码类规则才走编排器；主模型抛错/超时/空回复故障转移，失败模型不原地重试
- 超时链：模型 spec.timeout > 工具 tool.timeout > 全局 request_timeout（2026-11-10 新增工具级 timeout）

## 安全审查
- 图边 dispatch→security_guard→execute；security_guard 审查 pwsh/db_write
- config.yaml security 段：guarded_tools=[pwsh,db_write]、deny_regex（drop table/truncate/rm -rf 等）、security_guard_tool: security_guard；正则仅作线索交 Grok 判断不自动拦截
- 状态外置：State.environment_context（cwd/env 子集/上次退出码）拼进执行 prompt，执行完从 ENV_UPDATE/cd/Set-Location/$env:/export 写回

## 项目与集成
- 项目 D:\repository\skills\dsh\langgraph-orchestrator（tyvt/skills Git 仓库），2026-11-10 迁入提交 commit 79de4599；新增工具级 timeout 提交 commit ec174bd5
- 2026-11-10 新增 security_guard 节点与 environment_context：剔除 minimax-code/MiniMax-M3.1-Flash 与 workbuddy-ai/hy4free，graph.py 改 dispatch→security_guard→execute；代码未提交，配置可加载
- python 侧改动由子进程每次读取无需重启 DSH Web；仅 cordis.patch.yml 改动需重启；插件包 dsh/orchestrator 的 projectDir 指向新路径
- DSH Web：会话 orchestrate 工具写 {op:"full",request:"<原话>"} 到 src/jsonbridge.py stdin → api.run_full()→run_orchestration()，返回 JSON(final/plan/steps/trace)；插件 renderResult 渲染卡片；op=tool+tool=pwsh 只走 pwsh 池；verbose:true 显示轨迹，cordis.patch.yml 需重启生效（2026-11-10 新增）
- 高危拦截渲染（security_guard DENY，如强制 push）：不渲染为红色异常卡片，Python 进程正常退出；拦截记为该步失败结果，编排继续汇总。Web 中呈现为 orchestrate 工具卡片内的普通文本段。verbose:true 且 Web 按新 cordis.patch.yml 重启后，卡片含「轨迹:」行（guard DENY tool=pwsh reason=… | execute 1/1 blocked | summarize ok=True）、「计划:」「各步:」（各步仅 ok=false 不重复命令正文）、末段 summarize 模型所写「已拦截，未执行。security_guard 拦截: …」；命令不进 subprocess。Web 未重启则 verbose 仍旧 false，卡片仅显示末段汇总（2026-11-10 确认）
- 2026-11-10 实弹测试（mock_execution=false）四步真实执行写 data.json 确认 {"status":"ok"} 后删 test_agent；回归测试（mock）planner 拆两步命令 git status --short 与 python -m pytest -q --tb=short 工作目录未改动

<!-- MEMORY_FIELDS
{
  "category": "编排器系统",
  "name": "langgraph_orchestrator",
  "source_extraction_id": "7240c132c3ca4a33a634b1327c171132",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 8,
  "memory_type": "entities"
}
-->