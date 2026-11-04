# 在员工备案中关联审批代码
企业端的 `detail.vue` 与 toB 实现保持一致，将审批业务代码 `cyryba`/`cyrybg` 绑定到 `operation-btn-group` 的 `:bus-code`，通过 `formMode` 和 `businessStatus` 控制按钮，并集成 `ApprovalProcess` 抽屉和变更单加载。

## 上下文
- 从业人员备案（从业人员备案）需要与 toB 实现保持一致

## 解决方案
- 将 `cyryba`/`cyrybg` 绑定到 `operation-btn-group` 的 `:bus-code`
- 通过 `formMode` 和 `businessStatus` 控制按钮
- 集成 `ApprovalProcess` 抽屉和变更单加载

## 验证与归属
- 涉及文件: company/staffManagement/components/detail.vue, components/OperationBtnGroup/index.vue, mixins/detailMixins.js, company/staffManagement/personnelRecord/detail.vue, mixins/form.js, toB/personnelRecord/components/detail.vue, mixins/formComponents.js, main.js
- 所属项目: 产品2.0; 来源: 035.md; 会话: 2f709dc5-4ae2-4b08-9df3-6698a076d982

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "staff_approval_code",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->