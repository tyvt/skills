# 服务方案页双向监听与表单嵌套致卡死
苏州市房地产监测V3 中 `ServiceSchemePanel.vue` 双向监听与 `zs-form` 嵌套导致页面卡死异常。

## 问题根因
- `ServiceSchemePanel.vue` 中 `value` 与 `innerList` 互相监听形成死循环
- `AgencyBranchDetail.vue` 嵌套 `zs-form` 引发异常

## 解决方案
- 移除 `innerList` deep watch 并改用 `emitChange()` 同步
- 将面板移出父级 `zs-form` 避免嵌套异常

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/048.md
- 涉及文件：institution/agencyBranch/components/ServiceSchemePanel.vue、AgencyBranchDetail.vue、agencyPersonnel/components/EducationTable.vue、agencyBranch/components/CancelDialog.vue、e2e/institution/agency-branch-flow.spec.js 等
- 所属项目：苏州市房地产监测V3；来源会话：98c0fa61-1285-419f-a294-44b52af2945d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scheme_panel_watch",
  "source_extraction_id": "21c871f3e04343d18fdcbf2dc8406ff6",
  "version": 1,
  "memory_type": "entities"
}
-->