# Verificação de super admin da home com todas as seções
Correção: isHomeSuperAdmin deve exigir autorização total das três seções de negócio do portal.

## Problema
- isHomeSuperAdmin original só usava store.isSuperAdmin, ignorando usuários com todas as permissões de seções
- Usuários com todas as permissões de blocos de negócio não eram reconhecidos como super admin

## Solução
- homeLayout.js: nova função hasAllBizSectionPerms(codes) valida commodityHouseTrade/secondHandHouseTrade/housingRental
- homeDataMixin.js: computed isHomeSuperAdmin unifica layoutVariant, showHomeNavMenu e mergeBusinessFlows

## Arquivos
- src/views/home/config/homeLayout.js e src/views/home/mixins/homeDataMixin.js (lógica de permissão)
- src/utils/terminalUser.js, src/api/portal/menu.js, src/store/getters.js (apoio de permissões)
- tests/e2e/fixtures/portalHomeMock.ts, HomeLayoutAdmin.vue, src/views/home/index.vue (integração e testes)

## Verificação
- Evidência: src=门户/020.md; sessão: 7a743bfd-c7dc-4a0b-b359-5f6b0f208c13

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "home_super_admin_perms",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->