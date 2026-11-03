# 面积字段watch重算总面积
苏住房G项目多处详情页将地上/地下面积字段的change事件改为watch监听自动重算总建筑面积。
## 改动文件
- property/complex/detail.vue、property/complexChange/detail.vue、building/complexSearch/detail.vue：移除地上/地下面积字段 @change，新增 watch 监听 form.aboveFloorArea 与 form.underFloorArea 自动重算总建筑面积。
- complexBuildingAuth/detail.vue：无对应输入框故未修改。
## 验证与归属
- 所属项目：苏住房G；来源：苏住房G/047.md。
- 配套文件：AmountInput/index.vue、zs-input/zs-input.vue、directives/formatter/money.js 等。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_watch_recalculate",
  "source_extraction_id": "648ee6c78c33403d80340cd311a1737b",
  "version": 1,
  "memory_type": "entities"
}
-->