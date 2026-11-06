# 新增和删除使用公共配置方式
苏州市房地产监测V3 多个列表页已统一改为使用 mixin 公共的 addButton 与 multiDeleteButton 配置。

## 修改内容
- 移除自定义 `addButton`，直接使用 mixin 的 `addButton`；通过 `extraPerms` 映射权限为 `company:agencyBranch:edit`
- `operationButtons` 仅在 B 端且有 `companyRecordId` 时加入 `addButton`
- `operationButtons` 加入 mixin 的 `multiDeleteButton`；选择列 `:selectable="isSelectable"` 仅 `recordState === '0'`（未备案）可选
- `deleteRequest` 支持多条删除（接口为单 ID，批量时并行调用多次）；行内删除与批量删除共用 mixin 的 `handleDelete`
- `showButton` 控制编辑按钮显示（G 端隐藏、已注销隐藏）；删除重复 `handleQuery`/`resetQuery` 使用 mixin 默认实现

## 涉及文件
- `zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchList.vue`
- `zhi2-web-admin/src/views/property/workOrder/order/index.vue`
- `zhi2-web-admin/src/views/property/chargeManage/chargeItem/index.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：b02c7339-410a-4155-9af2-1dd4826ef29d
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_delete_cfg",
  "source_extraction_id": "ab3da10e36a44bd0aa5622239b14a9f5",
  "version": 1,
  "memory_type": "entities"
}
-->