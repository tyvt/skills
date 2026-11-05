
# 设施字典remark字段JSON解析报错修复
泰兴小程序 index.vue 中 initDict 对字典 remark 字段直接 JSON.parse 导致非合法 JSON 报错，已新增安全解析修复。

## 问题根因
- facility_recommend 字典部分条目 remark 不是合法 JSON（如纯文本 type_1、已是对象、格式错误），JSON.parse 抛出 Unexpected token 错误，导致整个 map 中断。

## 修复方案
- 新增 parseRemark：空值 → {}；已是对象 → 直接使用；合法 JSON → 解析；解析失败且为 type_1 类纯图标名 → 转为 { icon: 'type_1' }。
- ID 回退：id 优先取 remark.facilityDefinitionId，否则用字典的 value（dictValue）。
- 图标路径：改为像 facility.vue 一样直接 import SVG 并用 image 展示，避免 ZsImage 路径问题。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_facility/index.vue、facility.vue、src/api/maintenance.js、src/api/common.js、src/pages/index/components/complexCard.vue
- 来源会话ID：4964cd0d-1bc1-4c43-810e-fb9b03694f6a
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "facility_remark_json_fix",
  "source_extraction_id": "eca9392103974c479511f0942f341ea8",
  "version": 1,
  "memory_type": "entities"
}
-->