# 企信通接口对齐完成
苏州市房地产监测V3 开发企业/经纪机构注册通过企信通接口提取企业信息，计划完成且 7 个 E2E 用例通过。

## 背景
- 注册界面需根据统一社会信用代码提取企业信息，对齐企信通接口

## 修复要点
- `mapQxtEntInfo.js` 按官方 `QxtEntInfoVo` 映射，`businessTermEnd` 为空识别为「长期」，新增 `mapQxtEntInfoMeta`
- `extractQxtEntInfo.js` 统一提取逻辑 `runQxtEntExtract`，支持可选 `companyName`
- `Step1CompanyInfo.vue` 营业期限增「长期」复选框，展示类型提示，失败显后端 msg
- `institutionRegister.js` 经纪机构注册接入同一提取逻辑

## 涉及文件
- zhi2-web-admin/src/utils/mapQxtEntInfo.js
- zhi2-web-admin/src/utils/extractQxtEntInfo.js
- zhi2-web-admin/src/views/register/components/Step1CompanyInfo.vue
- zhi2-web-admin/src/api/institution/institutionRegister.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 来源会话：eb2f9a1f-31c8-4c08-ace9-5835eebfaf22；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qxt_interface_fix",
  "source_extraction_id": "6e590f142e9a49449b6145ec50c5ca14",
  "version": 1,
  "memory_type": "entities"
}
-->