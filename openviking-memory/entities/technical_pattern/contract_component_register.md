# 合同页动态组件仅按PascalCase注册
预售合同页用 `data.js` 小写 `comp` 作动态组件，而 `loadComponents` 仅按 SFC 的 PascalCase `name` 注册，导致 `Unknown custom element`。

## 问题根因
- 预售合同页 `data.js` 中使用小写 `comp` 作为动态组件标识
- `loadComponents` 仅按 SFC 的 PascalCase `name` 注册组件，无法匹配小写标识
- 导致运行时报 `Unknown custom element` 错误

## 修复方案
- 在 `src/views/contract/index.vue` 使用 `require.context` 动态加载组件
- 按文件名 + `ctrl.name` 双注册，兼顾大小写与文件名匹配

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/059.md
- 涉及文件：contract/index.vue、contract/components/contractContent.vue、contract/chapters/pre/data.js、contract/chapters/pre/cover.vue、vite.config.js、main.js、index.html、stock/contract/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：b0e0e476-6db0-4fd6-be74-9dfdfcfeb066；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contract_component_register",
  "source_extraction_id": "914335400ee24df19f7a1f642d838c6f",
  "version": 1,
  "memory_type": "entities"
}
-->