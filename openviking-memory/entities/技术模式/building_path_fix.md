# 楼盘表API旧路径buildinginfo致400修复
苏州市房地产监测V3 中楼盘表API基础路径未统一致请求400错误，已批量替换路径修复。

## 问题根因
- 原 `/building/buildinginfo` 基础路径未统一致 `BuildingDialog.vue` 定金缴款等请求400错误

## 修复方案
- 修改17文件25处URL，将基础路径替换为 `/building/building`
- 子路径如 `listNofenye`、`buildingChange/*` 与前端目录 `projectManagement/buildinginfo/` 保持不变

## 涉及文件
- `buildinginfo.js`
- `unitinfo.js`
- `BuildingDialog.vue`
- `路由信息.json`
- `CashsaleDetail.vue`
- `.workbuddy/memory/2026-09-11.md`
- `前端技术信息.md`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/162.md
- 来源会话ID：b46a5433-8dbe-4b79-a009-979887275173
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_path_fix",
  "source_extraction_id": "35936e6489bd44a1be5cd1e65794bc05",
  "version": 1,
  "memory_type": "entities"
}
-->