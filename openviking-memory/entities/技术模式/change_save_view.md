# 变更单保存须改formMode为view退出编辑态
苏州市房地产监测V3 中变更单保存成功后未将路由 `formMode` 置 `view`，导致仍处编辑态。

## 问题根因
- 变更单保存成功分支未将 `formMode` 重置为 `view`
- 页面仍处编辑态，且可能存在重复调用 `loadChangeDetail`

## 关键修复
- `AgencyPersonnelDetail.vue` 与 `LeasePersonnelDetail.vue` 的 `handleSave` 成功分支通过 `$router.replace` 将 `formMode` 置 `view`
- 保留 `personnelRecordChangeId` 与 `changeActive`，移除 `loadChangeDetail` 重复调用
- 改由 `formMode` 监听拉取详情

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/103.md
- 涉及文件：institution/agencyPersonnelApply/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、company/staffManagement/components/detail.vue、institution/leasePersonnel/components/LeasePersonnelDetail.vue、main.js
- 所属项目：苏州市房地产监测V3；来源会话：01a16360-a5d9-70c5-a400-7674006fbdc1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_save_view",
  "source_extraction_id": "6b21eb3133284f8db9bc26155421bece",
  "version": 1,
  "memory_type": "entities"
}
-->