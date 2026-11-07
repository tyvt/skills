# Vite ESM 环境使用 require 触发浏览器报错
苏州市房地产监测V3 的 Vite ESM 环境使用 `require('lodash/debounce')` 触发浏览器不支持 CommonJS 报错。

## 问题根因
- Vite ESM 环境使用 `require('lodash/debounce')` 触发浏览器不支持 CommonJS 报错
- `template/detail.vue`、`contractRevoke/detail.vue` 等 5 个文件存在 require 引入

## 修复方案
- 删除 5 个文件的 require 引入，改用 `index.html` 加载的 `debounce.js`
- 通过 `vite.config.js` 的 `define` 注入全局 `debounce`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/112.md；src=苏州市房地产监测V3/156.md
- 涉及文件：presale/template/detail.vue、mixins/listMixins.js、package.json、vite.config.js、benefit/components/AgreementDetailsTable/index.vue、presale/template/index.vue、index.html、public/assets/js/debounce.js
- 所属项目：苏州市房地产监测V3；来源会话：567ca49e-2baf-45cf-8be3-47a60365279c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_require_error",
  "source_extraction_id": "f6c19f19494240c78561d94bce477288",
  "version": 2,
  "memory_type": "entities"
}
-->