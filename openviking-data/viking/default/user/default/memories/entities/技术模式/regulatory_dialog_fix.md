
# 开户申请管理主体名称弹窗街道社区编码显示问题（苏住房G）
苏住房G 项目 benefit/pubRegulatoryAccount/detail.vue 中开户申请→管理主体名称弹窗（showCompanyDialog）街道、社区列显示编码而非名称。

## 问题原因
- showCompanyDialog 中街道、社区列直接绑定 subdistrict / community 编码字段，未走名称格式化，导致显示如 320505002 这类编码。
- 同文件 showPropertyProjectDialog 弹窗在 2.6.2 已通过 bug42256 修复，加了 subdistrictFormatter / communityFormatter，但管理主体名称弹窗漏改。

## 修复建议
- 管理主体名称弹窗街道、社区列应参照 showPropertyProjectDialog 增加 formatter: this.subdistrictFormatter / this.communityFormatter。

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue
- zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/components/PubManagementTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：63c29103-0eb8-4867-986d-5ca6a0993ecb；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_dialog_fix",
  "source_extraction_id": "35152ab6f89644c1b5de7b32d547e962",
  "version": 1,
  "memory_type": "entities"
}
-->