
# 物业合同选择物业管理区域接口变更（苏住房G）
苏住房G 项目物业总/分公司账号在前期物业合同和物业合同新增时，选择物业管理区域弹窗接口已从 pageSelective 改为 page，修复了跨公司数据可见的权限问题。

## 问题原因
- 前期物业合同选择物业管理区域时调用 `/property/complex/pageSelective`，该接口未按当前物业公司过滤数据，导致物业公司人员能看到其他公司的物业管理区域

## 改动内容
- 文件：zhi2-web-admin/src/views/property/propertyContract/components/detail.vue
- 方法：handleOpenProjectDialog（前期物业合同与物业合同共用该组件）
- 接口由 `v2.0/property/complex/pageSelective` 改为 `v2.0/property/complex/page`
- outParams、filterParams、columns 等参数保持不变
- 修改后，物业公司人员在选择物业管理区域时只能看到本企业有权限的区域

## 涉及文件与归属
- 涉及：propertyContract/components/detail.vue、zs-select-dialog-func.vue
- 所属项目：苏住房G；来源会话：98cc2303-a6dc-46a0-878d-c6dfc0825641、cc4f079f-88ee-4ef4-b39b-a0af7e710279
- 验证证据：extracted source=cursor project=苏住房G；代码基线：none
- 部署要求：重新部署前端后在测试环境验证


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "property_dialog_api",
  "source_extraction_id": "759fdfdefd9e43239155ff8624012ede",
  "version": 2,
  "memory_type": "entities"
}
-->