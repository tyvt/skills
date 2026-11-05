# 腾讯地图 Key 统一接口获取
园区物管2.0 中所有腾讯地图 Key 统一通过 `/system/config/getByKey/qq.map.key` 接口获取，不再硬编码。

## 新增工具
- `src/utils/tencentMapKey.js` 提供 `fetchTencentMapKey()`
- 调用 `GET /system/config/getByKey/qq.map.key`
- 结果内存缓存，避免重复请求
- 未配置时抛出明确错误

## 改造范围
- tencentDistrictBoundary.js：行政区划 WebService 请求改为 `await fetchTencentMapKey()`
- mapLoader.js：未传 `ak` 时自动从接口取 Key
- ZsTencentMap/index.vue：`loadMap()` 去掉硬编码 Key
- statisticsMap/components/map.vue：GL 地图与区划边界均走接口 Key
- mapProperty/index.vue：同上
- homeInfoDisplay/index.vue：同上（原 `OB4BZ-...` 也改为统一配置）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/utils/tencentMapKey.js、tencentDistrictBoundary.js、mapLoader.js、ZsTencentMap/index.vue
- 所属项目：园区物管2.0；来源会话ID：ff82edd2-0b07-45df-bdd1-a77d7b6c0d77；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "腾讯地图Key统一获取",
  "source_extraction_id": "b6f1ddc484254c13960ed58672e6cb01",
  "version": 1,
  "memory_type": "entities"
}
-->