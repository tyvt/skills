# 投票项表格权限字符缺失
园区物管2.0 中 VotingItemsTable 的两个按钮未配置有效权限字符，导致 zs-operate-column 拼接权限时可能无限制。

## 现象与根因
- VotingItemsTable.vue 中 viewDecisionDetailButton 与 resultButton 均只写 permission: true，未配置 permissionType。
- zs-operate-column 按规则拼接权限字符，缺少 permissionType 时无法正确校验按钮权限。

## 解决方案
- 需为两个按钮补充 permissionType 字段以接入权限校验（当前代码未配置）。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/autonomy/multiply/components/VotingItemsTable.vue、zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue、multiply/detail.vue。
- 所属项目：园区物管2.0；来源会话：7136a5c8-1c00-4f90-aefc-bd46f28f354f；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voting_table_permission",
  "source_extraction_id": "175779f5800742d9a6b6bf5fa413e19e",
  "version": 1,
  "memory_type": "entities"
}
-->