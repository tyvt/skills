# 预售选房弹窗分页截断修复
禅道 Bug #6382（苏州市房地产监测V3，子模块 zhi2-web-admin）修复新增合同选房弹窗 chooseHouseDialog.vue 因 pageSize 写死导致第 6 间房被切页、末行裁切的问题。

## 问题根因
- queryParams.pageSize 原写死 5，接口 /presale/houseInfo/queryHousesByBuildCode 按楼幢一次返回全量户室并忽略 pageNum
- 前端 paginateRows 将 6 间房 slice(0,5)，第 6 条（如 302）被切到第 2 页，首页看不到
- pageSizeRows 写死 5 与实际行数不一致，zs-table 按 5 行算高导致末行裁切

## 修复内容
- pageSize 由 5 改为 10，与父列表页 /pageSizes 约定一致
- pageSizeRows 改为 min(当前页实际行数, 每页条数) 消除末行裁切

## 涉及文件与对比
- 文件路径：zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- 同类弹窗 contractView/components/chooseHouseDialog.vue 用 pageSize:10 且不做切片，无此问题

## Git 与归属
- 子模块提交 b1994ac7c、父仓 358ba25，均已推 develop/v3.0.0
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "bug6382_pagesize_fix",
  "source_extraction_id": "e65400f9a964489fb6fd13a7b8747391",
  "version": 1,
  "memory_type": "entities"
}
-->