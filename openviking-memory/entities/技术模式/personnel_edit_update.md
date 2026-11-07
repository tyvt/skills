# 从业人员编辑统一使用update接口
苏州市房地产监测V3 项目调整从业人员编辑规则：仅待提交（bizState==='0'）可编辑，编辑接口统一走 `/company/personnelRecord/update`。

## 前端调整
- 企业端 `toB/personnelRecord`：详情页/列表「编辑」按钮仅 `bizState === '0'` 显示；移除 `allow-edit-when-recorded`，保存前校验非待提交状态并提示
- 管理端 `staffManagement`：详情页「编辑」仅限待提交；列表「编辑」增加 `bizState === '0'` 可见性限制；`editRequest` 对非待提交状态直接拦截

## 测试与验证
- E2E 用例 08b / 10 从「已备案可编辑」改为「已备案不可编辑」，断言详情页和列表页均无「编辑」按钮
- 两套全流程用例均已通过（11 + 4 项）

## 涉及文件与归属
- `zhi2-web-admin/src/api/company/personnelRecord.js`、`toB/personnelRecord/components/detail.vue`、`company/staffManagement/components/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：0346d640-687b-4a1c-9bec-71a1eee36694

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_edit_update",
  "source_extraction_id": "2fe7eac52e9242108067236bba5afb01",
  "version": 1,
  "memory_type": "entities"
}
-->
