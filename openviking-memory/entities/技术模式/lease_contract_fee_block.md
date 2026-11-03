# 租赁合同详情管理费与公共收益金额块
园区公共收益项目(zhi2-web-admin)中，assetsLeaseContractFiling 与 resourcesLeaseContractFiling 为同类详情页，字段块易漂移，需对齐管理费与公共收益金额展示与计算。

## 字段块约定
- 租赁总额后应有只读「扣除管理费后归公共收益金额」与可编辑「管理费」
- 公共收益金额 = 租赁总额 − 管理费
- 管理费校验 0 ≤ 管理费 ≤ 租赁总额，保存前重算
- 查看模式 basicInfoList 同步展示两字段

## 复用规则
- 新改一类合同时先对照另一份已上线 detail.vue 的表单项与计算逻辑再改
- 经营资源合同(resourcesLeaseContractFiling)详情租赁总额后缺两字段，按资产租赁合同(assetsLeaseContractFiling)已有实现补

## 涉及文件
- zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/detail.vue
- zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/detail.vue
- 所属项目：园区公共收益；来源会话：cf131df6-f786-496a-8f96-1551776fc8f6；代码基线：4468dfa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_contract_fee_block",
  "source_extraction_id": "20c68d54ca9a417f9c53b7e4b8c7bb11",
  "version": 1,
  "memory_type": "entities"
}
-->