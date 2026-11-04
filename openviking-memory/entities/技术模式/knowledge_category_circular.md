# 知识库筛选因循环引用 JSON 报错失效
工作台知识库筛选点击无反应，根因是分类树带环导致 uni-app setData 校验抛错并截断后续请求。

## 问题根因
- `src/staff/utils/knowledgeCategory.js` 的 `normalizeCategory(item, parent, top)` 给每个分类节点挂反向指针：`parent` 父子反向链 + `top` 指向顶级节点（顶层节点 `top` 自指）
- `src/staff/pages/knowledge/index.vue` 的 `loadCategories` 把带环树直接塞进 `topCategories.value`，模板读取后 uni-app 走 `JSON.stringify` 校验 setData payload 抛 `TypeError: Converting circular structure to JSON`
- 同步截断 `confirmFilter` 后续的 `await loadKnowledge({ reset: true })`
- `api/index.js` 静默删除 `undefined` 参数，使请求里 `categoryId` 永远 undefined，接口返回全量，表现为"筛选点了没反应"

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序
- 涉及文件：src/staff/utils/knowledgeCategory.js、src/staff/pages/knowledge/index.vue、src/staff/api/index.js、uni-mp-vue/dist/vue.runtime.esm.js
- 来源会话ID：294e988e-512b-4041-9a2b-8f790756917a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "knowledge_category_circular",
  "source_extraction_id": "31154dd57d29449692bc02b09f1c6aad",
  "version": 1,
  "memory_type": "entities"
}
-->