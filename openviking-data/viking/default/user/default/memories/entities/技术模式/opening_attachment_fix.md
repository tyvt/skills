# 开业要件包4项附件配置展示
苏州市房地产监测V3 项目中，租赁入网/经纪机构详情附件区只保留开业 `030310` 的 4 个配置，注册同名项可回显。

## 展示逻辑
- 始终请求开业要件包（4 项配置），再请求注册要件包 `030300` 按配置名称对齐
- 开业项已有附件用开业自己的文件；开业项为空且注册同名项有文件则把注册附件填进开业配置格子回显
- 来自注册的回显在编辑态标记 `fileSource: '2'`，只看不改、不能重复上传/删除

## 提交校验
- 只校验开业包，并带 `fillFromBusCode: 030300`
- 营业执照、法人证件若注册已上传即视为开业必填已满足

## 涉及文件与归属
- 涉及文件：`LeaseEntryNetworkSections.vue`、`entryNetwork.js`、`AgencyEntryNetworkDetail.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "opening_attachment_fix",
  "source_extraction_id": "e1e0f290fc1e43a8b372bd273c07a27c",
  "version": 1,
  "memory_type": "entities"
}
-->