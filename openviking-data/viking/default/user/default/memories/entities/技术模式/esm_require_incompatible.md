# ESM 环境 require 不兼容致引用错误
在 Vite ESM 项目中误用 CommonJS `require` 导致 ReferenceError，需改用项目全局 `debounce`。

## 问题根因
- `index.js` 使用 CommonJS `require` 语法，与 Vite ESM 构建环境不兼容，运行时抛 ReferenceError。
- 项目已提供全局 `debounce`（`public/assets/js/debounce.js`），无需自行 require 引入。

## 解决方案
- 移除 `require` 调用，改用项目全局 `debounce` 提供防抖能力。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证来源：苏州市房地产监测V3-leftover/044.md
- 涉及文件：zhi2-web-admin/src/views/commercialHousingSales/presale/template/detail.vue、index.vue、package.json、vite.config.js、src/views/supervision/deposit/additional/components/buildingTreeDialog.vue、src/main.js、index.html、public/assets/js/debounce.js
- 所属项目：苏州市房地产监测V3；来源会话：0159ba54-715b-46dc-8f41-850347ae8ed3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "esm_require_incompatible",
  "source_extraction_id": "5ad31a75992c4b8cb328e228a9a7a66a",
  "version": 1,
  "memory_type": "entities"
}
-->