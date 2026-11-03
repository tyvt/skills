# Atributo required excedente em formulário sobrescreve dica em inglês
No projeto 园区公共收益 (zhi2-web-admin), o atributo `required` do `el-form-item` injeta regra sem `message`; o Element UI usa dica padrão em inglês, cobrindo a dica em chinês de `rules`.

## Causa raiz
- O `el-form-item` com `required` injeta regra de obrigatoriedade sem `message`
- O Element UI aplica dica padrão em inglês, cobrindo a `message` em chinês de `rules`

## Solução
- Remover o atributo `required` excedente de `operatorAddDialog.vue` e `operatorDialog.vue`
- Manter a obrigatoriedade e a `message` em chinês dentro de `rules`

## Arquivos envolvidos
- `operatorAddDialog.vue` e `operatorDialog.vue` (em src/views/company/userManagement/operator)

## Verificação e origem
- Evidência: extracted source=cursor session=f96d8adf-ae69-47ed-80a8-22928637bcaa
- Projeto: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "el_form_required",
  "source_extraction_id": "421380447a664b42a4a5d20500dc7f5e",
  "version": 1,
  "memory_type": "entities"
}
-->