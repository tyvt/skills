
# 系统菜单树形箭头与名称对齐修复
苏州市房地产监测V3 的 zhi2-web-admin 修复了系统菜单树形列表中展开箭头与菜单名错位的问题。

## 问题根因
- 曾为修重叠对全部 `.cell > span` 设 `display: block`，导致树形第一列展开箭头与菜单名被挤到不同行

## 修复内容
- 长文本省略仅作用于第 3～5 列（权限标识、路由、组件路径），使用 `inline-block`
- 菜单名称列单独处理：排除 `.el-table__indent` / `.el-table__placeholder`，文字与 `.el-table__expand-icon` 同行、`vertical-align: middle`

## 涉及文件
- `zhi2-web-admin/src/views/system/menu/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：0b933a14-fbd5-4c86-8301-29f6b89bb1c4；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_tree_styling_fix",
  "source_extraction_id": "51f509fc1cfc4814bd2e840f740c0807",
  "version": 1,
  "memory_type": "entities"
}
-->