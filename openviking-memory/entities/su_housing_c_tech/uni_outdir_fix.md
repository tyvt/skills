# uni CLI --outDir 参数修复
苏住房C 项目 `dev` 脚本误用 `uni` CLI 的 `--outDir` 参数导致报错，已移除。

## 问题原因
- `uni` CLI 的 `--outDir` 仅在 `uni build` 有效，`dev` 不支持，报 `Unknown option --outDir`
- 原 `dev` 脚本：`uni -p mp-weixin --outDir ../dist`

## 修复要点
- 从 `dev` 脚本移除 `--outDir`，改为 `"dev": "uni -p mp-weixin"`
- `build` 脚本保留 `--outDir ./dist`，开发默认输出 `dist/dev/mp-weixin`，生产输出 monorepo 根 `dist`
- 若开发需改输出目录，应在 `vite.config.ts` 配置 `build.outDir`，而非 dev 命令行传参

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：3541fbbe-c057-47a6-9bce-5cea5500bd20
- 涉及文件：package.json、vite.config.ts
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "uni_outdir_fix",
  "source_extraction_id": "e85e753071284223b9a0af1850f7992a",
  "version": 1,
  "memory_type": "entities"
}
-->