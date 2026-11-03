# remark为对象或非标JSON致解析报错
泰兴小程序 el.remark 解析新增 parseRemark 容错处理。
## 问题根因
- `el.remark` 可能为缓存对象或非标准JSON字符串（键无引号）。
- 直接 `JSON.parse` 报错。
## 解决方案
- 新增 `parseRemark` 处理空值、对象、合法JSON。
- 失败则用正则提取 `facilityDefinitionId` 与 `icon`，id 以 `el.value` 兜底。
## 验证与归属
- 验证证据：src=泰兴小程序/024.md
- 涉及文件：src/pages_facility/index.vue、src/api/common.js、src/store/app.js、src/pages/index/components/complexCard.vue、src/api/index.js
- 来源会话ID：38572b2b-f9fb-4bc3-8b7f-f2a83f875567
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remark_parse_error",
  "source_extraction_id": "9c4d3fe21ae44bfc9aa3c9ccda14f397",
  "version": 1,
  "memory_type": "entities"
}
-->