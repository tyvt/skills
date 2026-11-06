# 进度节点变更查询区业务状态替换
苏州市房地产监测V3 项目根据截图标注，将预售资金监管 → 工程进度 → 进度节点变更列表页查询区第三项由「楼幢号」改为「业务状态」。

## 修改要点
- 修改文件：`zhi2-web-admin/src/views/supervision/progress/change/index.vue`
- 查询参数：`buildingNo` → `bizState`，与表格列 `bizState` / 字典 `BIZ_STATE` 一致
- 表单项：文本输入改为下拉选择（选项来自 `getDicts('BIZ_STATE')`），写法同 `deposit/refund/index.vue`
- `initDict` 中 `delete` 路由搜索缓存里可能残留的 `buildingNo`，避免界面已无该项却仍带参查询
- 列表列「变更楼幢」未动，仅调整筛选条件

## 验证建议
- 打开进度节点变更列表，确认第三个条件为「业务状态」下拉
- 选择「已备案」「待提交」等状态后点查询，需后端 `/prefund/proChange/page` 支持 `bizState`

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/supervision/progress/change/index.vue`、`deposit/refund/index.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：b65fd427-ad7d-4029-a894-62e845206362；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "progress_query_bizstate",
  "source_extraction_id": "65263d182fe04a6393857312ef47263e",
  "version": 1,
  "memory_type": "entities"
}
-->