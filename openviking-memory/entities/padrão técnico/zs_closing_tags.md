# Correção de fechamento de tags Vue sem prefixo zs
No projeto 苏州市房地产监测V3, tags de fechamento `</el-input>` e `</el-button-group>` sem prefixo `zs` causavam erro de compilação Vite, corrigidas para `</zs-input>` e `</zs-button-group>`.

## Descrição
- Erro de compilação Vite por uso de tags EL em vez de componentes zs
- Afetou `contractRevoke/detail.vue` linha 207 e `saleAgencyDialog.vue` linha 38

## Solução
- Alterado `</el-input>` para `</zs-input>` em contractRevoke/detail.vue
- Alterado `</el-button-group>` para `</zs-button-group>` em saleAgencyDialog.vue
- Varredura nos diretórios `commercialHousingSales` e `contract` aprovada, dev server compila normalmente

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/232.md
- Arquivos: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/commercialHousingSales/presale/contractRevoke/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/dialogs/saleAgencyDialog.vue
- Sessão de origem: c7884ca9-0f78-4e4e-9359-8fa478960362; linha de base: none


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "zs_closing_tags",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->