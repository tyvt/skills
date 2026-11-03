
# Remoção de campo idType em telas de detalhe de pessoal
Removido item de edição «证件类型», exibição `basicInfoView` e validação obrigatória `idType` em `AgencyPersonnelDetail.vue` e `LeasePersonnelDetail.vue`; parar de carregar dicionário `document_type`.

## Detalhes
- Payload de salvamento ainda envia `idType:'01'` para compatibilidade com backend
- Afeta também testes e2e: agency-personnel-real-api-flow.spec.js

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/266.md
- Arquivos: AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- Projeto: 苏州市房地产监测V3; sessão: 5d103f6d-b346-4d26-8144-3e36ee398668; base: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_idtype_field",
  "source_extraction_id": "8c43efc6d6ef4f45aa6e706fcd941499",
  "version": 1,
  "memory_type": "entities"
}
-->