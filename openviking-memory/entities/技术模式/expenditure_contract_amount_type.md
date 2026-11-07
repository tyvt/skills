# 支用合同金额类型默认值与判断条件双重不一致
阳光物业支用合同新增时，合同金额类型下拉显示原始值0且切换后金额框不出现，根因是默认值硬编码与展示/校验比较口径不一致。

## 问题与根因
- property/expenditureContract/detail.vue 中 contractAmountType 初始数据写死 '0'，但字典 property_contract_amountType 中「固定金额」dictValue 为 '1'，下拉退化显示原始码
- 显示条件写 == 0（数字宽松比较），校验规则写 == '0'（字符串严格相等），切到固定金额后值 '1' 使 == 0 永假，字段永久隐藏

## 解决方案
- 新增计算属性 fixedContractAmountType（按 label「固定金额」反查 dictValue）与 isFixedContractAmount（当前值 === fixedContractAmountType）
- 字典加载完成回调里，新增模式若当前值不在字典值集合内自动重置为「固定金额」
- 模板显示、校验规则、查看模式三处统一改用 isFixedContractAmount，杜绝 == 0 / == '0' 混写
- 切换金额类型时对该字段 clearValidate，避免隐藏字段残留必填提示

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 4262bed0，用户报新增时类型显示0且切换不回，定位 detail.vue 默认写死 '0' 与比较不一致
- 涉及文件：zhi2-web-admin/src/views/property/expenditureContract/detail.vue；zhi2-web-admin/src/mixins/detailMixins.js
- 所属项目：苏住房G；来源会话ID：4262bed0-d061-41ed-8364-ba4f6496d209；代码基线：4fad664

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "expenditure_contract_amount_type",
  "source_extraction_id": "abebe2c56425424f94ff991329e745aa",
  "version": 1,
  "memory_type": "entities"
}
-->