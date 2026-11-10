# D:\repository\skills\dsh\AGENTS.md
dsh 技能的代理行为说明文档，规定代码与系统运维工作的默认原则与约束。

## 编码状态
- 修复前为混合编码：前部合法 UTF-8，尾部约 1KB（从「仅要求提交时…」起）为 GBK
- 2026-11-10 修复后全文为合法 UTF-8 无 BOM，34,908 字节，严格解码通过

## 关键规则
- 「编码任务默认走编排器」第 6 条：严禁未知具体路径时全盘 grep/read 搜索代码
- 大面积排查代码逻辑须调用 orchestrate 编排器，自身只阅读底层廉价模型返回的摘要

## 新增规则（2026-11-10）
- 收尾条 7：自动化环境跑 rebase --continue / commit 前必须设 GIT_EDITOR=true，并附 merge-base --is-ancestor 禁止脑内推演祖先关系
- Token 条 6：截图放上下文尾部、一次一张，避免 attachment 打穿 prefix cache
- 收尾条 8：build 产物（如 version.json）禁止提交，脏了用 git checkout -- 还原
- 收尾条 9：交付前 token-optimizer 自查

## DBX.md 变更（2026-11-10）
- 禁忌第 1 条改为 Dameng 找表固定 ALL_TABLES+LIKE 脚本
- 新增「先查真实数据再读代码」流程条

## 关联
- 位于 dsh 技能仓库（D:\repository\skills\dsh）
- 2026-11-10 本地提交 e2414c3b（仅 AGENTS.md 与 DBX.md，未推送）
- 2026-11-10 bug6369 复盘，AGENTS.md 第 9 条与 DBX.md 禁忌变更随提交 86279dd0 合入 skills 仓库（仅提交未推送）

<!-- MEMORY_FIELDS
{
  "category": "技术文档",
  "name": "dsh_agents_md",
  "source_extraction_id": "4b1f3497c14d489baa4f340b256e6981",
  "version": 3,
  "memory_type": "entities"
}
-->