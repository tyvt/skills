# 组织工作人员详情回退BusinessType跳转改动
园区公共收益项目因「组织名称」出现可点击小手图标等问题，回退了 ownerCommitteeWorker 详情中与 BusinessType / 组织跳转相关的改动，保留字典展示修复。

## 回退内容
- `ownerCommitteeWorker/detail.vue`：移除 `committeeVersionId` 字段及相关逻辑
- `goToOrganizationDetail` 恢复为使用 `committeeId` 跳转
- `openOwnerDialog` 恢复 `rowKey: 'committeeId'`
- `applyRoutePrefill`、`handleBusinessTypeChange` 恢复为原实现
- `record/components/detail.vue` 与 `directDetail.vue`：`goCreateCommitteeWorker` 中移除 `committeeVersionId` 参数

## 保留改动
- `detailCallback` 中将 `status`、`jobType`、`sex` 等字典字段转为字符串（临时修复「当前状态」显示数字）
- `statusOptions` 增加 `|| []` 兜底
- 未提交 diff 仅包含上述字典展示相关修复

## 验证与归属
- 涉及文件：ownerCommitteeWorker/detail.vue、record/components/detail.vue、directDetail.vue、record/components/enums.js、detail-template.vue
- 所属项目：园区公共收益；来源会话：dd85a874-0175-478e-81cc-c4afa02d3b86

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_orgworker_btrevert",
  "source_extraction_id": "93a5e0f6073340f5b3a64c98e6f38a8e",
  "version": 1,
  "memory_type": "entities"
}
-->