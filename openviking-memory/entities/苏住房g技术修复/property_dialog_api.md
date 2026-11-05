# 物业合同选择物业管理区域接口变更（苏住房G）
苏住房G 项目物业总公司账号在前期物业合同和物业合同新增时，选择物业管理区域弹窗接口已从 pageSelective 改为 page。

## 改动内容
- 文件：zhi2-web-admin/src/views/property/propertyContract/components/detail.vue
- 方法：handleOpenProjectDialog 中 SelectDialog.open 的 url 由 `/property/complexPropertyBid/page`（或 isDirect 判断）统一改为 `/property/complex/page`
- 请求参数未变，仍使用 complexId 作为 rowKey、complexName 作为筛选输入

## 涉及文件与归属
- 涉及：propertyContract/components/detail.vue、zs-select-dialog-func.vue
- 所属项目：苏住房G；来源会话：98cc2303-a6dc-46a0-878d-c6dfc0825641
- 验证证据：extracted source=cursor project=苏住房G；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "property_dialog_api",
  "source_extraction_id": "844da6df7be1401ea9be629d26f82d85",
  "version": 1,
  "memory_type": "entities"
}
-->