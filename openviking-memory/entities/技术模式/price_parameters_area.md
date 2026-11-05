# 价格备案区域选择修复
价格备案参数维护页面（priceParameters）的区域选择组件因数据未加载及属性误用导致无数据项，已修复。

## 问题根因
- 列表页 `priceParameters/index.vue` 在 `created` 时 Vuex `areas` 尚未加载，导致 `areaOptions` 为空
- 选项使用 `value`/`label`，而 `zs-select` 需要 `dictValue`/`dictLabel`
- 详情页 `priceParameters/detail.vue` 的 `location-cascader` 误用不存在的 `default-value`、`@getValue`
- `form.region` 存逗号分隔字符串（如 `"320000,320500,320508"`），组件需单个6位区划码

## 解决方案
- 列表页改为 computed 的 `areaOptions`，在 `initDict` 中预加载区划数据并映射为 `dictValue`/`dictLabel`
- 详情页使用标准 `:region.sync="cascaderRegion"`
- 通过 computed 在逗号分隔字符串与末级区划码间转换，使用 `@update` 更新 `region`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`priceParameters/index.vue`、`priceParameters/detail.vue`、`src/api/system.js`、`Step1CompanyInfo.vue`、`location-cascader.vue` 等
- 来源会话：04e1ef0f-7b76-47f3-bf80-29a92b396eaf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_parameters_area",
  "source_extraction_id": "b7c4512054fb4b70bf552a713aed3145",
  "version": 1,
  "memory_type": "entities"
}
-->