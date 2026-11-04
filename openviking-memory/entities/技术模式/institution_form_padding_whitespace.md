# Espaço em Branco no Rodapé por Padding e Margin Acumulados
No projeto Suzhou Real Estate Monitoring V3, o formulário de instituição de locação apresentava ~136px de espaço em branco por acúmulo de padding e margin.

## 问题根因
- Estilo global `.institution-register-form` com `padding-bottom: 48px`
- Estilo `.agreement-wrap` da locação com `margin-bottom: 88px` somados geravam ~136px vazios

## 解决方案
- `InstitutionRegisterSingleForm.vue` adiciona dinamicamente a classe `has-agreement`
- Instituição de locação (com acordo) recebe `padding-bottom: 0`, mantendo só 88px do acordo
- Instituição de corretagem (sem acordo) mantém 48px para desviar da barra fixa

## Verificação e Atribuição
- 验证证据: src=苏州市房地产监测V3-rest/152.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: CompanyRegisterSingleForm.vue, InstitutionRegisterSingleForm.vue, AnnexUpload/index.vue, RegisterUploadItem.vue, AppendixPackageSection/index.vue, Step3Appendix.vue, AppendixPictureUpload.vue, AppendixRequirementGrid.vue
- Sessão: 08c8c33f-395a-42c3-ab4b-468a9d18c04b; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "institution_form_padding_whitespace",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->