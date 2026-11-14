# 工单操作按钮逻辑
工单操作按钮由 ORDER_STATUS 常量与工单类型共同决定。

## 逻辑
- constants.js 使用 ORDER_STATUS 统一状态值
- actionButtons 由 `form.orderStatus` 生成：待接单显示接单和拒单
- 待处理增加回复、转派、催办；处理中增加完成；已关闭和已退回不显示按钮
- 报修工单将回复替换为添加进度并隐藏转派

## 涉及文件
- workOrder/order/detail.vue
- workOrder/order/components/enums.js
- workOrder/order/components/constants.js
- workOrder/order/index.vue
- workOrder/repair/detail.vue

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：346ed707-323c-469b-a3f4-390b4107d074；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "order_action_buttons",
  "source_extraction_id": "76d89241e51c4a01a1ce662f68beef9e",
  "version": 2,
  "memory_type": "entities"
}
-->