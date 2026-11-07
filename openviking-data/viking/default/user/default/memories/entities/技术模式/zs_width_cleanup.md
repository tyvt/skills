# zs 列组件列宽属性清理
苏州市房地产监测V3 项目中清理 zs 系列列组件的硬编码列宽属性，统一由组件自适应。

## 清理范围
- `zs-operate-column` 修改 70 个文件、删除 73 处列宽属性（含 `width` 与 `:width` 绑定，如 `:width="operateColumnWidth"`、`:width="type == 1 ? 200 : 180"`）。
- 全局排查 `src` 下：zs-table-column 出现 3835 次、445 处带宽度的标签已删（上一轮）；zs-operate-column 出现 487 次、73 处已删；zs-select-column 出现 463 次、1 处未动；状态列组件无列宽无需处理。
- 累计 diff：176 文件，+719 / −602，仍在 `zhi2-web-admin` 工作区未提交。

## 待确认项
- `src/views/solicitation/components/maintenanceApplyTable.vue` 两处待用户决定。

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：`src/views/solicitation/components/maintenanceApplyTable.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：da4f3fca-c76a-4d06-8455-42d229e5426f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_width_cleanup",
  "source_extraction_id": "393ff4b197654fe9a049ff3d076ab662",
  "version": 1,
  "memory_type": "entities"
}
-->