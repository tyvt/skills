# 知识库查看全部无响应因text点击未生效
泰兴小程序知识库查看全部无响应因 viewCategory 解析失败静默 return，且交互误用 `<text @click>` 未触发。
## 问题根因
- `src/staff/pages/knowledge/index.vue` 中 `viewCategory` 解析失败静默 return。
- 查看全部等交互误用 `<text @click>` 未触发。
## 解决方案
- 新增 `src/staff/utils/response.js` 的 `extractArrayData` 与 `src/staff/utils/knowledgeCategory.js` 的 `resolveCategory` 兜底。
- `index.vue` 改交互为 `<view @tap>` 并失败 toast 提示。
## 验证与归属
- 验证证据：src=泰兴小程序/006.md
- 涉及文件：src/staff/pages/knowledge/index.vue、src/pages/staff/workbench/index.vue、src/pages.json、src/staff/api/knowledge.js、src/staff/pages/knowledge/detail.vue、src/staff/pages_facility/issue/components/TransferKnowledgeDialog.vue、src/staff/api/index.js、src/pages_owner/community/info/index.vue
- 来源会话ID：890a75f9-c359-46c7-a778-43eec2b971b6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "knowledge_text_click_fail",
  "source_extraction_id": "05a8519eba4c4b9e8bf848e717c3609b",
  "version": 1,
  "memory_type": "entities"
}
-->