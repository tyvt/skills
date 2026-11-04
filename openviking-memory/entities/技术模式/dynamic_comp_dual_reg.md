# 小写动态组件 comp 未双重注册导致 Unknown
在项目 苏州市房地产监测V3 中，预售合同页面在 `data.js` 中使用小写的 `comp` 作为动态组件，但 `loadComponents` 仅按 SFC 的 PascalCase `name` 注册，产生 `Unknown custom element`。

## 问题根因
- 预售合同页面的 `data.js` 使用小写的 `comp` 作为动态组件名
- `loadComponents` 仅按 SFC 的 PascalCase `name` 注册
- 章节未被识别，报错 `Unknown custom element`

## 修正
- 在 `src/views/contract/index.vue` 中使用 `require.context` 并按文件名和 `ctrl.name` 双重注册

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/111.md
- 涉及文件: contractContent.vue, contract/index.vue, pre/data.js, stock/contract/detail.vue, pre/cover.vue, vite.config.js, main.js, index.html
- 所属项目: 苏州市房地产监测V3; 会话: b0e0e476-6db0-4fd6-be74-9dfdfcfeb066; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dynamic_comp_dual_reg",
  "source_extraction_id": "af40fe024dd843b9ac721da449decb68",
  "version": 1,
  "memory_type": "entities"
}
-->