# SVG de subpacote requer mapeamento ou falha pós-build
No build do zhi2-mobile-shimin, arquivos SVG do pacote principal em `static/svg/` são podados e carregados em runtime de `/pages_main/static/svg/`, exigindo registro de mapeamento.

## Causa
- Arquivos de mesmo nome em `static/svg/` do pacote principal são cortados no build.
- Em runtime o carregamento ocorre de `/pages_main/static/svg/`, causando falha se não mapeado.

## 解决方案
- Registrar mapeamentos em `src/utils/index.js`, ex.: `'svg/headphone.svg': ['pages_main']`.
- Outros pontos: utils/mainStaticPaths.js, package.json, scripts/prune-main-static.mjs.

## Arquivos e Verificação
- Envolvidos: pages_main/about/AboutUs.vue, ZsImage.vue, pages.json, pages/about/AboutUs.vue, utils/index.js.
- 验证证据: src=苏住房C/030.md; sessão e7e357b4-638f-4ace-8ca0-7fa9ff707a43; base none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "subpackage_svg_prune",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->