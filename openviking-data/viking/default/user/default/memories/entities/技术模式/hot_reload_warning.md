# 热重载未更新模板导致已删除属性警告
在项目 苏州市房地产监测V3 中，`detail.vue` 引用了已删除的计算属性 `cancelAttachmentView`；hot update 仅更新了 script，未更新 template，从而产生了警告。

## 问题根因
- `detail.vue` 的 template 引用了已合并/删除的计算属性 `cancelAttachmentView`
- hot reload (热更新) 仅刷新了 script，未刷新 template，触发了警告

## 状态与解决方案
- 磁盘上的代码已正确使用 `cancelInfoView` 来渲染取消时间、原因和材料
- 无需任何更改

## 验证与归属
- 验证证据: extracted source=cursor session=5848dd5d-26a2-4051-b9fd-06eacdc8eee0
- 涉及文件: company/companyCancel/detail.vue, detail-template/detail-template.vue, companyManagement/components/AgencyBasicInfoForm.vue, presale/permitCancel/detail.vue, institution/agencyBranch/components/AgencyBranchDetail.vue, mixins/detailMixins.js, detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 5848dd5d-26a2-4051-b9fd-06eacdc8eee0; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "hot_reload_warning",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->