# Busca segura para dicionário ausente em detalhe de reembolso
Sistema Suzhou Real Estate Monitoring V3: acesso direto a `.dictValue` quando item de dicionário faltava causava erro; adicionada busca segura com aviso.

## Causa raiz
- `refund/detail.vue` em `initDict()` acessava `.dictValue` de resultado `find()` quando `REFUND_NOTICE_VALIDITY` faltava, lendo undefined

## Correção
- Criado `getNoticeValidityDays` em `src/utils/noticeValidity.js` para busca segura
- Em falta de dicionário, `refund/detail.vue` avisa para seleção manual em vez de lançar erro

## Verificação e origem
- Evidência: src=苏州市房地产监测V3-rest/038.md
- Arquivos: refund/detail.vue, noticeValidity.js, detail-template.vue, dict-tag.vue, detailMixins.js, scan-tag-mismatch.js, entre outros
- Projeto: Suzhou Real Estate Monitoring V3; Sessão: 78d15986-f89e-4ac8-b7bf-426222e6b9db; Base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "refund_dict_missing",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->