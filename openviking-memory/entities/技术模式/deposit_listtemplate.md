# ListTemplate + listMixins em páginas de depósito
Páginas de lista do módulo de supervisão de depósito foram refatoradas para usar ListTemplate + listMixins, padronizando a estrutura.

## Contexto
- 4 páginas convertidas: other_record, notice, refund, additional e adjustmentofAccounts
- 所属项目: zhi2-web-admin (produto 2.0)

## Pontos-chave
- Configurado moduleName: prefund e businessName: paymentNotice nas páginas
- Preservado o roteamento por paymentType e o getList customizado
- Mantido o botão de exportação

## Arquivos
- Views: supervision/deposit/{other_record,notice,refund,additional,adjustmentofAccounts}/index.vue
- APIs: api/finance/{notice,refund,additional}.js

## Verificação
- Sessão cursor: 5db9c51e-2b5e-440b-9222-d5a6f6452a33

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_listtemplate",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "entities"
}
-->