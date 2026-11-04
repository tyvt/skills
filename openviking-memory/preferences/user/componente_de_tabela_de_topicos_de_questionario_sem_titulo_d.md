- Criado componente `TopicInfoTable.vue` (referenciado em `detail.vue` que antes não o importava); sem grupo exibe achatado sem título "默认不分组", com grupo exibe nome do grupo, container `padding:0 24px 24px`
- `TopicDialog.vue` envolve informações básicas em bloco `Headline`, estilo consistente com opções de tópico (`18px 24px`)
- 涉及文件: survey/template/detail.vue, TopicTable.vue, TopicDialog.vue, OptionTable.vue, GroupTable.vue, evaluation/surveyRelease/release/components/SurveyTopicInfoTable.vue, subTableMixins.js, Headline/index.vue
- Verificação: sessão de origem 946e7e74-221e-42c1-acb7-c1bf634305ac

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Componente de tabela de tópicos de questionário sem título de grupo",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "preferences"
}
-->