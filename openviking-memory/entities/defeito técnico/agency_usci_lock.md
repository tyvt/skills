# Bloqueio de USCI e Revisão de Campos Centrais em Alteração de Agência
O sistema de monitoramento imobiliário de Suzhou V3 (苏州市房地产监测V3) não trava o USCI nem exige revisão nos campos centrais ao alterar agências.

## Problema
- Campos centrais (nome da agência e outros 6) devem submeter jjjgbgxq para revisão e permanecer na página de visualização
- Campos não centrais entram em vigor ao salvar
- agencyChangeCoreFields.js identifica campos centrais e getForm() força a regravação do USCI original para impedir adulteração

## Verificação
- Evidência: src=苏州市房地产监测V3/060.md
- Arquivos: AgencyBasicInfoDetail.vue; companyRecordAgency/detail.vue; ruoyi.js; company-menu-config.js; companyRecordAgency/change/detail.vue; toB/agencyChange/detail.vue; toB/agencyRecord/detail.vue; toB/change/detail.vue
- Sessão: 6c91b23f-bba3-49fb-bd85-76e4879db720; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "agency_usci_lock",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->