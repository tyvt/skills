# 字典remark未校验致JSON.parse崩溃
泰兴小程序 src/pages_facility/index.vue 的 initDict 直接 JSON.parse(el.remark) 因 facility_recommend 字典部分 remark 非合法 JSON 而抛错中断 map。
## 问题根因
- initDict 直接 JSON.parse(el.remark) 因 facility_recommend 字典部分 remark 非合法 JSON 而抛错中断 map。
## 解决方案
- 新增 parseRemark 安全解析（空值/对象/合法JSON/纯文本转 {icon}）。
- id 回退取 remark、facilityDefinitionId 或字典 value，图标参照 facility.vue 直接 import SVG 用 image 展示。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/021.md
- 涉及文件：src/pages_facility/index.vue、src/api/maintenance.js、src/api/common.js、src/pages/index/components/complexCard.vue、src/pages_facility/facility.vue、src/pages_maintain_project/maintainProject.js、src/pages.json、src/components/ZsImage/ZsImage.vue
- 来源会话ID：4964cd0d-1bc1-4c43-810e-fb9b03694f6a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_remark_parse_crash",
  "source_extraction_id": "3035b0b609d145a6af09e8f9d214d24d",
  "version": 1,
  "memory_type": "entities"
}
-->