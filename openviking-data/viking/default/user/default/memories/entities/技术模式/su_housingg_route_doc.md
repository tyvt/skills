# 苏住房G路由文档精简
苏住房G 前端路由文档已按全量路由 JSON 与本地静态路由核对并精简，未改动代码。

## 主要调整
- 新增字典 `organ_type_all`，原字典 `orga` 相关条目被剔除
- 剔除既不在全量路由 JSON、也不在本地静态路由中的 3 处：`relatedUnitRecord/index.vue`、`relatedUnitRecord/detail.vue`、`maintenance/planBid/detail.vue`
- 保留静态路由相关项：`/companyRegister`→`companyInfo.vue`、`accountInfo.vue`；`/unitRegister`→`unitRegister.vue`

## 文档与验证
- 文档共 19 处改动，删除「路由 JSON 中未匹配」整节，新增「本地静态路由」说明
- 子组件因父页面在 JSON 中仍保留并标注「详情内嵌」
- 验证证据：extracted source=cursor project=苏住房G；来源会话：455456f0-90b2-47a3-b49f-b114ac5d4dbb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "su_housingg_route_doc",
  "source_extraction_id": "6b04e6e015814a66a41bd7e1214053d1",
  "version": 1,
  "memory_type": "entities"
}
-->