# Componente reutilizado deve ser importado e registrado
Em templates Vue2/Options API, usar tag customizada PascalCase/camelCase sem importar e registrar em `components` faz o Vue falhar ao resolver o componente (erro "Failed to resolve component" ou elemento customizado desconhecido).

## Causa raiz
- Reutilizar componente de outro diretório (ex.: propertyContractTable.vue em company) exige import explícito e registro no SFC atual.
- Sem registro o Vue não resolve o componente, independente de ser custom element nativo.
- Usar componente existente (ex.: DetailTemplate) no modo de visualização sem registrar também gera elemento customizado desconhecido.

## Solução
- Importar explicitamente o caminho do componente no SFC atual e registrá-lo na opção `components` antes de usá-lo.
- Não dependa de registro global nem assuma ser custom element nativo.

## Verificação e proveniência
- Caso 1: sessão 1dad72c5 — /toB/companyInfo em companyRecord/detail.vue usava propertyContractTable sem registro, falhando resolução. Arquivos: zhi2-web-admin/src/views/toB/companyRecord/detail.vue; zhi2-web-admin/src/views/company/companyManagement/components/propertyContractTable.vue. Projeto: 2-0; sessão: 1dad72c5-73f0-43c2-8c13-cda8490370ba.
- Caso 2: sessão cdb8c8d2 — bankTable.vue (modo visualização) usava DetailTemplate sem registro; apenas o mixin subTableMixins não contém o componente. Correção: import e registro explícitos de DetailTemplate, também em companyManagement/components/bankTable.vue. Arquivos: src/views/company/companyRegister/components/bankTable.vue; src/views/company/companyManagement/components/bankTable.vue; src/mixins/subTableMixins.js; src/views/company/companyManagement/components/qualificationDialog.vue; src/main.js; src/views/maintenance/components/AllocationDialog.vue; src/views/company/companyRegister/dialog.vue; src/mixins/dialogMixins.js. Sessão: cdb8c8d2-612f-4ad7-a826-8e4470159f9f.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "component_reuse_register",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 2,
  "memory_type": "entities"
}
-->