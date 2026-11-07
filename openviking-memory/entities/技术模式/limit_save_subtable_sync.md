# 保存限额后子表不更新
在限额编辑详情中，子表分页同步的缺失导致其在保存后不更新。

## 问题根因
- 编辑模式下的详情未返回 houseList 且未调用 `/building/houseLimit/page` 进行填充
- 保存回调未显式同步，导致子表未更新

## 修复
- `limitFormMixin.js` 新增了 `syncSelectedHousesFromSubTablePage()`，在 `$nextTick` 中调用
- `detailCallback` 仅当 `houseList.length > 0` 时覆盖 `selectedHouses`

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/088.md
- 涉及文件: stock/limit/detail.vue, building/houseLimit/limitFormMixin.js, limitAdd.vue, limitCancel.vue, houseLimitAudit/index.vue, mixins/detailMixins.js, mixins/form.js
- 会话: f7ff995f-0339-4200-9550-e6b17381deaf; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f7ff995f-0339-4200-9550-e6b17381deaf


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "limit_save_subtable_sync",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->
