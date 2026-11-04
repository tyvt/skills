- Em `zhi2-web-admin/src/utils/version-check.js`, o endereço padrão foi alterado de `/version.json` para caminho relativo `version.json` para evitar hardcoding da raiz.
- Em `zhi2-web-admin/vite.config.js`, `public/version.json` é caminho de disco em build, não URL de requisição, não precisa modificar.
- Verificação: evidência 产品2.0/063.md; sessão faf38ec5.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Caminho padrão de verificação de versão",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 1,
  "memory_type": "preferences"
}
-->