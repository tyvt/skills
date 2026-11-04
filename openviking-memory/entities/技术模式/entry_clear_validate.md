# 进编辑态业务范围清空校验避免飘红
苏州市房地产监测V3 中经纪/租赁机构进编辑态时业务范围为空会立刻飘红，需 clearValidate 处理。

## 问题背景
- 表单 UI 乱：必填校验修好后，业务范围为空时进入编辑态会立刻飘红

## 解决方案
- 在 `enterEntryNetworkEdit` 里补一次 `clearValidate()`，进入编辑时干净，点保存时照常拦截
- 若希望「进编辑就显示必填提示」，去掉那三行即可

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：AgencyEntryNetworkSections.vue、AgencyBasicInfoForm.vue、AgencyEntryNetworkAdminDetail.vue、DeveloperBasicInfoForm.vue、LeaseEntryNetworkSections.vue、AgencyEntryNetworkDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：session_ae7541320d3fcf746bb98572a4423d1b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entry_clear_validate",
  "source_extraction_id": "fcff1f14acef43488e3cda24084218b0",
  "version": 1,
  "memory_type": "entities"
}
-->