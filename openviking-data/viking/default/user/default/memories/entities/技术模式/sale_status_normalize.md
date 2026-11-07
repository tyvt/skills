# 房屋销售状态的规范化
在苏州市房地产监测V3的house-limit模块中，房产数据存在重复的字段`saleStatus`和`sale_status`；`houseLimitConstants.js`中的`resolveHouseSaleStatus`统一了来源，以使`dict-tag`显示和`isHouseSelectable`禁用逻辑保持一致。

## 变更点
- `houseLimitConstants.js`添加`resolveHouseSaleStatus`，逻辑为`saleStatus ?? sale_status`
- `isHouseSold`和`normalizeHouseLimitLineRow`调用`resolveHouseSaleStatus`
- `HouseSelectDialog.normalizeHouse`记录规范化后的`saleStatus`
- 保留现有的`el-form-item`提示，不改变业务结构

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f742546b-5fa1-4c38-be7c-f50d9d083f69
- 验证: src=苏州市房地产监测V3/172.md; src=苏州市房地产监测V3-rest/149.md
- 涉及文件: HouseSelectDialog.vue, houseLimitConstants.js, detail.vue, limitFormMixin.js, limitAdd.vue, HouseLimitFloorSelectGrid.vue, limitCancel.vue
- 源会话: f742546b-5fa1-4c38-be7c-f50d9d083f69; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sale_status_normalize",
  "source_extraction_id": "3815f0545ae74fae8287a1e94503770d",
  "version": 2,
  "memory_type": "entities"
}
-->