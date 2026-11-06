# remark为对象或非标JSON致解析报错
泰兴小程序 el.remark 解析新增 parseRemark 容错处理。
## 问题根因
- `el.remark` 可能为缓存对象：缓存后 `remark` 已是 `{facilityDefinitionId, icon}`，再 `JSON.parse` 会变成 `"[object Object]"` 导致失败。
- 或非标准JSON字符串：后台填 `{facilityDefinitionId: xxx, icon: yyy}`（键无引号），`JSON.parse` 会在第 3 个字符 `f` 处报错。
- 直接 `JSON.parse` 报错。
## 解决方案
- 新增 `parseRemark` 按顺序处理：空值 → 返回 `{}`；已是对象 → 直接使用；合法JSON字符串 → `JSON.parse`；解析失败 → 正则提取 `facilityDefinitionId` 与 `icon`。
- `id` 增加 `el.value` 兜底。
## 验证与归属
- 验证证据：src=泰兴小程序/024.md
- 涉及文件：src/pages_facility/index.vue、src/api/common.js、src/store/app.js、src/pages/index/components/complexCard.vue、src/api/index.js
- 来源会话ID：38572b2b-f9fb-4bc3-8b7f-f2a83f875567
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remark_parse_error",
  "source_extraction_id": "969d882027964c87a9e76ee21a7fe4b1",
  "version": 2,
  "memory_type": "entities"
}
-->