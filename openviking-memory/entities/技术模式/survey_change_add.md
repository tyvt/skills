# Construção de payload add de mudança de levantamento via função constante
`surveyChangeConstants.js` adiciona `buildSurveyChangeAddPayload` para mapear campos de formulário ao parâmetro de interface v1.9.

## Comportamento
- Campos de validação forte (`projectName`, `region`, etc.) são obrigatórios; opcionais enviados se presentes
- `detail.vue` `getForm()` chama a função em cenário de novo; edição mantém apenas `{ id, changeReason }`

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3/261.md
- 涉及文件: surveyChangeConstants.js, presale/surveyChange/detail.vue, documento de interface, e2e/fixtures/presale-survey-change-helpers.js, permitCancel/detail.vue, entrustSale/detail.vue, permitExtend/detail.vue, e2e/presale/presale-survey-change-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; sessão: cd5819ca-3f99-45cb-b786-bfcca981ec48

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_add",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->