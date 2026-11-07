# 仓库内 Skill 需显式接入而非依赖自动发现
仓库内的 AI skill 不会被工具自动发现，必须在 AGENTS.md 用相对路径逐个点名必读文件，且不得宣称已全局安装。

## 背景
- 项目把防汛开发规范做成仓库内 skill（如 zhi2-web-admin/.agents/skills/flood-page-guard/SKILL.md），仅放置文件不会让 AI 工具自动加载
- 不同 AI 工具（Cursor / DSH / Claude Code 等）发现本地 skill 机制不同：有的只扫全局目录、有的认仓库内 .agents/skills、有的完全不读

## 正确做法
- 在 AGENTS.md 用相对路径逐个点名必读文件，措辞用「进入前端前必须阅读 X」而非「建议参考」
- 交付说明只说「规则已写入仓库 AGENTS.md / skill 已入库」，严禁说「已全局安装」「所有同事已启用」
- 新增 skill 或文档后同步更新 AGENTS.md 必读清单，否则等于没接入
- 文件名统一用 AGENTS.md，不再维护内容冲突的第二份 agent.md

## 必读文件清单示例
- .agents/skills/flood-page-guard/SKILL.md
- docs/flood/README.md、framework-contract.md、review-2026-10-28.md、common-errors.md
- 新人向 docs/flood/mixins-guide.md、components-guide.md、page-recipes.md

## 验证与归属
- 来源会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189（基线 c35a24a）
- 父仓库 AGENTS.md 写明「本仓库通过规则显式要求读取本地 skill，不假设所有 AI 工具都会自动发现它。不得宣称已全局安装或所有同事环境已启用」

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "local_skill_wiring",
  "source_extraction_id": "f34d1805f9ca4170930502ee19b04a3b",
  "version": 1,
  "memory_type": "entities"
}
-->