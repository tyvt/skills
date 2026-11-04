# Seleção única com tabela multi-seleção deixa ID obsoleto
No projeto EstateManagement-Park (园区物管V0), ao usar tabela multi-seleção para opção única, o ID antigo ficava preso em chooseList.

## Problema
- ownerVote/components/dialog.js usava tabela multi-seleção quando max===1; trocar opção cancelava nova opção e deixava ID antigo em chooseList, enviado a idStrArr.

## 解决方案
- Em handleChooseVote, para max===1, chamar clearSelection() antes de marcar item atual.
- No close, resetar chooseList para evitar resíduo.

## Arquivos e Origem
- 涉及文件: ownerVote_Detail.shtml, components/dialog.js, MtplOwnerVoteOptionComServiceImpl.java, ownerVote_Detail.js, committePer_CommittePerCommittePerVoteDetail.js, committePer_CommittePerCommittePerVoteDetail.shtml.
- Sessão de origem: ac2d34d3-11af-46a8-91d6-aec8e65207bb.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_vote_single_select",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->