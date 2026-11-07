# 企信通企业信息提取映射
苏州市房地产监测V3 中企业注册信用代码提取统一采用企信通（Qxt）映射并识别长期营业期限。

## 映射与提取逻辑
- 共享层 `mapQxtEntInfo.js` 按 `QxtEntInfoVo` 映射企业信息
- `businessTermEnd` 为 null/undefined 时识别为「长期」
- `extractQxtEntInfo.js` 提供 `runQxtEntExtract` 统一提取接口

## 表单与保存
- `Step1CompanyInfo.vue` 营业期限增加「长期」复选框
- 保存时 `businessTermEnd` 传 null
- `registerValidate.js` 等参与校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/033.md
- 涉及文件：Step1CompanyInfo.vue、companyRegister.js、unitRegister.vue、companyRegister.vue、registerValidate.js、Step1BasicInfo.vue、detail.vue、api/index.js
- 所属项目：苏州市房地产监测V3；来源会话：eb2f9a1f-31c8-4c08-ace9-5835eebfaf22；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qxt_ent_extract",
  "source_extraction_id": "85ea740928034a10883a86b895152c50",
  "version": 1,
  "memory_type": "entities"
}
-->