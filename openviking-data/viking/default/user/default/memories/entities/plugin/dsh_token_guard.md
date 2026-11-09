# dsh-token-guard
DSH 本地插件，在工具执行期对大结果做持续裁剪与落盘，弥补 spill-policy 跳过 read 的缺口。

## 功能
- 挂钩 tools/post-execute，对 read 等结果超阈值（默认 4000 token）做头尾保留+中间裁剪。
- 超限内容自动 spill 到临时文件并回填可回读路径，失败保留原文。

## 部署
- 源码位于 D:/repository/skills/dsh/token-guard，~/.dsh/token-guard 为符号链接。
- 零依赖（不 import @deepseek-ai/*），经 pnpm file: 依赖接入 web profile，2026-11-09 验证生效。

## 关系
- 与 dsh-spill-policy 互补，专注于 read 大结果治理。


<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_token_guard",
  "source_extraction_id": "015982f6acda4ee1b43529e0a9b4cd38",
  "version": 1,
  "memory_type": "entities"
}
-->