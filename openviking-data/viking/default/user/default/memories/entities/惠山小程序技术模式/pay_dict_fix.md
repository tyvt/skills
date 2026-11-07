# 资产公示页支付字典安全取值修复
assetsPublicity/index.vue 因支付字典项缺失或竞态导致读取 dictLabel 报错，已改为安全取值。

## 根因
- 模板原用 `paymentMethodOptions.find(e => e.dictValue == item.paymentMethod).dictLabel`
- 字典无对应项（含类型不一致如 "1" 与 1）时 find 返回 undefined
- 竞态：`standards` 先返回渲染，而 `getDicts('benefit_pay_type')` 尚未填好 `paymentMethodOptions`

## 修复方案
- 用 `String(e.dictValue) === String(item.paymentMethod)` 比较减少类型不一致
- 用 `?.dictLabel` 避免访问 undefined 属性
- 用 `?? (...)` 兜底显示原 `paymentMethod` 值

## 涉及文件与验证
- 文件：src/pages_benefit/assetsPublicity/index.vue、src/api/modules/common.js
- 验证：extracted source=cursor session=a609b7a6-492a-4565-8427-a19d3fa0849f
- 所属项目：惠山小程序；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "pay_dict_fix",
  "source_extraction_id": "461613e2a2f54b25a2e9ab1b1429116a",
  "version": 1,
  "memory_type": "entities"
}
-->