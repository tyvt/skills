# Erro de join em array de objetos em VotingItemsDialog
No modo de visualização de VotingItemsDialog.vue, o contentInfo aplicava join(',') em ownerFileList (array de objetos) gerando [object Object] e anexos anómalos.

## Causa raiz
- O contentInfo em VotingItemsDialog.vue usava join(',') sobre ownerFileList, um array de objetos, produzindo a string "[object Object]".

## Solução
- Alterado para passar o array de objetos diretamente, deixando o getAttachmentFiles do DetailTemplate analisar e exibir.

## Arquivos envolvidos
- autonomy/option/components/VotingItemsDialog.vue
- autonomy/candidateCollect/components/CandidateDialog.vue
- components/detail-template/detail-template.vue
- company/staffManagement/components/certificatesDialog.vue

## Verificação e origem
- Evidência: sessão cursor 462b8a83-d68c-46cb-bae9-7553f60772a3
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "voting_object_join",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->