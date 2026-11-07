# apiV3Normalize 参数键映射优先级
产品2.0 前端 apiV3Normalize 对能被后缀规则（ByXxx/ById）推断覆盖的动作名，参数键映射须放 ACTION_PARAM_KEY_OVERRIDES 而非 ACTION_PATH_PARAM_KEYS。

## 问题现象
- system/config/getByKey 接口前端把参数包成 { key: 'qq.map.key' }，后端要 configKey，接口 400/参数为空
- apiV3Normalize 路径动作解析先按「ByKey 后缀规则」把 getByKey 推断成动作 key、参数键推断为 key，优先级高于 ACTION_PATH_PARAM_KEYS 表

## 解决方案
- 把映射加进优先级更高的 ACTION_PARAM_KEY_OVERRIDES（与 listHouseGroupByFloor: 'buildingId' 同表），如 getByKey: 'configKey'
- 改后请求体正确输出 { configKey: 'qq.map.key' }
- 教训：凡能被后缀规则先行推断覆盖的动作名，一律放 OVERRIDES 表，放 PATH_PARAM_KEYS 会被静默忽略

## 涉及与来源
- 涉及文件：zhi2-web-admin/src/utils/apiV3Normalize.js（76-81行）、zhi2-web-admin/src/api/system/config.js
- 所属项目：产品2.0；来源会话：8dceac0c-7274-47ed-980f-09eb44a4fd17；代码基线：39e3114

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apiv3_normalize_overrides",
  "source_extraction_id": "539ec7c1bcb244a59f86e9efe4783557",
  "version": 1,
  "memory_type": "entities"
}
-->
