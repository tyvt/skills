
# 开户楼栋弹窗查询失效
维保开户模块中 OpeningBuildingDialog.vue 的 handleQuery 仅对内存 originData 做 filter，不发 listUrl 请求，表现为点查询没反应。

## 问题根因
- 原 handleQuery（代码行 440-466）仅在 originData 上做 filter，未向接口发请求，列表数据不完整、点击查询无响应

## 解决方案
- 新增 queryOriginData() 统一请求 this.listUrl 拉取数据
- checkChange() 改为调用 queryOriginData()，保持勾选树节点后仍走接口取数
- handleQuery() 改为：先重置分页；校验左侧是否已勾选节点（未勾选给出提示）；调用 queryOriginData() 发请求，携带 keyWord/purpose/hasElevator 查询条件
- 默认接口示例：/maintenance/openaccdtl/queryEnableAccHouseInfoByUnitIds

## 验证与归属
- 验证：打开弹窗先勾选左侧树节点，输入关键字或选筛选条件点查询，在 Network 看是否请求 listUrl
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/components/OpeningBuildingDialog.vue
- 所属项目：园区物管2.0（项目2-0）
- 验证证据：src=2-0/021.md
- 来源会话：d1b2d0b3-aa25-42eb-93c8-7a169f622410


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "opening_dialog_query",
  "source_extraction_id": "a549c01781a14f8d92d24a4948405f59",
  "version": 2,
  "memory_type": "entities"
}
-->