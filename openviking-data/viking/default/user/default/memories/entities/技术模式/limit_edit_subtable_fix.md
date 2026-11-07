# 限制审核详情编辑子表消失修复
苏州市房地产监测V3 修复了「限制审核详情」从查看态切到编辑态后子表显示「暂无数据」的问题。

## 问题原因
- 查看态子表走 `houseLimitLineData`（分页 API），编辑态走 `selectedHouses`
- 从查看切到编辑时 `selectedHouses` 仍为空，且 `projectLimit/detail` 通常不返回 `houseList`

## 修复要点
- `limitFormMixin.js` 新增 `hydrateSelectedHousesForEdit()`，按优先级填充 `selectedHouses`：已有数据跳过、查看态已加载全量复用 `houseLimitLineData`、否则调用 `fetchAllHouseLimitLines()` 拉取全量
- 抽取 `getHouseLimitLineApiUrl`、`applySelectedHousesFromLines` 等辅助方法，解除限制模式同步填充 `limitRecordsByHouse`
- `formMode` watcher 在 `view → edit` 时触发 hydrate

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`limitFormMixin.js`、`house-limit-audit.spec.js`
- 来源会话：de78bf5d-ff1d-4c2d-b6b5-2faf54f81d39

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "limit_edit_subtable_fix",
  "source_extraction_id": "1b78f2ac900543eeacc8a52008582c1e",
  "version": 1,
  "memory_type": "entities"
}
-->