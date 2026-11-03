# Garagem subterrânea não verifica campo account em estado não aberto
Em empj_EstateDetail.js, a lógica de garagem subterrânea não conferia account, divergindo da lógica superficial.

## Problema
- changeBuild agrupa floor<0 em mapUnit['地下车库']; página "未开户" usa image/no.png com classe gray.
- Garagem subterrânea julgada apenas por purpose e isInitpayment, sem checar account, inconsistente com parte superior.

## Arquivos e Origem
- Arquivos: empj_EstateDetail.js, empj_EstateDetail.shtml, empj_EstateDetail.css, BuildingMapper.xml.
- Sessão de origem: 47a15a5b-96fc-44bf-a48d-4d88ec7e305c.

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "underground_garage_account",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->