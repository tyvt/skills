
# 物业服务费账单勾选逻辑修复
产品2.0 的 spFeeBill 模块修改了账单勾选逻辑，使所有有效账单均可勾选，便于批量收款、优惠和作废。

## 问题原因
- 原 `isSelectable` 使用 `isBillPayable`，仅允许「待支付 / 部分支付」且未作废的账单勾选
- 「有效 + 已支付」账单无法勾选，导致批量收款、优惠、作废操作不便

## 修改内容
- `enums.js` 新增 `isBillValid()` 判断账单是否有效（未作废）
- `enums.js` 新增 `validateBillsForDiscount()` 优惠校验（须为有效且待支付）
- 状态比较改为 `==` 兼容数字/字符串类型
- `index.vue` 中 `isSelectable` 改为 `isBillValid(row)`，所有有效账单均可勾选
- `handleDiscount` 增加 `validateBillsForDiscount` 校验
- 收款仍走原有 `validateBillsForCollect`（仅待支付/部分支付）

## 勾选与操作规则
- 有效+待支付：可勾选✅ 收款✅ 优惠✅
- 有效+部分支付：可勾选✅ 收款✅ 优惠❌
- 有效+已支付：可勾选✅ 收款❌ 优惠❌
- 作废账单：不可勾选

## 涉及文件与来源
- 文件：`zhi2-web-admin/src/views/property/bill/components/index.vue`、`declare/components/index.vue`、`feeDeclare2/index.vue`、`spFeeBill/components/index.vue`、`enums.js`、`discountDialog.vue`
- 项目：产品2.0；来源会话：3bad7169-f39b-4cf0-bf68-090703c11dcb；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_selectable_valid",
  "source_extraction_id": "997c2c3837c04b879544186d7655de27",
  "version": 2,
  "memory_type": "entities"
}
-->
