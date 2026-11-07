# 查询暂存后要件附件被清空
苏州市房地产监测V3 单页机构注册中，点击「查询」回填暂存单会导致本地已上传要件附件被清空。

## 问题根因
- 文件：`zhi2-web-admin/src/views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue`（578-625 行）
- 单页注册合并后，用户可在尚未关联 `companyRegisterId` 时先上传要件
- 点击「查询」回填暂存单时，`applyInitialRecord` 无条件调用 `loadAppendixPackage`，用服务端要件列表整体覆盖 `uploadedList` 与 `attachmentList`
- 导致本次会话内已上传且尚未随注册单持久化的附件从界面和提交载荷中消失

## 修复说明
- 多步流程中要件上传发生在获得 `companyRegisterId` 之后，故不出现该顺序；单页重构把上传与查询放在同一页，但未在加载暂存要件时合并或保留本地已上传记录

## 验证与归属
- 类别：LOGIC_BUG；严重度：medium
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：10959bb2-382a-4576-ba66-7d409fabf99d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "register_appendix_cleared",
  "source_extraction_id": "6677b5f047cc425687d16521ea64a021",
  "version": 1,
  "memory_type": "entities"
}
-->