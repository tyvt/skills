# createFromBill 订单 ID 支付链路统一规范
产品2.0 物业收费账单模块中，整条支付链路统一使用 `createFromBill` 返回的订单 ID。

## 使用场景
- 请求二维码：`POST /property/spOrder/payInfo`，参数 `{ orderId: "<createFromBill返回的ID>", payType: "CSCANC" }`
- 弹窗展示：订单号显示该 ID
- 轮询支付状态：`queryOrderStatus` 的 `orderNo` 也传同一个 ID

## 变更说明
- 之前二维码接口使用 `payInfo` 返回的 `orderNo`，与创建订单的 ID 不一致，现已统一
- 示例订单 ID：`2086734656505315328`

## 涉及文件与来源
- 文件：`collectionDialog.vue`、`index.vue`（路径 `zhi2-web-admin/src/views/property/spFeeBill/components/`）
- 来源会话：22489706-6592-40f4-b567-7d65ec1e013f；项目：产品2.0

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "createfrombill_orderid_flow",
  "source_extraction_id": "5ef37f2bef0b4636adaf69344fa6f3fd",
  "version": 1,
  "memory_type": "entities"
}
-->
