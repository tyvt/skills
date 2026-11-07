# 路由守卫已移除getRegions调用
门户 zhi2-web-admin 已移除登录后基础数据加载中的 `common/getRegions` 调用及对应 action，因该接口持续返回 500 且无功能依赖。

## 改动要点
- `src/router/index.js:174-180` 路由守卫删除 `store.dispatch('common/getRegions')`，并从 `baseDataActionNames` 移除「行政区域列表」
- `src/store/modules/common.js` 删除无调用方的 `getRegions` action（内部即 `request('/system/region/list')`）

## 保留项
- `common.allAreas` state 与 `SET_ALL_AREAS` 未删，`src/formatters/index.js`、`benefit/**` 等 20+ 处仍在使用

## 验证与归属
- 失败请求 `GET /api/v2.0/system/region/list` 时序与守卫一致，删除后仅少一条报错请求，无功能回退
- 涉及文件：router/index.js、store/modules/common.js、formatters/index.js、transaction/transferDiscount/index.vue
- 所属项目：门户；来源会话ID：cdc17e3f-09bf-4fff-8fd3-2d66641390ae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "get_regions_removed",
  "source_extraction_id": "ab3dc4058bf14f468f2d04ac319f429d",
  "version": 1,
  "memory_type": "entities"
}
-->