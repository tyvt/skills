# Linha narrativa da página de pré-venda com justify e input largura total
No projeto Suzhou Real Estate Monitoring V3, a linha narrativa usava text-align: justify e inputs ocupavam largura total, causando desalinhamento.

## 问题根因
- text-align: justify espalhava o texto da linha narrativa.
- Inputs numéricos ocupavam a linha inteira por padrão.

## 解决方案
- Removido text-align: justify; a linha narrativa usa flex com flex-wrap.
- Texto envolveu-se em <span class="narrative-text">.
- Inputs com largura fixa: número 88px, área 108px, nome de lugar 280px.

## Arquivos e verificação
- 涉及文件: PermitPlanPanel.vue, PresalePlanFillForm.vue, plan/detail.vue, detail.vue, Headline/index.vue, presale-permit-helpers.js, PermitAppendixPanel.vue.
- 验证证据: src=苏州市房地产监测V3-rest/057.md; sessão 3b1ff38c-e27a-4867-a215-6627c1d4380c.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_narrative_layout",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->