# 统计字段对接后端 VO 字段名对齐
苏住房G 物业费申报详情新增统计展示时，按「显示名→后端字段」对照表绑定，并写旧字段回落与本地计算兜底。

## 问题背景
- 新增总面积、已缴户数、未缴户数、物业费收缴率四类统计
- 后端 VO 直接给 totalHouseholds/paidHouseholds/unpaidHouseholds/collectionRate/totalArea
- 早期页面用 oweHouseSum 旧字段，收缴率可能前端按「实收/应收」自算
- 直接换字段致旧环境统计区变空，读旧字段拿不到精确口径

## 解决方案
- 建显示名→后端字段对照表：本次申报户数=totalHouseholds（缺时回落 oweHouseSum）、总面积=totalArea、已缴/未缴=paid/unpaidHouseholds、收缴率=collectionRate（未返回时本地实收/应收×100%）
- 数据来源固定两处：详情接口 response.data 合并进表单 + queryOweFeeStatistic 返回覆盖，顺序不可反
- 改完刷新详情页逐项核对数值，不只验有无

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：property/feeDeclare2/detail.vue
- 所属项目：苏住房G；来源会话：eaff5bf3-1e81-45b7-9600-20eebd931629；代码基线：f78f7e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stat_vo_mapping",
  "source_extraction_id": "dafee6b6ceb14a54b7ef69adae82dbce",
  "version": 1,
  "memory_type": "entities"
}
-->