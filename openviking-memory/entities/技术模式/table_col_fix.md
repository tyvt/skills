# 表格状态操作列错位修复
门户首页 index-new 表格状态/操作列均分且 fixed 导致内容偏左、表头错位，需固定列宽并移除 fixed 修复。

## Description
- 现象：状态、操作列均分导致内容靠左不符预期，且操作列 fixed="right" 导致表头拆分错位。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue；zhi2-web-admin/package.json
- 来源会话ID：b4f85522-74e4-4fb9-9d6a-789546c1fbdc；代码基线：none；所属项目：门户

## Solution
- 状态列固定 96px、操作列固定 72px，并移除操作列 fixed="right"。
- 配置 head-align="center" 与 CSS text-align: center 使内容居中。
- 列宽更新后调用 doLayout() 防止表格重算错位。

## Verification
- 验证证据：src=门户/016.md 记录该修复方案。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_col_fix",
  "source_extraction_id": "5b1f7a25d9f64601b3f9fb37f485a33b",
  "version": 1,
  "memory_type": "entities"
}
-->