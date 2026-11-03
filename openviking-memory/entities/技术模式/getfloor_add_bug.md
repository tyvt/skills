# 楼幢总层数 getFloor 未对 mathjs.add 操作数兜底
building/unit 系列详情页 getFloor 用 mathjs add 求和，floorNumberAbove/floorNumberUnder 为 undefined 或空字符串时抛 addScalar TypeError。

## 问题根因
- 地上/地下层数变更触发 getFloor，使用 mathjs add 求和
- 新建或清空输入后 floorNumberAbove/floorNumberUnder 可能为 undefined 或空字符串，add 抛 TypeError: Unexpected type of argument in function addScalar
- 堆栈常落在 AmountInput 的 @change，根因在页面 getFloor 而非金额组件

## 解决方案
- 与 UnitDialog 一致：add(this.form.floorNumberAbove || 0, this.form.floorNumberUnder || 0) 对操作数兜底
- building/detail、unit/detail、buildingChange/detail、unitChange/detail 四份详情页需一并排查并同步修复

## 验证与归属
- 验证：Vue warn 指向 AmountInput，实际为 building/detail.vue getFloor 未对操作数 || 0；修复后四份 building 相关 detail 同步
- 涉及文件：zhi2-web-admin/src/views/building/building/detail.vue、unit/detail.vue、buildingChange/detail.vue、unitChange/detail.vue、zhi2-web-admin/src/components/AmountInput/index.vue
- 所属项目：园区公共收益；来源会话：748fb1f8-e625-4295-9c80-d99233536464；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getfloor_add_bug",
  "source_extraction_id": "54194ab371814c2fb7ecde84d359cc63",
  "version": 1,
  "memory_type": "entities"
}
-->