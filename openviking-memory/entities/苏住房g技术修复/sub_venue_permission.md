# 资源租赁合同备案子表删除按钮权限字符（苏住房G）
苏住房G 项目资源租赁合同备案页子表「删除」按钮的权限字符为 `benefit:pubRevenueContractVenue:remove`。

## 权限字符
- 操作列「删除」按钮权限字符：`benefit:pubRevenueContractVenue:remove`
- 表格上方批量「删除」按钮权限字符相同：`benefit:pubRevenueContractVenue:remove`
- 租赁申请（assetLeaseApply）页同一子表权限为 `benefit:pub...`（来源截断未完整）

## 判定依据
- subVenueTable.vue 在合同备案场景：`moduleName` 为 `benefit`，`businessName` 为 `pubRevenueContractVenue`（由 isRevenueContractFiling 判断）
- 删除按钮来自 table.js 的 deleteButton，`permissionType` 为 `remove`
- zs-operate-column 拼接规则：`${moduleName}:${businessName}:${permissionType}`

## 涉及文件与归属
- 涉及：resourcesLeaseContractFiling/detail.vue、subVenueTable.vue、table.js
- 所属项目：苏住房G；来源会话：377a0387-6012-4a87-a29a-27637c4098fa
- 验证证据：extracted source=cursor project=苏住房G；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "sub_venue_permission",
  "source_extraction_id": "844da6df7be1401ea9be629d26f82d85",
  "version": 1,
  "memory_type": "entities"
}
-->