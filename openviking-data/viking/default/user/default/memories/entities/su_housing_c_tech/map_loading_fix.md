# 地图找房页面加载中交互
苏住房C小程序在地图找房页面新增加载中交互，避免连续请求时loading提前消失。

## 改动说明
- 在 getDetail() 请求地图数据时显示 uni.showLoading({ title: '加载中', mask: true })，数据返回后（含失败）在 finally 中关闭
- 用 _loadingDepth 计数，避免切换 Tab、筛选、缩放等连续触发请求时 loading 提前消失
- 在 onUnload 中确保离开页面时关闭 loading，防止残留

## 触发场景
- 首次进入地图
- 切换新房/二手房
- 筛选条件变更
- 地图缩放触发重新查询

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_main/houseMap/houseMap.vue
- 来源会话ID：847fc74e-eac0-4e4f-a137-c54ace36dd3e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "map_loading_fix",
  "source_extraction_id": "16730c0f2c094b93a4bc0dbabc7ca178",
  "version": 1,
  "memory_type": "entities"
}
-->