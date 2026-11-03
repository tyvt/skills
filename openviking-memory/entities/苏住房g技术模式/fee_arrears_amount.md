# 物业费申报明细欠缴金额字段须用 arrearsAmount
物业费申报详情编辑申报明细时欠缴金额不显示且不回显，根因是列绑定 oweAmountSum、编辑弹窗用计算禁用、保存取计算值，需统一为 arrearsAmount。

## 问题根因
- 表格列绑定 oweAmountSum，接口实际返回 arrearsAmount，保存成功但列取不到值 → 不显示
- 编辑弹窗欠缴金额用 calcArrearsAmount() 自动计算且 disabled，没绑 item.arrearsAmount → 不回显
- 保存提交用计算值而非用户输入的 arrearsAmount，输入被丢弃

## 解决方案
- 在 feeBindScopeTable.vue 收敛：列 prop oweAmountSum → arrearsAmount
- 欠缴金额改为可编辑 v-model="item.arrearsAmount"（去掉 disabled）
- 保存直接用 item.arrearsAmount；提交校验增加欠缴金额必填；checkTableDataFields 改查 arrearsAmount；删掉 calcArrearsAmount
- 教训：自动计算+禁用的派生字段若接口有同义落库字段，必须在绑定 prop/可编辑/提交取值/校验字段四处保持同一字段名

## 验证与归属
- 验证证据：会话 0cbbf182 用户诉求使用 arrearsAmount；结论列三条根因及六项修改清单；src=苏住房G/086.md
- 涉及文件：src/views/property/feeDeclare2/detail.vue、src/views/property/feeDeclare2/components/feeBindScopeTable.vue、src/views/property/declare/all/pay.vue
- 所属项目：苏住房G；来源会话ID：0cbbf182-783b-42fb-ad93-4e0e2a8c76bc；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "fee_arrears_amount",
  "source_extraction_id": "1af7b39407a248248e8b533ea8f422ce",
  "version": 2,
  "memory_type": "entities"
}
-->