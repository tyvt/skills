# permission loadView 组件路径兼容映射
产品2.0 中 zhi2-web-admin 后端下发的动态路由 `component` 字符串（如 `property/houseInstructionExt/index`）在前端 `src/views` 下找不到同名页面（目录已改名/迁移），`loadView` 经 `import.meta.glob` 映射失败并打印 `loadView 未找到组件`。

## 问题根因
- 后端返回的动态路由 component 字符串与前端 views 实际路径不一致（前端目录改名/迁移）。
- `loadView` 通过 `import.meta.glob` 映射时匹配失败。

## 解决方案
- 在 `zhi2-web-admin/src/store/modules/permission.js` 的 `loadView` 增加「后端旧路径 → 前端新路径」兼容转换：
  - `property/houseInstructionExt/index` → `property/instruction/index`
  - `property/propertyHandoverInspectionRange/index` → `property/handover/index`
  - `property/propertyManagementHouseDetail/index` → `property/propertyManagementHouseConfirm/index`

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 9a9d1373 报 loadView 未找到组件；修复见 zhi2-web-admin/src/store/modules/permission.js。
- 涉及文件：zhi2-web-admin/src/store/modules/permission.js
- 所属项目：2-0；来源会话ID：9a9d1373-b7fc-470f-b1c6-c3488fb59dc9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permission_loadview_mapping",
  "source_extraction_id": "464ccee4c19e426fbb67c2365f53421a",
  "version": 1,
  "memory_type": "entities"
}
-->