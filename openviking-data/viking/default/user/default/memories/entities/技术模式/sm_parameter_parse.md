# 申请查看明细项目名解析
从 SmParameterList 接口返回的首条数据解析 projectName 列表，控制「申请查看明细」按钮显示。

## Description
- 从 res.SmParameterList 或 res.list 数组取第一条数据
- 第一条的 value 为 JSON 字符串，用 JSON.parse(first.value) 解析
- 从解析结果取 projectName 数组，过滤空值后赋给 depositDetailApplyProjectNames

## 关键逻辑
- 无第一条、无 value 或解析失败时 depositDetailApplyProjectNames 设为 []
- projectName 为空数组时同样保持 []
- depositDetailApplyProjectNames 为空数组时 shouldShowDetailBtn 直接返回 true，即始终显示按钮
- projectName 有内容时仅当列表项 item.name 在该列表中才显示按钮

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 涉及文件：src/pages/maintain.vue、src/pages-my/components/add.vue
- 来源会话ID：ae398bf0-45c5-45bc-99b3-dd66530e6bd9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sm_parameter_parse",
  "source_extraction_id": "1d00a9284a824937a6f796a98da6d2f6",
  "version": 1,
  "memory_type": "entities"
}
-->