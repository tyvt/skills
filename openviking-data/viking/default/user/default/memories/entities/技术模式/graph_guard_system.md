# graph.py 守卫系统
graph.py 中的命令安全守卫，在 LangGraph 编排中对 pwsh 命令做 flash 一审与 grok 终审，控制是否升级高级模型审核。

## 架构
- 指令阶段守卫 node_security_guard(519-565) 原在此做 grok 升级，但白名单只匹配命令、instruction 常带中文说明导致永远匹配不上
- 修复后将 pwsh 终审延迟到命令生成后的 node_execute，命令级窄放行命中则免 grok、未命中回退 grok(fail-safe)
- 一审 guard_fast 提示词写死仅新建文件夹或写文件才 allow=true，只读命令默认 flash=false

## 只读窄放行
- `_readonly_read_ok()`：Get-Content/Select-String 须显式 cmdlet 全名、当前目录相对路径、敏感名黑名单(.env|id_rsa|.pem|credential|secret|token)、参数白名单(-Path/-Raw/-Encoding/-TotalCount≤9999/-Pattern)、无拼接重定向
- `_WHITELIST_PREFIX` 覆盖 Get-ChildItem|Get-Location|git status|git diff|pytest|Get-Date|Test-Path
- 命中免 grok 终审，未命中照旧升级

## 审计与状态
- bypass 轨迹记 `guard ALLOW (bypass local rule[readonly-read])`，可从 costs/trace 量化降本
- 修复前每次 op=full 只读命令白花约 1.7k grok tokens，修复后免审正例 0 次 grok guard 调用
- 改动仅 src/graph.py、config.yaml 未动、已过 grok 审核+用户人工确认，但未提交(会话 2026-11-12)

## 失败闭环
- 已核实 fail-closed：graph.py L998-1009 模型失败即 DENY，单模型不构成 fail-open（2026-11-13 核实）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "graph_guard_system",
  "source_extraction_id": "6382c77436504d15a772acb7041c97fe",
  "version": 2,
  "memory_type": "entities"
}
-->