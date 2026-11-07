# 支用合同金额类型显示修复
苏住房G(zhi2-web-admin) 修复了 property/expenditureContract/detail.vue 新增时合同金额类型显示与切换问题。

## 问题原因
- contractAmountType 默认写死 '0'，但字典 property_contract_amountType 中「固定金额」实际值非 0（如 '1'），导致下拉显示原始值
- 显示用 ==0 数字，校验用 =='0' 字符串，切换后值 '1' 使字段无法重新显示

## 修复内容
- 新增计算属性 fixedContractAmountType、isFixedContractAmount 按字典实际值判断
- 字典加载后新增模式若值无效自动设为「固定金额」
- 模板显示、校验规则、查看模式统一使用 isFixedContractAmount
- 切换金额类型时清除合同金额字段校验状态

## 修复后行为
- 新增默认选中「固定金额」并显示「合同金额」输入框
- 切换「不固定金额」隐藏，再切回正常显示

## 涉及文件与归属
- 文件：property/expenditureContract/detail.vue、benefit/pubExpenditureContract/detail.vue
- 所属项目：苏住房G；来源会话：4262bed0-d061-41ed-8364-ba4f6496d209；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "expenditure_amount_fix",
  "source_extraction_id": "d5476054ac4b4f1daec0866a22a1a876",
  "version": 1,
  "memory_type": "entities"
}
-->
