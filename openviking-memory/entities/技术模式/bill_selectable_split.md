# 批量操作表格可勾选与执行判定拆分
物业服务费账单列表需将「行是否可勾选」与「能否执行收款/优惠」拆成两层判定，否则已支付账单无法选中。

## 问题背景
- 账单列表里「有效+已支付」账单勾不上，导致收款、优惠、作废无法先选中行。
- isSelectable 直接复用 isBillPayable（只允许待支付/部分支付且未作废），合并了「选中能力」与「动作准入」两个层级。
- 勾选是表格通用选择能力，收款/优惠是每个动作各自准入条件，合并后出现「行有效但选不中」。

## 解决方案
- 在 enums.js 拆成两个纯函数：isBillValid（有效=未作废）用于 isSelectable，让所有有效账单可勾选。
- validateBillsForCollect / validateBillsForDiscount 保留在各自动作入口做准入校验，优惠要求「有效且待支付」，收款只认待支付/部分支付。
- 用户勾了不符合条件的行点按钮时给明确提示，而非锁死行。
- 状态比较全部改成 `==`，兼容后端返回数字或字符串两种形态，避免严格相等误判不可选。

## 验证与归属
- 验证证据：会话 3bad7169（基线 c98afb0）用户诉求「有效账单也要可勾选 做收款和优惠」。
- 修改 spFeeBill 模块 enums.js（新增 isBillValid / validateBillsForDiscount、状态比较改 ==）与 index.vue 的 isSelectable。
- 涉及文件：src/views/property/bill/components/index.vue、src/views/property/declare/components/index.vue、src/views/property/feeDeclare2/index.vue。
- 所属项目：产品2.0；来源会话：3bad7169-f39b-4cf0-bf68-20903c11dcb；代码基线：c98afb0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_selectable_split",
  "source_extraction_id": "5310be18648c497aa40048c7aadc88c2",
  "version": 1,
  "memory_type": "entities"
}
-->