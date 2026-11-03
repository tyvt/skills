# Botão de operação sem resposta por nome de evento save escrito errado
No projeto 淮安物管 (zhi2-web-admin), detail.vue de branchInformation usava @save1234qweR="submitForm" em vez do evento padrão save.

## Problema
- Componente operation-btn-group só emite evento save
- Evento não padrão @save1234qweR não era capturado, botão de salvar não responde

## Solução
- Corrigir para @save="submitForm" para responder à operação de salvar

## Verificação
- Sessão cursor 2d7e9be2-2c2b-4dc0-bb76-1942eb9b0244
- Arquivos: D:/repository/淮安物管/zhi2-web-admin/src/views/system/branchInformation/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "detail_save_event_typo",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->