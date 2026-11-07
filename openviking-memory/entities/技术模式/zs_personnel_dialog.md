# 园区物管2.0 从业人员负责人弹窗选择
园区物管2.0 采用 zs-select-dialog-func 实现与「物业服务企业」类似的负责人弹窗选择，接口为 /company/personnelRecord/page。

## 交互与禁用
- 外层可点击区域 + zs-input（pointer-events: none），带搜索图标、可清空。
- 占位符：未选企业提示先选企业，已选企业提示点击选择负责人。
- isPersonnelLeaderDialogDisabled：解聘终止或未选企业（无 companyRecordId）时禁用。

## 方法与提交
- handleOpenPersonnelDialog 调用 SelectDialog.open，url 为 /company/personnelRecord/page，filterParams 仅传 companyRecordId。
- 选择后写入 companyLeaderName、companyLeaderPhone，与同项目「财务负责人」等从业人员选择一致。
- clearCompanyLeader 清空负责人姓名与电话。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：components/zs-select-dialog/zs-select-dialog-func.vue、property/propertyContract/components/detail.vue。
- 所属项目：园区物管2.0；来源会话：ad936249-80e2-4ff9-b8bd-66d0f776406d；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_personnel_dialog",
  "source_extraction_id": "1ded6c3f5a284e6eaec4d40de8a84dd5",
  "version": 1,
  "memory_type": "entities"
}
-->