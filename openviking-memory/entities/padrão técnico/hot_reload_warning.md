
# Aviso de propriedade excluída por hot reload sem atualizar template
No projeto 苏州市房地产监测V3, `detail.vue` referenciava a computed property `cancelAttachmentView` já excluída; o hot update só atualizou o script, não o template, gerando aviso.

## Causa raiz
- O template de `detail.vue` citava a computed property `cancelAttachmentView` já fundida/excluída
- O hot reload (热更新) só refrescou o script, não o template, disparando o aviso

## Estado e solução
- O código em disco já usa corretamente `cancelInfoView` para renderizar horário, motivo e materiais de cancelamento
- Nenhuma alteração necessária

## Verificação e afiliação
- Evidência: extracted source=cursor session=5848dd5d-26a2-4051-b9fd-06eacdc8eee0
- Arquivos: company/companyCancel/detail.vue, detail-template/detail-template.vue, companyManagement/components/AgencyBasicInfoForm.vue, presale/permitCancel/detail.vue, institution/agencyBranch/components/AgencyBranchDetail.vue, mixins/detailMixins.js, detail.vue
- Projeto: 苏州市房地产监测V3; Sessão: 5848dd5d-26a2-4051-b9fd-06eacdc8eee0; Baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "hot_reload_warning",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->