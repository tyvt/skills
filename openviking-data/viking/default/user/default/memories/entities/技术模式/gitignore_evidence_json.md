# 文档证据链接须可解析：提交 JSON 或改 .gitignore
报告引用的 *.log 被 .gitignore 排除致仓库内悬空链接，证据产物应提交 JSON 或加例外。

## 问题现象
- docs/flood-repair-2026-10-29.md 引用 docs/flood-repair-*.log，但 log 被 .gitignore 排除未入库，clone 后链接不可解析
- 已提交 JSON 证据（build-result/eslint/baseline）可正常访问；本地作者看得到磁盘文件，同事 clone 后看不到

## 解决方案
- 报告引用证据须同提交策略：改结构化 JSON 入库，或在 .gitignore 加例外规则
- 提交前用 `git ls-files <路径>` 逐个验文档相对链接是否可解析
- 纯运行时产物（截图、调试日志）不入库时，报告改写结论+复现命令，不链它
- 证据 JSON 属交付物，运行时截图属产物，与 E2E/预览产物不入库边界不冲突

## 验证与归属
- 验证：会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189 交付记录遗留项「主仓库 *.log 被 .gitignore 排除未入库，md 内链接无法解析；JSON 证据在库」
- 涉及文件：docs/flood-repair-2026-10-29.md、.gitignore
- 所属项目：zhi2-web-admin（防汛）；来源会话：session-9126d917-b8a3-4db0-b250-80e5b6c5d189；代码基线：c35a24a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gitignore_evidence_json",
  "source_extraction_id": "930bccb7cb144d8c9eea94018298599d",
  "version": 1,
  "memory_type": "entities"
}
-->