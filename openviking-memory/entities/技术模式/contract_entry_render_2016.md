# 合同入口渲染统一的2016组件
统一2016组件的渲染，并抽象合同中的常见操作。

## 描述
- `src/views/contract/index.vue` 之前将2016硬编码为预售，现在通过路由 `/cash` 按现售判断并强制渲染2016。
- 修复了 `reSign` 跳转到 `/pre` 的缺陷。
- 新增 `components/ContractOperationActions.vue` 用于两个分支的通用按钮。
- suzhou2016 的 `chapter1.vue` 根据第5部分的映射重命名了当事人表的字段，并复用了 `vendeeAgentDialog`。

## 文件
- `contract/index.vue`, `ContractOperationActions.vue`, `chapters/suzhou2016/chapter1.vue`, `szForm.js` 等。

## 验证
- 来源: 苏州市房地产监测V3/074.md; session 52faca44-46f3-48c0-9ba2-d452448948d2.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_entry_render_2016",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->