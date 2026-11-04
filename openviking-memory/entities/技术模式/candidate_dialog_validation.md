# Dispensa de obrigatoriedade de foto e data em diálogo de candidato
Padrão de remover validação required de foto e data de nomeação em cenários de registro.

## 描述
- Em `autonomy/record/components/CandidateDialog.vue` para registro de 物管会/业委会, `photo` e `appointmentStartDate` tinham `required: true`.
- Regras de validação removidas, não são mais obrigatórios.
- Aplica-se a cenários de adição/edição de备案 (registro).

## Arquivos Envolvidos
- `CandidateDialog.vue`, `MemberInformationDialog.vue`, `MemberInformationTable.vue`
- `autonomy/record/components/detail.vue`, `autonomy/change/industry/detail.vue`
- `autonomy/change/property/detail.vue`, `directDetail.vue`, `enums.js`

## Verificação
- 来源: cursor session=14cca6c3-1374-4ef4-99d2-752064a64d18

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_dialog_validation",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->