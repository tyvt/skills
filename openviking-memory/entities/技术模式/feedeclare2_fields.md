# 物业收费申报字段映射与展示
苏住房G(zhi2-web-admin) 物业收费管理-申报缴费(feeDeclare2) 已按后端字段定义对齐多项字段的页面展示。
## 基础字段映射
- chargingStandard：申报缴费弹窗「收费标准」文本输入（原为下拉选择）
- billAmount：账单金额 / 账单总金额
- discountAmount：优惠金额 / 优惠总金额
- paidArea：已缴面积
- unpaidArea：未缴面积
## 金额与收缴率字段
- fundCollectionRate：资金收缴率（优先接口返回值，百分比如 80 显示 80%）
- areaCollectionRate：面积收缴率（优先接口返回值，无数据本地计算兜底）
- totalHouseholds：本次申报总户数（仅取统计接口，不再用 oweHouseSum 兜底）
- receivableAmount：累计应收金额
- actualReceivedAmount：累计实收金额
## 欠费统计接口逻辑
- arrearsAmount：累计欠缴金额
- `queryOweFeeStatistic` 接口优先读取顶层 `receivableAmount`/`actualReceivedAmount`/`arrearsAmount`；未返回则按 `oweFeeTypeDetail` 各费用类型金额汇总兜底
## 改动要点与归属
- 申报缴费弹窗收费标准由下拉改为 chargingStandard 文本输入；保存/回显用 chargingStandard、billAmount、discountAmount
- 移除 feeStandardId、feeStandardName 及相关下拉加载逻辑
- 户室收缴率优先用接口返回 collectionRate，不再用 oweHouseSum 当总户数
- 文件：property/feeDeclare2/detail.vue、index.vue、components/feeBindScopeTable.vue
- 所属项目：苏住房G；来源会话：a0b29235-6dfc-41c7-a72a-ffbd03aa1059、4da73cea-1332-41ff-a953-da6a317d328b、6603fa3e-f69e-4d14-86c8-5c183dff620d；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "feedeclare2_fields",
  "source_extraction_id": "048951ab304943a585dc23187ac29bde",
  "version": 3,
  "memory_type": "entities"
}
-->
