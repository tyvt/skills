# 服务方案面板卡死修复
苏州市房地产监测V3 中修复新增服务方案弹窗卡死问题，根因为双向 watch 死循环与表单嵌套。

## 问题根因
- `ServiceSchemePanel.vue` 里 `value` 和 `innerList` 互相监听：`innerList` 变化 → `$emit('input')` → 父组件更新 `schemeList` → `value` watch 触发 → 再次赋值 `innerList`，循环往复页面卡死
- `AgencyBranchDetail.vue` 中 `ServiceSchemePanel` 嵌套在父级 `zs-form` 内，打开「新增服务方案」弹窗时易触发浏览器异常行为

## 修复内容
- `ServiceSchemePanel.vue` 对齐 `EducationTable` 做法：去掉 `innerList` 的 deep watch，仅在新增/编辑/删除时通过 `emitChange()` 同步数据
- `AgencyBranchDetail.vue` 将 `ServiceSchemePanel` 移到父级 `zs-form` 外面，避免表单嵌套

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/institution/agencyBranch/components/ServiceSchemePanel.vue、AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：98c0fa61-1285-419f-a294-44b52af2945d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_scheme_fix",
  "source_extraction_id": "5a1c9d8cba0942b0ae2e08105e857a64",
  "version": 1,
  "memory_type": "entities"
}
-->