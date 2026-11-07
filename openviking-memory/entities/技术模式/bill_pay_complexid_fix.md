# 账单列表页收款报错修复
产品2.0 项目修复了账单列表页点击收款因缺少 `complexId` 报错的问题，改为从接口获取。

## 问题原因
- `spFeeBill/components/index.vue` 的 `handlePay` 校验 `row.complexId`，但列表接口通常只返回 `complexName`
- 导致提示「缺少物业管理区域信息」且收款弹窗与 `payDetail` 接口未被调用

## 修复方案
- `index.vue`：收款仅校验账单 `id`，不再依赖 `complexId`
- `collectionDialog.vue`：打开后先调 `payDetail` 接口取 `complexId` 再加载支付渠道

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：eb97ca91-bf05-47bd-962a-06182b75ff56；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_pay_complexid_fix",
  "source_extraction_id": "b748adfbea38472688052e3ba8fcbc14",
  "version": 1,
  "memory_type": "entities"
}
-->