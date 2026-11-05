# 车位类型服务端筛选不可靠改前端
园区物管2.0 资产运营页原 parkingFilter 调用接口筛选因服务端不可靠失效，改为前端过滤。

## 现象与根因
- parkingFilter 变更调用接口筛选，服务端不可靠或与前端选项不一致致筛选失效

## 解决方案
- getParkingSpaceList() 改为只拉全量，不再传筛选参数
- 删除服务端筛选逻辑：buildParkingListQueryParams、parkingListServerFiltered、parkingFilter 的 watcher（不再因筛选变更重新请求）
- buildParkingCategoryTableRows 中通过 matchParkingRowFilter 前端过滤
- tableRows 计算属性显式依赖 parkingFilter，切换选项立即重算表格
- 匹配规则增强：字典未加载时用默认编码兜底（产权 1、公共 2 等），并同时支持字典编码与标签文本匹配

## 验证与归属
- 验证证据：会话 c1dae8a0-fd64-44e9-b546-e8a29c03a844
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 所属项目：园区物管2.0；来源会话ID：c1dae8a0-fd64-44e9-b546-e8a29c03a844；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "parking_filter_frontend",
  "source_extraction_id": "fb80bfca03ac4c659cad7642f8b60177",
  "version": 2,
  "memory_type": "entities"
}
-->