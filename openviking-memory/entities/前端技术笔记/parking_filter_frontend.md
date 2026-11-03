# 车位类型服务端筛选不可靠改前端
园区物管2.0 资产运营页原 parkingFilter 调用接口筛选因服务端不可靠失效，改为前端过滤。

## 现象与根因
- parkingFilter 变更调用接口筛选，服务端不可靠致筛选失效

## 解决方案
- getParkingSpaceList() 改为拉全量，删除 buildParkingListQueryParams 等
- buildParkingCategoryTableRows 用 matchParkingRowFilter 前端过滤
- tableRows 依赖 parkingFilter 重算并增强编码兜底匹配

## 验证与归属
- 验证证据：会话 c1dae8a0-fd64-44e9-b546-e8a29c03a844
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 所属项目：园区物管2.0；来源会话ID：c1dae8a0-fd64-44e9-b546-e8a29c03a844；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "parking_filter_frontend",
  "source_extraction_id": "6979dc0db6524b59bb6a0c5f048888aa",
  "version": 1,
  "memory_type": "entities"
}
-->