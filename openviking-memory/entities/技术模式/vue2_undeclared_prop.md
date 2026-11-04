# Botão sem resposta por propriedade não declarada em data() no Vue 2
No projeto 淮安物管, um botão de alternância não atualizava a interface porque a propriedade não era reativa no Vue 2.

## 问题根因
- `pubRevenueContract/detail.vue` não declarava `showManualInput` em `data()`.
- No Vue 2, propriedades não declaradas não são reativas, então o botão não atualizava a view.

## Correção
- Adicionado `showManualInput: false` em `data()` de `pubRevenueContract/detail.vue`.
- Referência seguida de `pubExpenditureContract/detail.vue`.

## Arquivos envolvidos
- `benefit/pubRevenueContract/detail.vue`
- `benefit/pubExpenditureContract/detail.vue`

## Verificação
- Sessão cursor: 5dde2ae1-89fa-428b-838d-b1e71ffd7a23
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue2_undeclared_prop",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->