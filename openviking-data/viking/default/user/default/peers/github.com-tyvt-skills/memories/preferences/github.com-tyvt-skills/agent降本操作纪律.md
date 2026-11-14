- 源文件读取只用 read 工具并带 offset/limit，禁止用 pwsh Get-Content 读源文件（绕过 read 剪枝与 spill 会灌满上下文）
- HTML/JSON 用 grep 定位关键标签，spill 文件用 read 续读，不要 pwsh 二次搬运
- 未知路径先 glob（如 **/.env*、**/permission.js）一次定位，禁止连续 3 次以上 Get-ChildItem 猜目录
- 读 env 应排最前（baseURL 唯一真源）；PowerShell 构造 -Headers 一次性写好字典或用 curl.exe
- 编排器审小改动时将 diff/关键片段内联进 request，不让编排器自己读盘；小任务不走 op:"full" 的 decompose→dispatch
- eslint --fix 只修自己新增行，改完先 git diff 看是否误伤历史行；新增代码从一开始就写成项目风格免 --fix
- 用户已表态的方案选择不再重复问（合并交互确认）
- 方案 plan_review 连续多轮 grok PASS（0 P0）后主动停止循环并置 review_override: true 交用户确认，避免验证路径 token 浪费

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "agent降本操作纪律",
  "source_extraction_id": "5e931fb4b68b489cb2c68dd13b880794",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "preferences"
}
-->