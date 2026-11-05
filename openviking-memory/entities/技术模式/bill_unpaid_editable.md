# 物业服务费账单未支付可编辑功能
产品2.0 的 spFeeBill 模块新增「未支付可编辑」能力，仅待支付且未作废账单可编辑。

## 实现要点
- `enums.js` 新增 `isBillEditable`：仅当 paidState === '0'（待支付）且 billStatus !== '2'（未作废）时可编辑
- `index.vue` 操作列新增「编辑」按钮，仅满足条件的账单显示，权限 `property:spFeeBill:edit`
- `detail.vue` 查看模式下未支付账单显示「编辑」按钮
- `detail.vue` 隐藏提交、审核、制单信息（账单不走审批流）
- 若通过 URL 进入编辑模式但账单不可编辑，自动切回查看并提示
- 保存前再次校验，防止状态已变更仍被提交
- 详情页已有编辑表单（楼幢、户室、收费项目、账单金额等），保存走 `PUT /property/spFeeBill`

## 不可编辑情况
- 部分支付、已支付、已作废账单均不显示编辑入口

## 涉及文件与来源
- 文件：`spFeeBill/components/enums.js`、`index.vue`、`detail.vue`
- 项目：产品2.0；来源会话：5d376bda-346d-42a9-b39d-cc3b000dca1e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_unpaid_editable",
  "source_extraction_id": "57e872b5424442ffaddb2a2cb119a7a7",
  "version": 1,
  "memory_type": "entities"
}
-->