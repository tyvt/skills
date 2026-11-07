# 街道/社区编码全局转中文
列表与选择弹窗里街道/社区显示编码时，应在基础设施层统一处理而非逐页手写 formatter。

## 做法要点
- `common` store 增加 `subdistrictList`、`communityList`，在路由守卫里与行政区划一并预加载
- `src/utils/areaFormatter.js` + `formatters/index.js` 提供 `subdistrictFormatter`、`communityFormatter`
- `zs-table-column` 对 `prop` 为 `subdistrict`/`subdistrictCode` 或 `community`/`communityCode` 自动套用对应 formatter
- `mixins/area.js` 与 store 同源，避免下拉与表格各拉一套数据；已手动配置 formatter 的列行为不变

## 覆盖范围
- 自动 formatter 覆盖列表、`SelectDialog` 及 `v-bind="column"` 列
- 资金缴款「选择物业管理区域」弹窗应显示「娄葑街道」等中文

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：会话「修复街道/社区显示编码的问题，全局处理」新建 areaFormatter、改 common store/router、formatters、zs-table-column、area mixin
- 涉及文件：zhi2-web-admin/src/utils/areaFormatter.js、store/modules/common.js、router/index.js、formatters/index.js、components/zs-table-column/zs-table-column.vue、mixins/area.js
- 所属项目：园区公共收益；来源会话：a6aae663-eacf-4a1f-bbbd-fbb2ad3323ac；代码基线：1ccdb34

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_area_code_formatter",
  "source_extraction_id": "05eb26b7a0194582af009060b1946206",
  "version": 1,
  "memory_type": "entities"
}
-->