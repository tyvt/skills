
# Diálogos de certificado sem validação obrigatória de tipo
No projeto 苏州市房地产监测V3, as regras de formulário dos diálogos de certificado não incluíam validação obrigatória de `certificateType`, causando ausência de asterisco e não bloqueio de envio.

## 问题根因
- As regras (`rules`) do `certificatesDialog.vue` não incluíam validação obrigatória de `certificateType`
- O formulário não exibia asterisco de obrigatório e não bloqueava valores vazios ao enviar

## 解决方案
- Adicionar `certificateType: [{ required: true, message: '证书类型不能为空', trigger: ['change'] }]` aos `rules` de `zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue` e `personnelRecord/certificatesDialog.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/246.md
- 涉及文件: zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue, personnelRecord/certificatesDialog.vue, components/certificatesTable.vue, toB/personnelRecord/components/certificatesDialog.vue, institution/personnel/components/certificatesDialog.vue, company/staffManagement/components/detail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 7c358850-cada-4f48-ae63-ef09a5db0ee9; Base de código: none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_type_required",
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 3,
  "memory_type": "entities"
}
-->