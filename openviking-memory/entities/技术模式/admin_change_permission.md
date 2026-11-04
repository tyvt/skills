# 因权限失败而隐藏的修改按钮
管理员详情页面中的“修改”按钮由于 companyAdmin/detail.vue 文件中的权限验证失败而未显示。

## 问题根因
- `src/views/company/companyAdmin/detail.vue` 中的 `showChangeButton` 要求权限标识符 `company:companyAdminChange:change`
- 当 `bizState` 和 `organType` 满足条件但按钮不显示时，表明权限验证失败
- 需要在 Console 中检查权限不足的警告

## 解决方案
- 确保权限 `company:companyAdminChange:change` 已被授予或调整验证逻辑
- 在 Console 中查看权限不足的警告以确认原因

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: `src/views/company/companyAdmin/detail.vue`, `src/utils/permission.js`
- 所属项目: 苏州市房地产监测V3
- 源会话: 01a1630b-15cb-70c5-a400-76420e9f34c7
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_change_permission",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->