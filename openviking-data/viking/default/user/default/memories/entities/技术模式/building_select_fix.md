
# 楼盘项目表格勾选状态限制修复（苏住房G）
苏住房G 项目楼盘管理（building/project）修复已备案项目无法勾选导致「设置对外权限」「导出小区房屋」按钮置灰的问题。

## 问题原因
- 表格勾选沿用通用逻辑，只有草稿态（`bizState == '0'`）才能勾选；「恋雪小花园」已备案，复选框被禁用，导致批量按钮一直灰着点不了

## 修复内容
- 本页允许勾选任意状态的项目
- 批量删除仍只作用于草稿，避免误删已备案数据
- 刷新页面后，勾选列表中的数据，这两个按钮即可使用

## 涉及文件
- zhi2-web-admin/src/views/building/project/index.vue
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js

## 验证与归属
- 所属项目：苏住房G；来源会话：e972de96-ea86-4046-8a3e-d5e86948f61f；验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_select_fix",
  "source_extraction_id": "759fdfdefd9e43239155ff8624012ede",
  "version": 1,
  "memory_type": "entities"
}
-->