# Summary
用户提出为 pwsh 新增独立模型池、在 node_execute 中用 subprocess 真实执行并生成真实回执，同时保留 mock_execution: true 作为默认兜底（用户确认后再手动改 false 放开真实执行）；助手提供了 config.yaml（execution.mock_execution、pwsh_timeout、tools.pwsh 模型池 workbuddy/deepseek-v4.1-flash 与 auto/hy3）与 node_execute 的 _run_pwsh/subprocess 代码，shell=False。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 请帮我补齐真实的工具执行链路：

配置模型池：在 config.yaml 中为 pwsh 新增一个模型池（建议用 workbuddy/deepseek-v4.1-flash 或 auto/hy3），它的作用是把自然语言转化为具体的 PowerShell 命令。

实现真实执行器：在 node_execute 节点中，引入真实的执行逻辑。如果 tool_name == 'pwsh'，先用 router.run_tool('pwsh', ...) 让模型生成出真正的 Shell 命令（如 Get-ChildItem），然后使用 Python 的 subprocess.run() 在本地执行这行命令，捕获 stdout 和 stderr 作为结果返回。

生成真实的回执：把 subprocess 执行的真实输出（包含报错信息）构造进 res.content 中，这样 _apply_env_delta 才能真正解析到系统输出的变化。

保留 Mock 机制作为兜底：先在 config.yaml 里加一个全局变量 mock_execution: true，默认先让模型角色扮演。等我确认没问题了，我再手动改成 false 放开真实执行。

请先给我看修改后的 config.yaml 以及 node_execute 里结合 subprocess 的执行代码。”
**assistant [peer=deepseek-harness-default-workspace]**: 先按「默认只模拟、你手动改开关才真跑」来设计。`pwsh` 会进规划器的工具列表，`security_guard` 仍然挡在执行前面。`subprocess` 不走 `shell=True`，超时和工作目录用当前 `environment_context`。

`config.yaml` 增加两段：

```yaml
execution:
  mock_execution: true    # true=模型扮演执行结果；改成 false 才本地真跑
  pwsh_timeout: 30        # 真实执行超时(秒)

tools:
  pwsh:
    description: 把自然语言转成一条可执行的 PowerShell 命令。只输出命令本身。
    models:
      - model: workbuddy/deepseek-v4.1-flash
      - model: auto/hy3
    max_tokens: 512
    timeout: 60
```

`node_execute` 里，审查拒绝的分支保持不动。通过之后，`pwsh` 单独走这条链路：

```python
def _extract_command(text: str) -> str:
    parsed = _extract_json_object(text)
    if parsed and isinstance(parsed.get("command"), str):
        return parsed["command"].strip()
    text = re.sub(r"^```(?:powershell|ps1)?\s*", "", (text or "").strip(), count=1, flags=re.I)
    text = re.sub(r"\s*```\s*$", "", text, count=1)
    return text.strip().splitlines()[0].strip() if text.strip() else ""

def _run_pwsh(command: str, cwd: str, timeout: float) -> str:
    completed = subprocess.run(
        ["powershell.exe", "-NoProfile", "-NonInteractive", "-Command", command],
        cwd=cwd,
        capture_output=True,
        text=True,
        timeout=timeout,
        shell=False,
    )
    return (
        f"$ {command}\n"
        f"exit={completed.returncode}\n"
        f"--- stdout ---\n{completed.stdout}\n"
        f"--- stderr ---\n{completed.stderr}"
    )

# node_execute 内，guard 放行之后：
if requested == "pwsh":
    gen = router.run_tool(
        "pwsh",
        [
            {"role": "system", "content": "只输出一行 PowerShell 命令，不要解释。"},
            {"role": "user", "content": "ENVIRONMENT_CONTEXT:\n" + json.dumps(ctx, ensure_ascii=False) + "\n\n" + instruction},
        ],
    )
    command = _extract_command(gen.content) if gen.ok else ""
    if not command:
        content, ok, model_used = f"未生成命令: {gen.content}", False, gen.model_used
    elif cfg.execution.mock_execution:
        content = f"[mock] $ {command}\n(未执行。模型回执)\n{gen.content}"
        ok, model_used = True, gen.model_used
    else:
        try:
            content = _run_pwsh(command, ctx["cwd"], cfg.execution.pwsh_timeout)
            ok, model_used = True, gen.model_used
        except subprocess.TimeoutExpired as e:
            content = f"$ {command}\nTIMEOUT\n{e}"
            ok, model_used = False, gen.model_used
    new_ctx = _apply_env_delta(ctx, command or instruction, content)
    results.append({..., "ok": ok, "content": content, "model_used": model_used})
    return {"results": results, "cursor": i + 1, "trace": trace, "environment_context": new_ctx}
```

`mock_execution: true` 时不调用 `subprocess`，回执里带上生成的命令，方便核对。改成 `false` 后，真实的 stdout、stderr 和退出码进入 `res.content`，`Set-Location` / `cd` 仍由现有 `_apply_env_delta` 写回 `cwd`。审查拒绝的命令不会走到生成，也不会执行。

<!-- MEMORY_FIELDS
{
  "event_name": "pwsh真实执行链路设计",
  "goal": "设计pwsh真实执行方案",
  "summary": "用户提出为 pwsh 新增独立模型池、在 node_execute 中用 subprocess 真实执行并生成真实回执，同时保留 mock_execution: true 作为默认兜底（用户确认后再手动改 false 放开真实执行）；助手提供了 config.yaml（execution.mock_execution、pwsh_timeout、tools.pwsh 模型池 workbuddy/deepseek-v4.1-flash 与 auto/hy3）与 node_execute 的 _run_pwsh/subprocess 代码，shell=False。",
  "ranges": "0-25",
  "source_extraction_id": "5fffb9d9c738449aa5cc01e1cd82a1aa",
  "version": 1,
  "memory_type": "events"
}
-->