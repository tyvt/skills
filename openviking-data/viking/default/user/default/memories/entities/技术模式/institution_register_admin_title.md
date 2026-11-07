# 经纪机构注册移除步骤二多余标题
苏州市房地产监测V3 的 zhi2-web-admin 中移除了经纪机构注册第 2 步下方重复的「管理员信息」区块标题。

## 改动内容
- 在 `zhi2-web-admin/src/views/institutionRegister/index.vue` 中删除第 2 步多余的 `<h2>管理员信息</h2>`，直接渲染 `Step2AdminInfo` 组件
- 顶部步骤条中的「管理员信息录入」文案保持不变
- 仅移除步骤条下方重复的区块标题，使第 2 步与第 3、4 步保持一致

## 涉及文件
- `zhi2-web-admin/src/views/institutionRegister/index.vue`
- `zhi2-web-admin/src/views/institutionRegister/components/Step2AdminInfo.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：e6a70106-1904-4b9e-9ff5-cc44b3452aa4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_register_admin_title",
  "source_extraction_id": "1ee14cf9ddb149ff99b2da177d5a4b29",
  "version": 1,
  "memory_type": "entities"
}
-->