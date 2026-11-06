# 现售楼幢删除调后端接口修复
苏州市房地产监测V3 修复现售楼幢删除不调后端接口问题，新增回调与持久化逻辑。

## 修改内容
- `PresaleBuildingTable.vue`：新增可选回调 `onRemoveBuilding`、`onBatchRemoveBuildings`；有回调时先 `await` 回调成功再提示「删除成功」，无回调时保持原逻辑 `emit('remove')`（预售许可模块不受影响）；批量删除只触发一次回调避免多次 save
- `PresaleBuildingSection.vue`：透传上述两个回调 props
- `CashsaleDetail.vue`：新增 `removeBuildingsPersist` / `removeSingleBuilding`；已保存单据（有 `cashsaleRecordId`）删除后调用 `POST /presale/cashsale/save` 再 `getDetail()` 刷新；新增草稿仅更新本地 `selectedBuildings` 和 `form.houses` 不调接口；至少保留一幢楼幢的校验保留

## 验证方式
- 打开 `bizState=0` 的已保存现售/转现售单据（编辑态），在「现售楼幢列表」点「删除」并确认，Network 应出现 `POST /presale/cashsale/save`

## 归属
- 所属项目：苏州市房地产监测V3
- 来源会话：2ac50d8d-bb50-456a-a40f-2c8538421516

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_building_fix",
  "source_extraction_id": "006d2482687443a7a80ce2847fa57669",
  "version": 1,
  "memory_type": "entities"
}
-->