# uni-app H5 地图 Key 配置修复
无锡市区小程序嵌入 H5 中 uni-app H5 地图初始化报 `Map key not configured` 的根因与修复方式。

## 根本原因
- H5 地图在 `loadMaps` 里通过 `getMapInfo()` 读取 `__uniConfig.qqMapKey`（构建时从 manifest 写入）
- 之前仅修改 `__uniConfig.h5.sdkConfigs.maps.qqmap.key`，`<map>` 组件不读该字段，导致 key 仍空报错
- 接口 `qq.map.key` 有值可使 `localSearch` 正常，但 `__uniConfig.qqMapKey` 空仍报控制台错

## 修复方案
- `qqMapKey.js`：注入时设置 `__uniConfig.qqMapKey = key`（H5 地图真正使用的字段）
- `ZsMap.vue`：增加 `:key="qqMapRenderKey"`，在 key 首次就绪后强制重新挂载 `<map>` 避免失败缓存
- 重新编译/刷新 H5 后打开小区详情页验证；若仍报错确认腾讯位置服务 key 已配 WebService API 与 JavaScript API 且 H5 域合法

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/utils/qqMapKey.js、src/pages_owner/project/info/index.vue、ZsMap.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：46dc639b-2c8b-48cf-aa77-f5de1880b71b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "qqmap_key_fix",
  "source_extraction_id": "b17238a633cf40de87c63c276c47e01c",
  "version": 1,
  "memory_type": "entities"
}
-->