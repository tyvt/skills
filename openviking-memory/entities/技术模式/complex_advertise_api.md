# 物业管理区域查询详情广告位列表接口
苏住房G(zhi2-web-admin) 物业管理区域查询详情的广告位列表由子组件 `advertiseTable` 渲染，数据来自 `/benefit/pubAdvertiseSpace/page` 接口。
## 接口与参数
- 请求方式：`GET`；路径：`/benefit/pubAdvertiseSpace/page`（完整如 `/prod-api/benefit/pubAdvertiseSpace/page`）
- 参数：`pageNum`（默认1）、`pageSize`（默认10）、`projectId`（组件把当前 `complexId` 作为 `projectId` 传入）
- 示例：`GET /benefit/pubAdvertiseSpace/page?pageNum=1&pageSize=10&projectId=667599950328078`
## 代码位置
- advertiseTable.vue（约 44:46 行发起请求），mixins/table.js（约 273:280 行）
- publicQuery/complex/index.vue、publicQuery/complex/detail.vue
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话：412004c0-e9c3-4f85-9196-c4db04c58e93；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_advertise_api",
  "source_extraction_id": "048951ab304943a585dc23187ac29bde",
  "version": 1,
  "memory_type": "entities"
}
-->