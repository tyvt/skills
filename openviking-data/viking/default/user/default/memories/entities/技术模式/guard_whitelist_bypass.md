---
audit_status: valid
last_checked: 2026-11-26T22:19:26+08:00
verdict_note: langgraph-orchestrator/graph.py 实机含 _whitelist_bypass、_readonly_read_ok、defer-to-command，白名单降本机制属实。
---
# guard 白名单放行与降本机制
langgraph-orchestrator 的 security_guard 降本方案：靠指令级/命令级白名单与只读 bypass 免掉 grok 升级审核。

## 根因与方案
- 2026-11-12 根因：grok 升级发生在 instruction 阶段（node_security_guard），白名单只匹配命令，而 planner 总给 instruction 补中文说明，致永不命中；方案见 .plan/6f0992433bb9.md（grok 审核通过 + 用户确认），仅改 src/graph.py，config.yaml 未动
- flash 拒绝后改 guard defer（reason=defer-to-command），延迟到 node_execute 命令级终审；命令级 _whitelist_bypass 命中即免 grok，trace 记 guard ALLOW (bypass local rule[readonly-read])

## 只读放行规则
- _readonly_read_ok 窄放行 Get-Content/Select-String：显式 cmdlet 全名、相对路径（拒盘符/UNC/./通配）、敏感名黑名单（.env|id_rsa|.pem|credential|secret|token）、参数白名单（-Path/-Raw/-Encoding/-TotalCount \d{1,4}(?!\d)/-Pattern）、允许前导 $var=
- _WHITELIST_PREFIX 补 git log、Get-Date|Test-Path；P0-2 新增 _GIT_WRITE_ARGS 黑名单拒 --output/--upload-pack 等，行级白名单补 yaml/ps1/mjs 等扩展名与 numstat 行；pwsh 生成提示要求读取类输出裸命令

## 坑与验证
- 坑：-TotalCount \d{1,4} 会被回溯先吃 9999 再吃剩余 9，必须加 (?!\d)；generate_command 产出的复合脚本（$c=Get-Content...）永匹配不上白名单
- 验证：纯 Get-Content 走 readonly-read bypass 零 grok 调用；Remove-Item -Recurse -Force 仍走 grok 终审 fail-safe 成立；每次省约 1.7k grok tokens

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guard_whitelist_bypass",
  "source_extraction_id": "266e30ba55914128804a7266270dd40f",
  "version": 1,
  "memory_type": "entities"
}
-->