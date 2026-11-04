- Não configurar explicitamente `submitApi`; `getSubmitApi` concatena corretamente o caminho `/autonomy/ownerCommitteeLog/submit` por convenção.
- A lógica de geração de `submitApi` está correta; evitar ajustes ou configurações redundantes baseados em julgamentos anteriores errôneos.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Geração de submitApi",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->