# 开发企业物业管理区域字段可输入修复
修复园区公共收益项目开发企业账户在新建/编辑物业管理区域时字段被禁用的问题。

## 问题原因
- `property/complex/detail.vue` 中 `isDisabled` 原对 B 端账户一律返回禁用

## 修复内容
- 将 `isDisabled` 改为始终返回 `false`
- 开发企业账户在新建和编辑模式下，物业管理区域名称、坐落、行政区域、所属街道、所属社区字段均可输入/选择
- 查看模式仍走独立只读模板 `DetailTemplate`，不受影响

## 验证与归属
- 涉及文件：property/complex/detail.vue、form.js
- 所属项目：园区公共收益；来源会话：64fa742d-a958-4d22-889c-1fe54bbf88b4

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "complex_detail_field_fix",
  "source_extraction_id": "a0a0a0c0aaa74832979fdcae5833192c",
  "version": 1,
  "memory_type": "entities"
}
-->