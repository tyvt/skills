# uni --outDir only valid for build
`uni` CLI's `--outDir` only takes effect with `uni build`; passing it to `dev` errors with `Unknown option --outDir`.

## Behavior
- `uni --outDir` only works under `uni build`
- `dev` mode with `--outDir` reports `Unknown option --outDir`

## Fix
- Remove `--outDir` from package.json `dev` script (keep `uni -p mp-weixin`)
- Keep `--outDir` in the `build` script
- For custom dev output, configure `build.outDir` in `vite.config.ts`

## Verification
- Verification evidence: src=苏住房C/076.md
- Files: zhi2-mobile-shimin/package.json, 苏住房C/package.json, zhi2-mobile-shimin/vite.config.ts, node_modules/@dcloudio/vite-plugin-uni/dist/cli/index.js
- Project: 苏住房C; Source session: 3541fbbe-c057-47a6-9bce-5cea5500bd20; Baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：3541fbbe-c057-47a6-9bce-5cea5500bd20


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "uni_outdir_build_only",
  "source_extraction_id": "4d965ebf3ffa4b8f93d66ff8f7daff3d",
  "version": 1,
  "memory_type": "entities"
}
-->
