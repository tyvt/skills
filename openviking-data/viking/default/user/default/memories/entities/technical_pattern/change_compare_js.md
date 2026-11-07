
# changeCompare.js 统一变更值比较
兴化物管 zhi1-web-admin 新增 src/utils/changeCompare.js，统一数字/字符串、Date 与年份的比较逻辑。

## 背景
- 变更值比较逻辑分散在各变更详情页，需集中到 changeCompare.js 统一管理。

## 解决方案
- 新增 src/utils/changeCompare.js，提供 isChangeValueEqual 统一处理：数字 vs 字符串（如 2020 vs "2020"）→ 字符串比较；Date vs 年份值 → 按年份比较；完整日期 vs Date → 格式化为 YYYY-MM-DD 后比较；对象/数组 → 仍用 lodash.isEqual。
- main.js 的 isShowModify 改为调用 isChangeValueEqual，各变更页（propertychange、buildingchange、projectchange 等）无需再单独写比较逻辑。
- propertychange/detail.vue 回退建造年份专项代码，仅保留 parseBeforeChangeData 用于解析后端 JSON 字符串格式的 beforeChangeData。

## 验证与归属
- 验证证据：extracted source=cursor project=兴化物管
- 来源会话：efb19730-94e6-49b0-b515-a5225a01129c
- 验证证据：cursor 会话 efb19730-94e6-49b0-b515-a5225a01129c（兴化物管）。
- 涉及文件：src/utils/changeCompare.js、src/main.js、propertychange/detail.vue、mixins/detailMixins.js、propertyProject/detail.vue、directives/form/index.js、api/estate/propertyChange.js、buildinginfo/changeDetail.vue、project/projectinfo/changeDetail.vue。
- 所属项目：兴化物管 zhi1-web-admin。


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "change_compare_js",
  "source_extraction_id": "9769ae46963547e4a96d7182fff41b5e",
  "version": 2,
  "memory_type": "entities"
}
-->