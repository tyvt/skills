# 楼盘表 API 路径迁移
苏州市房地产监测V3 中将全部 /building/buildinginfo 基础路径统一替换为 /building/building，共修改 17 个文件 25 处引用。

## 变更摘要
- API 层：buildinginfo.js（7 处）、unitinfo.js（1 处）
- 定金缴款（截图 400 报错）：BuildingDialog.vue → /building/building/listNofenye
- 其他业务组件：监管协议、进度管理、解封保证金、楼幢管理等 13 个 Vue 文件
- 流程配置：路由信息.json 中 approval/submit API

## 未改动项
- 子路径名如 listNofenye、buildinginfo1/add、xyBuilding 等
- 前端目录 projectManagement/buildinginfo/
- building/buildingChange/* 变更模块

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：buildinginfo.js、unitinfo.js、BuildingDialog.vue、路由信息.json
- 所属项目：苏州市房地产监测V3；来源会话：b46a5433-8dbe-4b79-a009-979887275173；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildinginfo_api_migration",
  "source_extraction_id": "58c7810a01c34e9fa51dcebb81c6c582",
  "version": 1,
  "memory_type": "entities"
}
-->