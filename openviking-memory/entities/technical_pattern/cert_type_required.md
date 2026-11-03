# 证书弹窗certificateType缺必填致无星号
苏州市房地产监测V3 中证书弹窗表单 rules 未包含 certificateType 必填校验，导致无必填星号与提交拦截。

## 问题根因
- 证书弹窗 `certificatesDialog.vue` 的 `rules` 未包含 `certificateType` 必填校验
- 导致表单无必填星号显示且提交时未拦截空值

## 解决方案
- 在 `zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue` 与 `personnelRecord/certificatesDialog.vue` 的 `rules` 中增补 `certificateType: [{ required: true, message: '证书类型不能为空', trigger: ['change'] }]`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/046.md
- 涉及文件：zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue、personnelRecord/certificatesDialog.vue、components/certificatesTable.vue、toB/personnelRecord/components/certificatesDialog.vue、institution/personnel/components/certificatesDialog.vue、company/staffManagement/components/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：7c358850-cada-4f48-ae63-ef09a5db0ee9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_type_required",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 2,
  "memory_type": "entities"
}
-->