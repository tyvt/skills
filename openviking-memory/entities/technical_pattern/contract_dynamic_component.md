# 合同动态组件glob映射prop注入
苏州市房地产监测V3中，移除全局注册后，动态组件依赖 prop 传入的映射来消除未知组件构建告警。

## 问题根因
- `contractContent.vue` 原先依赖全局 `Vue.component` 与 `require.context` 加载动态组件
- 全局注册与 `require.context` 导致构建告警

## 解决方案
- `contractContent.vue`、`contract/index.vue`、`stock/contract/detail.vue` 新增 `chapterComponents` prop 接收组件映射
- 利用 `import.meta.glob` 按文件名构建映射并移除 `Vue.component` 与 `require.context`
- 通过 `:is="chapterComponents[item.comp] || item.comp"` 注入动态组件并移除旧依赖
- 通过 prop 传递映射以消除未知组件告警

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/051.md；src=苏州市房地产监测V3/094.md
- 涉及文件：contractContent.vue、pre/data.js、contract/index.vue、indexFrame.js、pre/chapter1.vue、stock/contract/detail.vue、package.json、main.js
- 所属项目：苏州市房地产监测V3；来源会话：fe9ef9d6-919d-4d8f-b826-5f333b310c11；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contract_dynamic_component",
  "source_extraction_id": "999b4bd863ec4b209ac8f3d1a7f02e39",
  "version": 2,
  "memory_type": "entities"
}
-->