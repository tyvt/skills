# fee_declare_submit_edit_only
No feeDeclare2/detail.vue, o botão de submissão deve ser controlado por formMode, não por lógica antiga.

## Contexto
- O arquivo detail.vue removou forceShowSubmit e adicionou :showSubmit="formMode != 'edit'" para esconder submissão em modo edição.
- OperationBtnGroup restaura lógica original: mostra submissão apenas em modo visualização e bizState == 0.

## Arquivos e Origem
- Arquivos: property/feeDeclare2/detail.vue, index.vue, components/OperationBtnGroup/index.vue, mixins/detailMixins.js, form.js, declare/components/detail.vue, main.js, ZsSubmit/index.vue.
- Projeto: 苏住房G; evidência: src=苏住房G/052.md; sessão: 9ce5c9a2-4e7d-41cf-bb2c-201ef6f68770.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "fee_declare_submit_edit_only",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->