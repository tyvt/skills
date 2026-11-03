# 机构类别弹窗去灰标仅留图标与全称
OrgTypeDialog.vue 删除灰色类别标签及样式，选项仅保留图标与标准全称。

## 问题根因
- OrgTypeDialog.vue 选项含灰色类别标签及样式，需精简

## 解决方案
- 删除灰色类别标签及样式
- 选项仅保留图标与标准全称（房地产开发企业、房地产经纪机构、住房租赁企业）
- 点击逻辑、testid 与 e2e 兼容性不受影响

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/303.md
- 涉及文件：views/components/OrgTypeDialog.vue、e2e/register/property-register-entry.spec.js、dist/assets/login-B4MmeKLU.js
- 所属项目：苏州市房地产监测V3；来源会话：df6c1cfe-72e1-40d1-b6f7-ccf3c463f9e6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_type_dialog_tag",
  "source_extraction_id": "44503dfe3d384a8da633982d1828183f",
  "version": 2,
  "memory_type": "entities"
}
-->