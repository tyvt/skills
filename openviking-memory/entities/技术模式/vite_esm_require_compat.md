# Vite ESM环境下require兼容缺陷
迁移代码使用 CommonJS `require` 与 Vite ESM 环境不兼容致 ReferenceError，改为全局 `debounce` 提供能力。

## 现象与根因
- 迁移代码使用 CommonJS `require` 在 Vite ESM 构建中报错 ReferenceError。
- 涉及文件包括 `index.js`、`main.js`、`vite.config.js`、`package.json` 等。

## 修复要点
- `index.js` 改用全局 `debounce` 提供该能力，避免 `require`。
- 全局 `debounce` 在 `public/assets/js/debounce.js` 定义并由 `index.html` 引入。

## 涉及文件与验证
- 涉及：zhi2-web-admin/src/views/commercialHousingSales/presale/template/detail.vue、index.vue、package.json、vite.config.js、buildingTreeDialog.vue、main.js、index.html、public/assets/js/debounce.js。
- 验证：src=苏州市房地产监测V3/244.md；来源会话：0159ba54-715b-46dc-8f41-850347ae8ed3。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_esm_require_compat",
  "source_extraction_id": "16d52690aaa041be8ea47d27cdf763c1",
  "version": 1,
  "memory_type": "entities"
}
-->