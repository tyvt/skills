# Componentes zs Não Registrados Causam Aviso Vue
Componentes `<zs-button-group>` e `<zs-attachment>` não registrados dispararam avisos de elemento customizado desconhecido no projeto Suzhou Real Estate Monitoring V3.

## Descrição
- `<zs-button-group>` e `<zs-attachment>` não registrados causavam avisos Vue
- Projeto: Suzhou Real Estate Monitoring V3 (zhi2-web-admin)

## Causa Raiz
- Uso global de `<zs-button-group>` em 16 arquivos (ex.: chooseHouseDialog.vue) causava avisos
- `<zs-attachment>` em contract/index.vue não tinha registro
- Em detail pages de commercialHousingSales/presale (versionManagement/detail.vue, template/detail.vue, contractRevoke/detail.vue) `<zs-attachment>` e `isAttachmentDialogVisible` não registrados disparavam `[Vue warn]: Unknown custom element`

## Correção
- Substituiu-se `<zs-button-group>` por `<el-button-group>` em 16 arquivos
- Em contract/index.vue, trocou-se `<zs-attachment>` por `attachmentDraw` importado localmente com props `:id` e `:bus`
- Removeu-se código legado das detail pages de presale que usavam `<zs-attachment>` para eliminar aviso

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/003.md e src=苏州市房地产监测V3-rest/087.md
- Sessões: da4d6410-f867-47a9-acf7-3468a014ca81 e bf4f4ff9-8f97-43fa-9336-a48464455213
- Arquivos: companyAdmin/detail.vue, contract/index.vue, commercialHousingSales/presale/versionManagement/detail.vue, template/detail.vue, contractRevoke/detail.vue, scripts/migrate-detail-framework.mjs, supervision/progress/node/detail.vue, mixins/detailMixins.js, package.json, buildinginfo/detail.vue, e2e/fixtures/contract-version-helpers.js

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "unregistered_zs_components",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 2,
  "memory_type": "entities"
}
-->