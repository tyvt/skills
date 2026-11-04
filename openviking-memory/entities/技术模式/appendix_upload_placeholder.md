# Placeholder quebra anexos em imagem única
No projeto 苏州市房地产监测V3, o `enrichRegisterUploadedList` em `appendix.js` usava `usedConfigIds` como placeholder quando faltava `appendixConfigId`, dividindo anexos multiarquivo em imagem única.

## 问题根因
- `enrichRegisterUploadedList` em `appendix.js` usava `usedConfigIds` como placeholder sem `appendixConfigId`
- Resultava em exibição de anexos multiarquivo como imagem única

## 解决方案
- Substituído por `flattenAppendixPackagesToUploadedList` para achatamento por configuração e remoção do placeholder
- Integrado com `listInstitutionAppendixPackage` para exibir múltiplas imagens

## Verificação
- 验证证据: src=苏州市房地产监测V3-rest/051.md
- 涉及文件: 前端技术信息.md, Step3Appendix.vue, InstitutionUploadItem.vue, company/institutionRegister.js, institution/institutionRegister.js, InstitutionRegisterPage.vue, register/components/Step3Appendix.vue, e2e/fixtures/appendix-package-helpers.js
- 所属项目: 苏州市房地产监测V3; sessão: b5012ad6-36f9-46ad-a9b1-913b5fdf7d66; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_upload_placeholder",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->