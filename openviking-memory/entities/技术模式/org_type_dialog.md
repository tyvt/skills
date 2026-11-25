---
audit_status: valid
last_checked: 2026-11-25T17:10:42+08:00
verdict_note: 抽查2026-11-25-实机 OrgTypeDialog.vue-17-34 每选项仅图标+标准全称,无灰色类别标签,testid保留,主张成立
---
# 注册机构类别名称规范调整
苏州市房地产监测V3 中 OrgTypeDialog.vue 已删除前面的灰色类别标签及样式，每个选项仅保留图标 + 标准全称。

## 改动内容
- 删除 OrgTypeDialog.vue 中前面的灰色类别标签及其样式
- 每个选项仅保留图标 + 标准全称：房地产开发企业、房地产经纪机构、住房租赁企业
- 点击逻辑、testid、e2e 兼容性均不受影响

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/components/OrgTypeDialog.vue、zhi2-web-admin/e2e/register/property-register-entry.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：df6c1cfe-72e1-40d1-b6f7-ccf3c463f9e6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_type_dialog",
  "source_extraction_id": "1b1aa05893f34d1eb5a371aa9023b5b0",
  "version": 1,
  "memory_type": "entities"
}
-->