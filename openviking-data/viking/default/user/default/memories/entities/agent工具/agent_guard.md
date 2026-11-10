# agent-guard
agent-guard 是 agent 调用调度与别名映射的守护工具。

## 功能描述
- 负责 agent 工具调用的调度与别名映射
- 属于 agent 自身运维工具链的一部分

## 近期增强
- 新增 schedule_update→schedule_edit 别名映射
- 新增 grep 命令支持
- 新增 glob→include 别名映射
- 新增 lib/scope.js 检索范围拦截（config 新增 scope 配置节），grep/glob 命中受保护根（~/.dsh、~/Documents、D:/repository、workspace 根 dir/* 通配）或 git 仓库根直接拒绝并提示缩范围，selftest 48/48 PASS
- 别名表新增 mcp__openviking__search queries→query（单元素数组解包），修复本会话实测 INVALID_ARGUMENT 白烧步

## 验证归属
- 来源：2026-11-09 agent 运维报告
- 随提交 c7f682f5 合入 main
- 2026-11-10 bug6369 复盘新增 scope 拦截与 mcp__openviking__search 别名映射，随提交 86279dd0 合入 skills 仓库（仅提交未推送）
- 拦截的运行时行为待重启 Web 后验证（截至 2026-11-10）

<!-- MEMORY_FIELDS
{
  "category": "agent工具",
  "name": "agent_guard",
  "source_extraction_id": "4b1f3497c14d489baa4f340b256e6981",
  "version": 2,
  "memory_type": "entities"
}
-->