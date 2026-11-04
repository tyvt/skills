# Cor de opinião em decisão e slot em eleição evitam conflito
Lista de decisão vincula cores de opinião (verde concorda, vermelho discorda, laranja abstém) e página de eleição usa slot `#label` para evitar conflito de atributo `label`.

## Regra de Cores
- Texto de opinião em registro de decisão: concordar verde, discordar vermelho, abster laranja.
- Em `pages_vote/elect/DecisionResult.vue` registro de eleição mostra abstenção em laranja.

## 解决方案 de Conflito
- Usar `CardCell` com slot `#label` para nome do eleitor, contornando conflito do atributo `label` em mini-programa.
- 涉及文件: DecisionResult.vue, CardList.vue, DecisionRecord.vue, api/autonomy.js, CardCell.vue, CellFulline.vue, page.scss.

## Verificação
- 验证证据: src=苏住房C/031.md; sessão 656e6a75-7f8b-4804-98e6-133f13d94700; base none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "opinion_color_slot",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->