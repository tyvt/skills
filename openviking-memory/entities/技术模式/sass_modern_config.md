# Sass 弃用警告消除配置
Dart Sass 旧版 JS API（legacy-js-api）触发弃用警告，须在 Vite 配置中启用 modern-compiler 并静音。
## 问题根因
- Dart Sass 旧版 JS API（legacy-js-api）在构建时触发弃用警告。
## 解决方案
- 在 `zhi2-web-admin/vite.config.js` 的 `css.preprocessorOptions.scss/sass` 中配置 `api: "modern-compiler"` 与 `silenceDeprecations: ["legacy-js-api"]` 静音警告。
## 验证与归属
- 验证证据：src=2-0/014.md
- 涉及文件：zhi2-web-admin/vite.config.js ; css.preprocessorOptions.scss
- 所属项目：2-0；来源会话ID：e7866ad8-8705-4e0b-9a37-e80f788b005a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_modern_config",
  "source_extraction_id": "6d18fa7d688944059b189e2db9628a41",
  "version": 1,
  "memory_type": "entities"
}
-->