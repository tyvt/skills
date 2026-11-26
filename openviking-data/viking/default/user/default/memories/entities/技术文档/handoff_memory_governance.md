---
audit_status: valid
last_checked: 2026-11-26T21:42:33+08:00
verdict_note: D-\plan\skills\HANDOFF-memory-governance-20261118.md 存在，交接文档记忆属实。
---
# HANDOFF-memory-governance-20261118 交接文档
记录存量过时/错误记忆治理的会话交接文档，供后续新会话接续执行。

## 位置与配套
- 路径：D:\plan\skills\HANDOFF-memory-governance-20261118.md
- 配套规则：dsh/AGENTS.md 第 78 行「记忆时效性验证与优化（P1）」节，本地提交 de173bbb（未推送）

## 内容要点
- 存量核验：工作区含备份/归档共 38369 个记忆文件；活跃库 openviking-memory/entities/ 数千条；活跃入口 viking://user/default/memories/entities/
- 存量记忆均无 frontmatter
- 治理分级：STALE 用 edit 原地修改；CONFLICT 写入 _archive 并打 archived/stale 标签 + 检索过滤；INVALID 用 forget 且需人工确认
- 建议路线：先按主题 find/search 圈定高风险热点，勿全量遍历；候选补 frontmatter 后再分级优化；冲突巡检产出清单人工复核

## 使用方式
- 铁律：禁止一刀切删除，拿不准就归档 + 检索过滤；归档必须配检索过滤；动手前走 plan→plan_review→人工确认
- 新会话读取此文档并按建议路线接续治理

<!-- MEMORY_FIELDS
{
  "category": "技术文档",
  "name": "handoff_memory_governance",
  "source_extraction_id": "15fdaa865d0b4ed59f54ac11b829a010",
  "version": 1,
  "memory_type": "entities"
}
-->