# agent-browser会话超时坑
agent-browser 的页面状态依赖同一 CLI 进程与会话环境，跨独立命令或不合适的 timeout 会导致空白页。

## 会话状态
- 独立 CLI 调用不保持页面：open 后再次连接可能是 about:blank；命名 session 未跨 CLI 调用保持页面。
- 用 `session id` 生成新稳定 session 名，并 `export AGENT_BROWSER_SESSION`，在同一 shell 内串完 open→读取→截图，可保持页面状态。
- 后台整条运行可避免等待/前台挂起；中途 job_kill 可能杀掉 browser daemon。

## 超时坑
- `timeout` 包裹会在动作完成后强杀 agent-browser，导致 CDP 页面 tab 被关闭；随后 `get url` 返回 about:blank，截图约 3.5KB 且为空白。
- 去掉 timeout、复用「export + %VAR%」成功组合后，禅道任务 2961 验证中 get url 返回 `http://localhost:8102/#/pages/login`，截图约 24KB、1256×625。
- 截图有效还可通过格式自检五项确认：尖括号包裹、无反斜杠、.png、时间戳、位于 Temp 路径。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agent浏览器会话超时坑",
  "source_extraction_id": "4c7cdd6113aa40cbb73b4339838a263a",
  "version": 1,
  "memory_type": "entities"
}
-->