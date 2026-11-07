# require_debounce修复
苏州市房地产监测V3 迁移代码在 Vite ESM 环境中误用 CommonJS `require` 已修复。

## 根因
- 迁移代码在 Vite ESM 环境中使用 `require('lodash/debounce')`，浏览器不支持 CommonJS 的 `require`，导致 `index.js:221` ReferenceError

## 修改内容
- 删除 5 个文件中 `const debounce = require('lodash/debounce')`，改用项目已有全局 `debounce`（`index.html` 加载 `debounce.js` + `vite.config.js` 的 `define` 注入）
- 涉及文件：`template/detail.vue`、`contractRevoke/detail.vue`、`contractMainInfo/components/chooseHouseDialog.vue`、`contract/dialogs/commercialHousingDialog.vue`、`contract/dialogs/pricingModeDialog.vue`

## 验证与归属
- 验证：`src` 目录已无 `require('lodash/debounce')`，上述文件 lint 通过；刷新后商品房销售→预售→合同范本列表点「新增」可正常进入详情页
- 所属项目：苏州市房地产监测V3；来源会话：567ca49e-2baf-45cf-8be3-47a60365279c
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "require_debounce修复",
  "source_extraction_id": "2acc9c273b0d4e129b8039fe8dfd2d7b",
  "version": 1,
  "memory_type": "entities"
}
-->