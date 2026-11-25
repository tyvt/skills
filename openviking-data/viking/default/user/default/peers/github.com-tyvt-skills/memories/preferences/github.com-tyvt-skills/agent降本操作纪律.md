- 源文件读取只用 read 工具并带 offset/limit，禁止用 pwsh Get-Content 读源文件（绕过 read 剪枝与 spill 会灌满上下文）
- HTML/JSON 用 grep 定位关键标签，spill 文件用 read 续读，不要 pwsh 二次搬运
- 未知路径先 glob（如 **/.env*、**/permission.js）一次定位，禁止连续 3 次以上 Get-ChildItem 猜目录
- 读 env 应排最前（baseURL 唯一真源）；PowerShell 构造 -Headers 一次性写好字典或用 curl.exe
- 编排器审小改动时将 diff/关键片段内联进 request，不让编排器自己读盘；小任务不走 op:"full" 的 decompose→dispatch
- eslint --fix 只修自己新增行，改完先 git diff 看是否误伤历史行；新增代码从一开始就写成项目风格免 --fix
- 用户已表态的方案选择不再重复问（合并交互确认）
- 方案 plan_review 连续多轮 grok PASS（0 P0）后主动停止循环并置 review_override: true 交用户确认，避免验证路径 token 浪费
- 浏览器验证优先用 agent-browser 内置 wait 条件而非 Start-Sleep；verify-loop 按 session 累计 sleep 会拦截 pwsh，此时改走 mcp_gateway 的 agent-browser 通道
- 源文件关键行被工具脱敏（token/密码等）时不据掩码构造 edit 的 old_string，改用按行号脚本重建并用断言校验锚点
- 启动常驻服务用 run_in_background: true；pwsh 每次调用是独立进程，前台启动会在调用结束后退出、端口无监听。
- 服务启动慢（如 get_state 探测 34 行）时按预估延长等待并反复探测端口，不凭输出缓冲或超时误判崩溃。
- 精确路径读取被探索门禁拦截时，按「确需主控直探的精确读取」豁免把形式从 read 改为 pwsh 精确读取该文件，不整目录探索、也不放弃读文档。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "agent降本操作纪律",
  "source_extraction_id": "d78e356feee040eea64432a18cebce8b",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "preferences"
}
-->