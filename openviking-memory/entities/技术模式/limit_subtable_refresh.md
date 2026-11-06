# 限制单据保存后子表不刷新修复
苏州市房地产监测V3 修复了限制单据保存后子表不刷新的问题，变更集中在 `limitFormMixin.js`。

## 修改要点
- `limitFormMixin.js` 新增 `syncSelectedHousesFromSubTablePage()`：编辑态在 `detail` 未返回 `houseList` 时，调用子表分页接口回填数据
- 限制接口：`POST /building/houseLimit/page`；解除接口：`POST /building/houseLimit/pageLimitRemoval`，解除限制会同步重建 `limitRecordsByHouse`
- 调整 `detailCallback`：仅当 `houseList.length > 0` 时才覆盖 `selectedHouses`，避免空数组清空本地数据
- 查看态仍走 `loadHouseLimitLines()`；编辑态且无有效 `houseList` 时调用 `syncSelectedHousesFromSubTablePage()`
- 加固 `projectLimitSaveCallback`：首次保存后在 `$nextTick` 中显式 sync

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`limitFormMixin.js`、`house-limit-helpers.js`
- 来源会话：f7ff995f-0339-4200-9550-e6b17381deaf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "limit_subtable_refresh",
  "source_extraction_id": "a713c3405a0b43ccbbf1e5e1e8b62543",
  "version": 1,
  "memory_type": "entities"
}
-->