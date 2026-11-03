# 腾讯地图 Key 禁止硬编码
园区物管2.0 后台所有腾讯地图 Key 统一经 /system/config/getByKey/qq.map.key 接口获取，禁止硬编码。

## 问题背景
- 原本硬编码 Key 在前端代码，换 Key 或按环境隔离需逐文件改，且不安全无法按环境切换。

## 解决方案
- 使用 src/utils/tencentMapKey.js 的 fetchTencentMapKey()，内部 GET 该接口并做内存缓存，未配置抛明确错误。
- mapLoader.js 未传 ak 时自动走该函数，业务组件一律 await loadMap()/fetchTencentMapKey()，不再传 Key 也不再写死。
- 前置条件：后台系统配置已设置 qq.map.key，且 Key 同时开通 GL 地图与 WebServiceAPI 权限。

## 验证与归属
- 验证：新增 tencentMapKey.js 内存缓存，5 个消费文件去硬编码。
- 涉及文件：tencentMapKey.js、tencentDistrictBoundary.js、ZsTencentMap/mapLoader.js、ZsTencentMap/index.vue 等。
- 所属项目：园区物管2.0；来源会话 ff82edd2-0b07-45df-bdd1-a77d7b6c0d77；代码基线 7fe15a8cb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_map_key",
  "source_extraction_id": "2079698ec51f42c99af5e0a35fcac0da",
  "version": 1,
  "memory_type": "entities"
}
-->