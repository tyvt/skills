# Gerador de Documento de Requisitos Vue (vue_docgen)
Ferramenta/skill que gera documento de especificação de requisitos a partir de arquivos Vue do projeto 园区公共收益 (zhi2-web-admin).

## 描述
- Segue o formato V1.2 do documento de requisitos.
- Analisa 530 arquivos `index.vue`/`detail.vue` para extrair condições de consulta, campos de lista, campos de formulário e identificadores de permissão `xx:yy:zz`.
- A descrição de negócio herda da versão antiga; itens não cobertos são marcados como 【待补充】 (a complementar).
- O escopo cobre todos os módulos de menu do código, excluindo diretórios de componentes que não são páginas.

## Arquivos Relacionados
- Skill WorkBuddy: tencent-local-office-edit/doc.md
- Scripts: .workbuddy/docgen/extract.py, parse_ref.py, digest.py, gen_md.py
- Arquivos temporários: .workbuddy/tmp/args_outline.json, args_struct.json, docgen/args_test.json
- 验证证据: session=workbuddy 76daa5d8-aa79-4e5b-8bb5-6dd86ab1a1d3

<!-- MEMORY_FIELDS
{
  "category": "programa",
  "name": "vue_docgen",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "entities"
}
-->