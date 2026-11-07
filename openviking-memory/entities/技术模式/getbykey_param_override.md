# apiV3Normalize getByKey 参数名覆盖修复
产品2.0 中 `getByKey` 接口请求体参数名错误，原因是 `ByKey` 规则优先将其推断为 `key`，`ACTION_PATH_PARAM_KEYS` 里的 `getByKey: 'configKey'` 映射走不到。

## 问题根因
- `getByKey` 会先被 `ByKey` 规则推断成 `key`，导致 `ACTION_PATH_PARAM_KEYS` 里的 `getByKey: 'configKey'` 映射根本走不到，请求体参数名错误

## 修复方案
- 将映射加到优先级更高的 `ACTION_PARAM_KEY_OVERRIDES`：`getByKey: 'configKey'`，其他如 listHouseGroupByFloor: 'buildingId'、getContentDetailById: 'complexServiceDetailId'、getPatrolPackage4ManageById: 'patrolPackageId'
- 验证后请求体变为 `{"configKey": "qq.map.key"}`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：请刷新页面或重启 dev server 后再试
- 涉及文件：src/utils/apiV3Normalize.js、src/api/system/config.js、src/utils/tencentMapKey.js
- 所属项目：产品2.0；来源会话：8dceac0c-7274-47ed-980f-09eb44a4fd17；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getbykey_param_override",
  "source_extraction_id": "d70fba0bcec84f65b76e0f60a1dcc6b0",
  "version": 1,
  "memory_type": "entities"
}
-->