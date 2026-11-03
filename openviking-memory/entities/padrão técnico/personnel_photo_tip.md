# Remoção de dica de foto redundante em detalhe de pessoal
No projeto zhi2-web-admin, eliminou-se parágrafo manual de dica de foto em AgencyPersonnelDetail.vue.

## Alterações
- Remover `<p class="photo-tip">` manual em `AgencyPersonnelDetail.vue`
- Manter dica `el-upload__tip` do componente `ImageUpload`
- Estilo preserva apenas `.appendix-tip`; validação `rules.photo` inalterada

## Arquivos
- src/components/ImageUpload/index.vue
- src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- src/mixins/form.js
- src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue

## Verificação
- Sessão: a49c2c35-e07c-4746-8286-a944b2d7a666

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "personnel_photo_tip",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->