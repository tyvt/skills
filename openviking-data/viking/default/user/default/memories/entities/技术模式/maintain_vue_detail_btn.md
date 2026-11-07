# 维修资金明细按钮逻辑
家园区一网通办 maintain.vue 中维修资金卡片的「申请查看明细」按钮，已从项目名白名单控制改为全员可见。

## Description
- src/pages/maintain.vue 中维修资金卡片原按项目名白名单控制「申请查看明细」按钮显示
- 原逻辑：白名单 depositDetailApplyProjectNames 为空时所有行不显示按钮，仅 item.name 在白名单内才显示
- 空数组不报错：names.length === 0 提前 return false，JSON.parse 后 projectName 为 [] 时 filter 仍得 []

## 当前状态
- 已改为每条维修资金卡片均显示「申请查看明细」按钮
- 已删除 SmParameterList 请求及 depositDetailApplyProjectNames / shouldShowDetailBtn，避免无用请求与死代码

## 已知缺口
- 若后续需要「有配置时按项目限制、无配置时全员可见」，可再改造

## 验证与归属
- 验证证据：extracted source=cursor project=家园区一网通办
- 涉及文件：src/pages/maintain.vue
- 来源会话：9cb42c4d-a6e9-4673-9b6e-350b769a6337

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintain_vue_detail_btn",
  "source_extraction_id": "ef9bd0247e2a42daa45a73695672b061",
  "version": 1,
  "memory_type": "entities"
}
-->