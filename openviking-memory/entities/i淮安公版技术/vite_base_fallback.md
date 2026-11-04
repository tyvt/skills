# i淮安公版 Vite base 路径回退修复
i淮安公版项目 vite.config.ts 中因 runMode 推断错误导致 H5 打包 base 路径缺失 /h5/ 的修复记录。

## 问题根因
- 旧逻辑通过 `npm_lifecycle_event` 推断 `runMode`，再 `loadEnv(runMode)` 读取环境变量。
- 在 `npx uni build`、CI 直接调 `uni build`、或未通过 npm script 运行时，`npm_lifecycle_event` 常为空，被当作 `development`。
- 结果 `loadEnv` 读取 `.env.development`；若 CI 未拷贝该文件，`VITE_APP_H5_PUBLIC_BASE` 为空。
- Vite `base` 退回默认 `/`，打包出的 JS/CSS 不带 `/h5/` 前缀。

## 修复方案
- 改用 Vite 传入的 `mode` 做 `loadEnv(mode, …)`，与 `uni build`(production)、`uni build -m test`(test) 一致。
- `base` 来源顺序：小程序（`process.env.UNI_PLATFORM` 以 `mp-` 开头）固定 `./`；H5 用 `VITE_APP_H5_PUBLIC_BASE`。
- 涉及文件：vite.config.ts、src/manifest.js、dist/index.html。
- 所属项目：i淮安公版；来源会话：68fa8b3e-063d-4913-b4bd-a9e072b71884。

<!-- MEMORY_FIELDS
{
  "category": "i淮安公版技术",
  "name": "vite_base_fallback",
  "source_extraction_id": "278ce1504f244ed5ae52916d18ff2312",
  "version": 1,
  "memory_type": "entities"
}
-->