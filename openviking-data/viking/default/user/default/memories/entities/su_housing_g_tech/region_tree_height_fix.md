# 物业管理区域页面高度计算修复
苏住房G项目修复了物业管理区域页面在奇安信可信浏览器中因高度计算错误导致表格仅显示约4行的问题。

## 问题根因
- getBottomSafeInset() 在容器未撑满视口时，会把「容器下方到视口底部的空白」也扣掉
- 首次进入时 flex 链路未稳定，list-container 高度偏小留有大量空白，导致算出约4行
- 刷新后容器撑满显示正常

## 修复内容
- RegionTreeLayout：JS动态设置容器高度，按实际位置计算（window.innerHeight - listContainer.top - 8），0~3000ms内多次同步
- zs-table：移除错误的 gapBelowContainer 扣减，新增 getFillHeightFromContainerBounds()，分页未显示时预留52px，取三种算法最大值

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话：284420f4-9651-4522-a204-e61d73fc5079；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "region_tree_height_fix",
  "source_extraction_id": "51d4b7a1bb0c40548955037bb74a267b",
  "version": 1,
  "memory_type": "entities"
}
-->