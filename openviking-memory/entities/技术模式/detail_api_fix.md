# 全局 /detail 接口路径规范修复
苏州市房地产监测V3 项目排查并修复多个详情页自定义接口路径，统一走 mixin 默认或规范接口。

## 高优先级修复
- `benefit/pubManagementOrg/detail.vue`：删除自定义 `getDetail()`，改用 mixin + `detailApiFull`；保存改 `POST .../add`、`POST .../update`
- `cbyh/components/YhwdTable.vue`：删除接口改调 `delYhwdgl()` → `POST /prefund/bankBranch/delete`

## 中优先级修复
- `maintenance/apply/components/TripartiteDialog.vue`：详情 `POST ${url}/detail`，body 含动态主键字段
- `maintenance/planBid/components/repairItemDialog.vue`：详情 `POST /maintenance/planCorStdItem/detail`，更新 `POST .../update`
- `indemnity/product/detail.vue`：删除 `getProductById/${id}` 自定义逻辑，走 mixin 默认

## 验证与归属
- 全局 `/detail` 规范排查与修复已完成
- 所属项目：苏州市房地产监测V3；来源会话ID：5f12d6ca-c193-45eb-984f-d206aaa583d3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_api_fix",
  "source_extraction_id": "fd6dce0e4752429b8b3fdac526a80eeb",
  "version": 1,
  "memory_type": "entities"
}
-->