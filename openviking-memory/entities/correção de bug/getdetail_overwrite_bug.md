# getDetail sobrescreve form e perde tipo de conta
Bug no Suzhou Monitoramento Imobiliário V3 onde getDetail() em modo view sobrescrevia o formulário e perdia o tipo de conta de abertura.

## Causa raiz
- `getDetail()` em modo view cobria todo o `form`; quando a interface não retornava `opensalesType`, o tipo de conta era perdido.
- `syncOpensalesTypeFromRoute()` originalmente só funcionava no modo add.

## Correção
- Adicionar computed `opensalesType` com fallback para resolução de rota.
- Estender a função sync para escrever quando o form não tem valor, completando após getDetail.
- Template usa o computed para controlar campos e Tab.

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/106.md
- Projeto: Suzhou Monitoramento Imobiliário V3; sessão: 5c1b8a24-76c6-4187-b758-d05c9e6ba67e; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Correção de bug",
  "name": "getdetail_overwrite_bug",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->