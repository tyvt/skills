# 企业授权编辑禁用企业名称
苏住房G项目修复行业管理-用户及授权-企业授权编辑页企业名称可误修改问题。

## 修改文件
- zhi2-web-admin/src/views/company/userManagement/companyRecordAuth/detail.vue

## 修复效果
- 编辑模式下企业名称设为禁用，与统一社会信用代码、办公地址一致不可修改
- 新增模式仍可正常选择企业

## 验证与归属
- 所属项目：苏住房G；来源会话：e96ee884-e80d-4f80-a9e4-966848f80eb3
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_auth_edit_disable",
  "source_extraction_id": "6dfa41e409fd42828fcd0b8d43f5a968",
  "version": 1,
  "memory_type": "entities"
}
-->