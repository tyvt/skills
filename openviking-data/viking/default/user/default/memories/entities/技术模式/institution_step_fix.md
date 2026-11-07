# 经纪机构注册步骤回退回显修复
苏州市房地产监测V3 修复经纪机构注册 Step3 回退时管理员信息无法回显、点下一步报「注册单 ID 缺失」的问题。

## 根因
- Step3 的 @prev 绑定 goStep2，无参调用会把 URL 里 companyRegisterId 写成 undefined 并清空 queryRegisterRecord
- 导致管理员信息无法回显、点「下一步」报「注册单 ID 缺失」

## 主要改动
- index.vue：统一用 goStep(step) 导航保留 companyRegisterId；Step1 走 handleStep1Next；路由变化调用 loadRegisterDetailIfNeeded() 拉详情；增加 ensureValidStep() 校验
- institutionRegister.js：新增 getInstitutionRegisterDetail（noMessage/noReject，避免详情加载失败弹全局错误）
- 涉及 Step1BasicInfo.vue、Step2AdminInfo.vue 等组件

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/institutionRegister/index.vue、src/api/institution/institutionRegister.js、components/Step1BasicInfo.vue、components/Step2AdminInfo.vue
- 项目：苏州市房地产监测V3；来源会话ID：9fe9ee18-7352-4a5c-bc63-a249f00380ff

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_step_fix",
  "source_extraction_id": "cf849a215e8c44dd8c9bdd8eace90dfe",
  "version": 1,
  "memory_type": "entities"
}
-->
