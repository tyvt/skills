# 注册流程路由对应关系澄清
苏州市房地产监测V3 澄清「机构注册 → 开发企业注册 → 信息录入」路径对应的实际路由。

## 路由与入口
- /companyRegister → companyRegister.vue：开发企业注册（步骤条完全匹配用户描述），路由参数 step=1
- /institutionRegister → institutionRegister/index.vue：经纪机构注册
- /unitRegister → unitRegister.vue：相关单位备案

## 关键结论
- 用户描述的路径对应开发企业账号注册流程（/companyRegister?step=1），不是经纪机构注册（institutionRegister）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：95094c7c-680b-44c8-88d5-d18665490b19
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：companyRegister.vue、institutionRegister/index.vue、unitRegister.vue、src/router/index.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_route_mapping",
  "source_extraction_id": "fd721c1979954aee919751d12eaaa0f8",
  "version": 1,
  "memory_type": "entities"
}
-->