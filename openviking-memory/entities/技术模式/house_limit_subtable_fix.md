# 限制审核编辑子表消失因选中房屋未初始化
苏州市房地产监测V3房屋限制审核从查看切编辑态时子表消失，因选中房屋未初始化，已新增 hydrate 方法修复。

## 问题根因
- 查看切编辑态子表消失因 `selectedHouses` 为空且接口不返回 `houseList`
- 导致编辑态无法渲染已选房屋限制子表

## 修复方案
- `limitFormMixin.js` 新增 `hydrateSelectedHousesForEdit()` 复用 `houseLimitLineData` 或调 `fetchAllHouseLimitLines()` 填充
- 在 `formMode` 监听 `view→edit` 触发填充逻辑

## 涉及文件
- views/building/houseLimit/limitFormMixin.js、limitCancel.vue、limitAdd.vue
- mixins/detailMixins.js、src/main.js
- e2e/fixtures/house-limit-helpers.js、e2e/building/house-limit-list-detail.spec.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/079.md
- 来源会话：de78bf5d-ff1d-4c2d-b6b5-2faf54f81d39；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_subtable_fix",
  "source_extraction_id": "88ea79ae85784da2bf423cd701fea8a0",
  "version": 1,
  "memory_type": "entities"
}
-->