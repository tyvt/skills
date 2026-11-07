# 证书对话框缺少类型必填验证
在项目苏州市房地产监测V3中，证书对话框的表单规则未包含`certificateType`的必填验证，导致缺少必填星号且未阻止提交。

## 问题根因
- `certificatesDialog.vue`的`rules`未包含`certificateType`的必填验证
- 表单未显示必填星号，且在提交时未阻止空值

## 解决方案
- 在`zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue`和`personnelRecord/certificatesDialog.vue`的`rules`中添加`certificateType: [{ required: true, message: '证书类型不能为空', trigger: ['change'] }]`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：7c358850-cada-4f48-ae63-ef09a5db0ee9
- 验证证据: src=苏州市房地产监测V3/246.md
- 涉及文件: zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue, personnelRecord/certificatesDialog.vue, components/certificatesTable.vue, toB/personnelRecord/components/certificatesDialog.vue, institution/personnel/components/certificatesDialog.vue, company/staffManagement/components/detail.vue
- 所属项目: 苏州市房地产监测V3; Session: 7c358850-cada-4f48-ae63-ef09a5db0ee9; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_type_required",
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 3,
  "memory_type": "entities"
}
-->