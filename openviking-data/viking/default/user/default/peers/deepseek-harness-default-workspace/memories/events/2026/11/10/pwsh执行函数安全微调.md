# Summary
用户要求对 _run_pwsh 做三处微调：合并环境变量（env={**os.environ, **env}）、cwd 不存在时回退 os.getcwd()、启动参数加 -ExecutionPolicy Bypass；助手提供了修改后的函数与调用处传参（ctx.get("env") or {}）。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 代码逻辑非常完美，shell=False 的安全设计很棒。为了确保 environment_context 里的环境变量能真实作用到 PowerShell 的子进程中，请对 _run_pwsh 和调用它的地方做两个微调：

合并环境变量：修改 _run_pwsh 函数签名，增加 env 参数。在内部调用 subprocess.run 时，传入 env={**os.environ, **env}。

修复工作目录缺失：如果 ctx["cwd"] 因为某种原因不存在（比如目录被删了），subprocess 会抛错。请在 _run_pwsh 里加个 if not os.path.exists(cwd): cwd = os.getcwd() 的兜底。

增加执行策略绕过（可选）：为了防止 Windows 默认执行策略拦截，建议在 PowerShell 启动参数里加上 -ExecutionPolicy Bypass。

请输出修改后的 _run_pwsh 代码。
**assistant [peer=deepseek-harness-default-workspace]**: `_run_pwsh` 按这三点改好了：子进程环境是父进程环境叠上 `environment_context.env`，同名变量以后者为准；目录不存在或不是目录时退回 `os.getcwd()`；启动参数加上 `-ExecutionPolicy Bypass`。`shell=False` 不变。

```python
def _run_pwsh(command: str, cwd: str, env: Dict[str, str], timeout: float) -> str:
    if not cwd or not os.path.isdir(cwd):
        cwd = os.getcwd()
    merged = {**os.environ, **{str(k): str(v) for k, v in (env or {}).items()}}
    completed = subprocess.run(
        [
            "powershell.exe",
            "-NoProfile",
            "-NonInteractive",
            "-ExecutionPolicy", "Bypass",
            "-Command", command,
        ],
        cwd=cwd,
        env=merged,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=timeout,
        shell=False,
    )
    return (
        f"$ {command}\n"
        f"exit={completed.returncode}\n"
        f"--- stdout ---\n{completed.stdout}\n"
        f"--- stderr ---\n{completed.stderr}"
    )
```

调用处改成：

```python
content = _run_pwsh(command, ctx["cwd"], ctx.get("env") or {}, cfg.execution.pwsh_timeout)
```

子进程会继承当前 Python 进程的全部环境变量，编排器进程里的密钥也会进 PowerShell。`mock_execution: true` 时这条函数不会被调用。

<!-- MEMORY_FIELDS
{
  "event_name": "pwsh执行函数安全微调",
  "goal": "微调_run_pwsh函数",
  "summary": "用户要求对 _run_pwsh 做三处微调：合并环境变量（env={**os.environ, **env}）、cwd 不存在时回退 os.getcwd()、启动参数加 -ExecutionPolicy Bypass；助手提供了修改后的函数与调用处传参（ctx.get(\"env\") or {}）。",
  "ranges": "26-38",
  "source_extraction_id": "5fffb9d9c738449aa5cc01e1cd82a1aa",
  "version": 1,
  "memory_type": "events"
}
-->