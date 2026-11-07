# 物业费账单模块搜索结论
产品2.0 中未找到与用户描述完全一致的账单 UI，最接近的模块是物业费账单（feeBills）。

## 不存在的功能
- 表格列：费用项目、收费标准、归属月、优惠金额、减免金额、应收金额、实收金额、未付金额、支付状态、账单状态(有效/作废)
- Tab：全部 / 待支付 / 部分支付 / 已支付
- 批量操作：收款、优惠
- 左侧栏：物业服务费账单、公共能耗费账单、电梯费账单、垃圾清运费账单（全文无匹配）

## 最接近的模块
- 物业费账单（feeBills）管理为核心相近模块
- 主列表页：zhi2-web-admin/src/views/property/bill/components/index.vue
- 物业服务费入口(type=1)：property/bill/service/index.vue
- 公共能耗费入口(type=4)：property/bill/public/index.vue
- 电梯费入口：property/bill/lift/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 搜索范围：d:\repository\产品2.0 全库
- 所属项目：产品2.0；来源会话：e57753a2-9e6d-4464-a761-3a7905b9034a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "fee_bills_search",
  "source_extraction_id": "d5e51a3170d5493aafd467d465fcc484",
  "version": 1,
  "memory_type": "entities"
}
-->