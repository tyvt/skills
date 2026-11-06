# 开发企业从业人员变更改为默认编辑
苏州市房地产监测V3 已将已备案从业人员详情的「变更」按钮改为「编辑」，并更新 E2E 用例跑通测试。

## 测试用例改动
- e2e/toB/company-personnel-flow.spec.js：07 列表断言显示「编辑」不显示「变更」；08/08b 新增提交备案+管理端审批；10 已备案详情验证「编辑」无「变更」并尝试保存；09 清理支持已备案「注销」；修复 06b 表单 flaky
- e2e/company/personnel-record.spec.js：新增 08b 已备案默认编辑；增加 assertPersonnelDetailNoChangeButton、clickDetailEditButton 辅助函数

## 前端补充
- ToB/管理端详情：已备案（bizState=2）保存时走 companyUpdatePersonnel

## 测试结果
- company-personnel-flow.spec.js：10 通过 1 跳过（test 10 保存）；personnel-record.spec.js 跑通

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：e2e/toB/company-personnel-flow.spec.js、e2e/company/personnel-record.spec.js、staffManagement/components/detail.vue、toB/personnelRecord/components/detail.vue、OperationBtnGroup/index.vue
- 来源会话ID：7cf9d7c3-1aa5-441c-b2af-a459deebc0b4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_personnel_edit",
  "source_extraction_id": "9ec3c07b17f34b9c98be7b3373038dfb",
  "version": 1,
  "memory_type": "entities"
}
-->