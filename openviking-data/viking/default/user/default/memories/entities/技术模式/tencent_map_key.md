# 腾讯地图 Key 禁止硬编码（园区物管2.0）
园区物管2.0 后台所有腾讯地图 Key 统一经 /system/config/getByKey/qq.map.key 接口获取，禁止硬编码。

## 问题背景
- 原本硬编码 Key 在前端代码，换 Key 或按环境隔离需逐文件改，且不安全无法按环境切换。

## 解决方案
- 使用 src/utils/tencentMapKey.js 的 fetchTencentMapKey()，内部 GET /system/config/getByKey/qq.map.key 并做内存缓存，未配置抛明确错误。
- mapLoader.js 未传 ak 时自动走该函数，业务组件一律 await loadMap()/fetchTencentMapKey()，不再传 Key 也不再写死。
- 前置条件：后台系统配置已设置 qq.map.key，且 Key 同时开通 GL 地图与 WebServiceAPI 权限。

## 改造范围
- tencentDistrictBoundary.js：行政区划 WebService 请求改为 await fetchTencentMapKey()
- ZsTencentMap/mapLoader.js：未传 ak 时自动从接口取 Key
- ZsTencentMap/index.vue：loadMap() 去掉硬编码 Key
- statisticsMap/components/map.vue：GL 地图与区划边界均走接口 Key
- mapProperty/index.vue：同上
- homeInfoDisplay/index.vue：同上（原 OB4BZ-... 也改为统一配置）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：新增 tencentMapKey.js 内存缓存，多个消费文件去硬编码。
- 涉及文件：src/utils/tencentMapKey.js、tencentDistrictBoundary.js、ZsTencentMap/mapLoader.js、ZsTencentMap/index.vue、statisticsMap/components/map.vue、mapProperty/index.vue、homeInfoDisplay/index.vue 等。
- 所属项目：园区物管2.0；来源会话 ff82edd2-0b07-45df-bdd1-a77d7b6c0d77；代码基线 7fe15a8cb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_map_key",
  "source_extraction_id": "911474cd4feb42868c2d557caafc7cad",
  "version": 2,
  "memory_type": "entities"
}
-->