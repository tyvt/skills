
# 物业收费申报字段映射与展示
苏住房G(zhi2-web-admin) 物业收费管理-申报缴费(feeDeclare2) 已按后端字段定义对齐房屋面积、收费标准、账单金额、优惠金额的页面展示。
## 字段映射
- chargingStandard：申报缴费弹窗「收费标准」文本输入（原为下拉选择）
- billAmount：账单金额 / 账单总金额
- discountAmount：优惠金额 / 优惠总金额
- paidArea：已缴面积
- unpaidArea：未缴面积
- fundCollectionRate：资金收缴率（优先使用接口返回值，百分比数值如 80 显示 80%）
- areaCollectionRate：面积收缴率（优先使用接口返回值，无数据按公式本地计算兜底）
## 改动要点
- 申报缴费弹窗收费标准由下拉选择改为 chargingStandard 文本输入；保存/回显使用 chargingStandard、billAmount、discountAmount
- 移除 feeStandardId、feeStandardName 及相关收费标准下拉加载逻辑
- 户室收缴率后端未提供对应字段，仍按本地计算
## 涉及文件与归属
- 文件：property/feeDeclare2/detail.vue、property/feeDeclare2/components/feeBindScopeTable.vue
- 所属项目：苏住房G；来源会话：a0b29235-6dfc-41c7-a72a-ffbd03aa1059；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "feedeclare2_fields",
  "source_extraction_id": "304462af4c4c464dbde6022d75d9467b",
  "version": 1,
  "memory_type": "entities"
}
-->