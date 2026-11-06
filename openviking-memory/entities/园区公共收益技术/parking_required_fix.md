# 停车泊位租赁合同必填星号修复
停车泊位租赁管理详情页「收费标准名称」必填星号缺失问题已修复。

## 问题原因
- el-form-item 的 prop 为 parkingChargeStandardId，但校验规则写在 parkingChargeStandardName 上
- Element UI 仅当 prop 与 rules 字段名一致时才显示必填 *

## 修复内容
- 在 parkingSpaceContractFiling/detail.vue 将校验规则字段改为 parkingChargeStandardId
- 规则：[{ required: true, message: '收费标准名称不能为空', trigger: 'change' }]
- 现「收费标准名称」显示必填 *，未填写保存时前端提示「收费标准名称不能为空」

## 验证与归属
- 涉及文件：src/views/benefit/parkingSpaceContractFiling/detail.vue
- 所属项目：园区公共收益；来源会话：7a6ec4bf-c697-4a2c-85ae-f84db3a2a972

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "parking_required_fix",
  "source_extraction_id": "097cc9e742094ebe90d460565fc77958",
  "version": 1,
  "memory_type": "entities"
}
-->