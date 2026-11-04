- O mixin `form.js` `getDetail()` usa `validateDetailRequiredParams()` que exige `id` por padrão, fazendo com que interfaces sem id (ex.: `platformConfig/detail.vue` reescreveu `detailApiFull`) falhem e pulsem requisição.
- Para adaptar interfaces sem id, reescrever `getDetailRequiredParams()` em `detail.vue` removendo a obrigatoriedade de `id`.
- Verificação: evidência 产品2.0/064.md; sessão aac565c5.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Validação de id em getDetail",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 1,
  "memory_type": "preferences"
}
-->