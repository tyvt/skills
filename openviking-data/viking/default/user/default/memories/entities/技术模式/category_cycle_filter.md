# 分类节点反向指针致循环引用
`src/staff/utils/knowledgeCategory.js` 的 `normalizeCategory` 建立 parent 与 top 自指反向指针形成带环树，导致 `knowledge/index.vue` 的 `loadCategories` 触发 uni-app `JSON.stringify` 循环引用异常并截断 `confirmFilter` 请求。
## 问题根因
- `normalizeCategory` 建立 parent 与 top 自指反向指针，形成带环树结构。
- `loadCategories` 调用 `JSON.stringify` 时因循环引用抛异常，截断筛选请求。
## 解决方案
- 移除反向指针，或对分类数据深拷贝以断开环结构。
## 验证与归属
- 验证证据：src=泰兴小程序/002.md
- 涉及文件：src/staff/utils/knowledgeCategory.js、src/staff/pages/knowledge/index.vue、src/pages.json、src/staff/api/knowledge.js、src/staff/api/index.js、src/pages/staff/workbench/index.vue、dist/build/mp-weixin/staff/pages/knowledge/index.wxml、dist/build/mp-weixin/staff/pages/knowledge/index.js
- 来源会话ID：294e988e-512b-4041-9a2b-8f790756917a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "category_cycle_filter",
  "source_extraction_id": "c7a57cf5e1504976a95d5381a79c5cc8",
  "version": 1,
  "memory_type": "entities"
}
-->