# 支出合同收款字段与资金拨付带入
园区公共收益项目(zhi2-web-admin)中，支出合同(pubExpenditureContract)需维护收款五字段，资金拨付(pubAllotNotice)选合同时从合同带入而非用款申请。

## 字段约定
- 支出合同基本信息必填：收款人 payeeName、收款账号 payeeBankAccount、收款开户行 payeeBankName
- 开户行选网点时同步写入 payeeBankCode、payeeBankUnionCode
- 资金拨付选支出合同后，上述五字段一律从合同对象带入；金额与监管账户等仍从用款申请接口取

## 联调注意
- 联调前确认合同列表/详情接口已返回并持久化这五字段，否则拨付页无法自动回填

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubExpenditureContract/detail.vue
- zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue
- 所属项目：园区公共收益；来源会话：f1fba927-0937-4139-b4e5-1db96673d052；代码基线：08d3255

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_payee_fields",
  "source_extraction_id": "20c68d54ca9a417f9c53b7e4b8c7bb11",
  "version": 1,
  "memory_type": "entities"
}
-->