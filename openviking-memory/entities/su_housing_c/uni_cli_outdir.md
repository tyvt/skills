# Uni CLI --outDir only valid for build
`uni` CLI `--outDir` only works with `uni build`; dev raises Unknown option error.

## Behavior
- `uni` CLI `--outDir` only effective in `uni build`
- `dev` passing `--outDir` reports `Unknown option --outDir`
- `package.json` `dev` script removed `--outDir` (keep `uni -p mp-weixin`), `build` keeps; custom dev output via `vite.config.ts` `build.outDir`

## Verification
- Evidence: src=苏住房C/076.md
- Files: d:\repository\苏住房C\zhi2-mobile-shimin\package.json ; d:\repository\苏住房C\package.json ; d:\repository\苏住房C\zhi2-mobile-shimin\vite.config.ts ; d:\repository\苏住房C\node_modules\@dcloudio\vite-plugin-uni\dist\cli\index.js ; package.json ; vite.config.ts
- Source session: 3541fbbe-c057-47a6-9bce-5cea5500bd20; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c",
  "name": "uni_cli_outdir",
  "source_extraction_id": "356d1858e539467da8dfffd82a8f6bf9",
  "version": 1,
  "memory_type": "entities"
}
-->