# 标准工时未校验致非法格式存为NaN
泰兴小程序 `add.vue` 直接使用 `Number()` 转换标准工时，致 `0.0.5` 等非法格式存为 `NaN`，新增 `parseStandardHour` 校验并兜底展示。

## 问题根因
- `add.vue` 直接使用 `Number()` 转换标准工时。
- `0.0.5` 等非法格式存为 `NaN`。

## 解决方案
- 新增 `parseStandardHour` 限制数字格式并阻拦保存。
- `detail.vue` 将历史 `NaN` 展示兜底为 `-`。

## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/022.md
- 涉及文件：d:/repository/泰兴小程序/src/staff/pages_facility/record/add.vue、d:/repository/泰兴小程序/src/staff/pages_facility/record/detail.vue
- 来源会话ID：407faa95-0a72-4db7-b335-97797a083932
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "standard_hour_nan",
  "source_extraction_id": "5fe64a913e8e4332b1aa5926a136ded7",
  "version": 1,
  "memory_type": "entities"
}
-->