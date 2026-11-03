# 楼盘表API旧路径buildinginfo致400错
苏州市房地产监测V3 中楼盘表 API 请求使用旧基础路径 `/building/buildinginfo` 引发定金缴款弹窗等 400 错误。

## 问题根因
- 楼盘表 API 请求使用旧基础路径 `/building/buildinginfo`
- 引发定金缴款弹窗等 400 错误

## 解决方案
- 将 `buildinginfo.js`、`unitinfo.js`、`BuildingDialog.vue` 等 17 个文件中 25 处 URL 引用统一替换为 `/building/building`
- `路由信息.json` 及子路径 `listNofenye` 等保留未动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/118.md
- 涉及文件：路由信息.json、CashsaleDetail.vue、2026-09-11.md、前端技术信息.md、buildinginfo.js、unitinfo.js、BuildingDialog.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：b46a5433-8dbe-4b79-a009-979887275173；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_api_path_fix",
  "source_extraction_id": "43a56e1135f54aee8434303afd94ddab",
  "version": 1,
  "memory_type": "entities"
}
-->