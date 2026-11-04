- 在 Cursor 全局安装 ECC，安装位置为 `C:\Users\Administrator\.cursor\`，采用 minimal profile（写入 495 个文件，通过 `--no-hooks` 禁用 Hooks）。
- 安装内容包括：122 个 `.mdc` 规则文件（含 ECC 通用/语言规范）、68 个 `ecc-*.md` agent 文件（如 `ecc-planner`、`ecc-tdd-guide`）、100 个 `SKILL.md` 技能文件（如 `tdd-workflow`、`verification-loop`）。
- 环境校验通过：Node.js v22.23.2 与 Git 2.51.2 版本检查通过，`doctor --target cursor` 输出 OK 无问题。
- 保留原有 MCP 服务器 `tencentdb-memory` 与 `code-review-graph`；ECC 合并时新增了 MCP 服务器（名称以 `chro` 开头）。
- 安装状态记录在 `C:\Users\Administrator\.cursor\ecc-install-state.json`。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "cursor_ecc_setup",
  "source_extraction_id": "3b2044a1cc1347e4a5970d5a00184d6e",
  "version": 2,
  "memory_type": "preferences"
}
-->