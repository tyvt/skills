# 解析首条value提取projectName数组
接口返回数组取首条解析 projectName 字段，过滤空值赋给明细展示状态，失败或空时兜底显示明细按钮。

## Description
- 接口返回数组取首条记录，对 first.value 执行 JSON.parse 提取 projectName 数组

## 关键逻辑
- 过滤空值后赋给 depositDetailApplyProjectNames
- 解析失败或为空时置为 []，触发 shouldShowDetailBtn 始终返回 true 以显示明细按钮

## 验证与归属
- 验证证据：extracted source=cursor session=ae398bf0-45c5-45bc-99b3-dd66530e6bd9
- 涉及文件：src/pages/maintain.vue、src/pages-my/components/add.vue
- 来源会话ID：ae398bf0-45c5-45bc-99b3-dd66530e6bd9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parse_projectname_array",
  "source_extraction_id": "9f93fce37f554190a2bb7cdfb8f52344",
  "version": 1,
  "memory_type": "entities"
}
-->