# 机构人员资格证书子表编辑按钮修复
苏州市房地产监测V3 中机构人员资格证书列表（`CertificateList.vue` 重命名为 `AgencyPersonnelCertificateTable.vue`）补全新增/删除按钮，原组件为纯只读子表。

## 问题根因
- 旧版 `CertificateList` 是纯只读子表，仅有表格无新增/删除，而 `EducationTable` 早已支持编辑，导致「继续教育有按钮、资格证书没有」
- 原 `disabled` 判断用 `isFormDisabled || isFiledReadonly` 语义不清，且资格证书组件历史上用 `:list` 而非 `v-model`，Vite 易加载旧模块表现异常

## 修改内容
- 新增 `canEditSubTable` 计算属性：`isFiledReadonly` 返回 false，否则按 `formMode` 为 `add`/`edit` 返回 true
- 资格证书改用 `operable` 正向逻辑：`formMode=add/edit` 且未备案时 `operable=true` 显示按钮，`formMode=view` 或已备案隐藏
- 组件重命名：`CertificateList.vue` → `AgencyPersonnelCertificateTable.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`AgencyPersonnelDetail.vue`、`CertificateList.vue`、`AgencyPersonnelCertificateTable.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：002a1156-0b47-406e-b7b0-9fab86c962f2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_cert_table",
  "source_extraction_id": "b4d7c66a115e439a926be64696a6d02d",
  "version": 1,
  "memory_type": "entities"
}
-->