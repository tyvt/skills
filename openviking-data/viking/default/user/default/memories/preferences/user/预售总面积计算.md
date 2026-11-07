- 楼栋的“预售总面积”在前端根据房屋数据求和，不再使用 API 的 `totalArea`/`houseArea` 字段。
- `permitConstants.js` 使用 `sumPresaleHouseAreas` 并封装 `resolvePresaleHouseFloorArea` 等；通过 `@/utils/calculation` 中的 `add` 进行累加，保留 2 位小数以避免浮点错误。
- `PresaleBuildingTable.vue` 调用 `computePresaleBuildingHouseArea(row, houses)`，传入接收到的 `houses` 以渲染“预售总面积”列。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 预售总面积计算",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 2,
  "memory_type": "preferences"
}
-->
