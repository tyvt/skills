# 动态菜单 loadView 路径兼容映射
后端下发的路由 component 字符串与前端 views 目录迁移改名不一致时，在 permission.js 的 loadView 增加旧路径到新路径的兼容映射表。
## 问题背景
- 后端路由 component 如 property/propertyManagementHouseDetail/index，前端 views 已改名，import.meta.glob 映射失败报 `[permission] loadView 未找到组件`。
## 解决方案
- 在 permission.js 的 loadView 增加「后端旧路径 → 前端新路径」映射表。
- 日志输出 `原始 => 归一化后` 便于补映射。
- 本批示例：houseInstructionExt/index→instruction/index；propertyHandoverInspectionRange/index→handover/index；propertyManagementHouseDetail/index→propertyManagementHouseConfirm/index。
## 验证与归属
- 验证证据：会话 9a9d1373 三条缺失组件经 loadView 兼容映射修复；src=2-0/017.md。
- 涉及文件：zhi2-web-admin/src/store/modules/permission.js；所属项目：2-0；来源会话ID：9a9d1373-b7fc-470f-b1c6-c3488fb59dc9；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "loadview_path_mapping",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 3,
  "memory_type": "entities"
}
-->