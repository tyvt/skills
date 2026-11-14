# concise_report
用于任务收尾总结极简化的 DSH skill，默认极简、要点式，不丢失信息。

## Description
- 由 github.com-tyvt-skills 于 2026-11-14 创建并落地（commit 49992ccd，仅提交未推送）
- 收尾总结改为要点式，默认极简，只说要点不丢失信息
- 2026-11-14 验证通过：SKILL.md 的 frontmatter（name/description）与 4 段正文齐全、dsh/AGENTS.md:94 指针在位、commit 49992ccd 已入库但未推送

## Structure
- 三段式结构：结论 / 改动证据 / 待定项
- 删除过程复述与客套话
- 未执行项必写
- 含反例→正例对照示例

## Integration
- `dsh/AGENTS.md:94`「提问与收尾」节加一行指针使其生效
- 新 skill 在下一个新会话才出现在可加载列表；AGENTS 指针当前会话已生效

<!-- MEMORY_FIELDS
{
  "category": "DSH技能",
  "name": "concise_report",
  "source_extraction_id": "71d915e019e04d9bbdbdaa7a2c3c71b3",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->