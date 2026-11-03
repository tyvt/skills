# 开户楼栋弹窗查询失效
OpeningBuildingDialog的handleQuery仅对内存originData做filter，不会发listUrl请求，表现为点查询没反应。

## 问题根因
- 本地filter逻辑（keyWord/purpose/hasElevator）未触发网络请求，导致查询无响应。

## 解决方案
- 抽出queryOriginData()统一请求listUrl；checkChange勾选后仍调该方法；handleQuery重置分页、校验左侧已勾选节点，再带条件调用queryOriginData。
- 默认接口示例：/maintenance/openaccdtl/queryEnableAccHouseInfoByUnitIds

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/components/OpeningBuildingDialog.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：d1b2d0b3-aa25-42eb-93c8-7a169f622410

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "opening_dialog_query",
  "source_extraction_id": "b6e7b8a9944344a097a575400ce2397e",
  "version": 1,
  "memory_type": "entities"
}
-->