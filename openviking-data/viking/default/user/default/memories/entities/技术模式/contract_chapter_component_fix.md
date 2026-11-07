# 合同章节组件动态加载修复
苏州市房地产监测V3 中修复合同页面 Vue 警告，改用 import.meta.glob 动态加载章节组件。

## 修改内容
- `contractContent.vue` 新增 `chapterComponents` prop，动态组件改为 `:is="chapterComponents[item.comp] || item.comp"`
- `contract/index.vue`（PresaleContract）`loadComponents()` 从 `import.meta.glob` 按文件名（chapter1 等）构建映射，通过 `:chapter-components` 传给子组件；移除 `import Vue` 和 `Vue.component`
- `stock/contract/detail.vue` 用 `import.meta.glob` 替换 `require.context`，同样构建并传递 `chapterComponents`

## 构建验证
- `npm run build` 已成功（exit 0）
- 预售合同 chunk 不再包含 `Vue.component`，存量房合同 chunk 不再包含 `require.context`
- 三处均已使用 `chapterComponents` 本地映射

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`contractContent.vue`、`contract/index.vue`、`stock/contract/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：fe9ef9d6-919d-4d8f-b826-5f333b310c11；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_chapter_component_fix",
  "source_extraction_id": "0c9fcbb812df4bc98444adb2fa3c05fb",
  "version": 1,
  "memory_type": "entities"
}
-->