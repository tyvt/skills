# Validação de URL de foto e layout de página de corretor no portal
Revisão Vue identificou URL de foto de corretor não validada e resíduos de layout.

## Problemas
- URL de foto em página de corretor não era validada
- Layout apresentava resíduos como `nth-child` obsoletos

## 解决方案 aplicada
- `portalPersonPhoto.js` ganha `isAllowedPersonPhotoUrl` para restringir caminhos relativos e `http(s):` com fallback para imagem padrão
- Detalhe de agência usa `agencyFields.fullWidth` com grid de duas colunas, removendo regra de breakpoint 760px
- Container de foto restaura `aria-label`
- Watch de `record` estreitado para `id/code`

## Arquivos envolvidos
- `BrokerPages.vue`, `public-portal-designs.ts`, `portal.scss`, `brokers.js`, `portalPersonPhoto.js`

## 验证与归属
- 验证证据: `src=门户/024.md`
- 所属项目: portal (门户)
- Sessão: `5913f527-6905-47bc-8ed0-a0c22c08e59b`
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_broker_photo",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->