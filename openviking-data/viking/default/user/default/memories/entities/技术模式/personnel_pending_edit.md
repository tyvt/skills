# 从业人员仅待提交态可编辑且统一update接口
苏州市房地产监测V3 中从业人员数据仅待提交态可编辑，编辑接口统一调用 `/company/personnelRecord/update`。

## 约束规则
- 仅 `bizState === '0'` 的从业人员数据可编辑
- 企业端 `toB/personnelRecord` 与管理端 `staffManagement` 均隐藏非待提交编辑入口并拦截请求
- 编辑接口统一调用 `/company/personnelRecord/update`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- E2E 用例断言已备案态无编辑按钮
- 验证证据：src=苏州市房地产监测V3-rest/005.md
- 涉及文件：zhi2-web-admin/src/api/company/personnelRecord.js、toB/personnelRecord/components/detail.vue、company/staffManagement/components/detail.vue、e2e/toB/company-personnel-flow.spec.js、e2e/company/personnel-record.spec.js、src/mixins/form.js、playwright.config.js
- 所属项目：苏州市房地产监测V3；来源会话：0346d640-687b-4a1c-9bec-71a1eee36694；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_pending_edit",
  "source_extraction_id": "644f7058dbcc4758a137abaf815b7f20",
  "version": 1,
  "memory_type": "entities"
}
-->