# Arredondamento independente de setores de pizza excede 100%
Nos gráficos de pizza do projeto EstateManagement-Park, o arredondamento separado de cada setor fazia a soma passar de 100%.

## Problema
- Setores arredondados individualmente a duas casas somavam 100.01% (ex.: 84.49%+9.07%+6.45%).

## 解决方案
- Novo PiePercentUtil em vote/component/piePercentUtil.js usa método do maior saldo para normalizar percentuais.
- Integrado em pieChartCom.js, 19 arquivos JS com drawPie e 18 páginas shtml.

## Arquivos e Origem
- 涉及文件: vote/component/pieChartCom.js, ownerVote/components/votePreview.js, vote/component/votePreview.js, ownerVote_Detail.shtml, vote_ownervoteDetail.shtml, vote_ownervoteDetail.js, commonJs/BaseJs.js, committePer/component/committePerPreview.js.
- Sessão de origem: be9616f8-0da6-4e20-a64e-2ae5ed979631.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_percent_rounding",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->