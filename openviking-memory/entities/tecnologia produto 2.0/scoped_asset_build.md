# Erro de compilação por imagem inexistente e Sass não importado em scoped
No zhi2-web-admin do produto 2.0, cardData.vue referenciava imagens inexistentes e o estilo scoped de buildingTable não importava o arquivo de variáveis, causando erro de compilação ou execução.

## Causa raiz
- cardData.vue referenciava down.png/up.png inexistentes, gerando falta de recurso em execução
- o estilo scoped de buildingTable/index.vue não importava o arquivo de variáveis do Element, deixando $--color-primary indefinido e falhando a compilação

## Solução
- cardData.vue passou a usar el-icon-top/el-icon-bottom em vez das imagens
- buildingTable/index.vue trocou $--color-primary por var(--primary-color), compilando com sucesso

## Verificação e origem
- Evidência: src=产品2.0/046.md
- Arquivos: zhi2-web-admin/src/views/indemnity/homePage/components/cardData.vue, src/utils/resolveServerAssetUrl.js, src/views/projectManagement/buildingTable/index.vue, vite.config.js
- Projeto: produto 2.0; sessão: 607e0008-39cd-4f41-ac93-f621b4844489; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia produto 2.0",
  "name": "scoped_asset_build",
  "source_extraction_id": "794b625f596c43eeb4179370fbaced2a",
  "version": 1,
  "memory_type": "entities"
}
-->