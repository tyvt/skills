# 外网注册开发企业organType改为01
产品2.0 的外网企业注册功能已将机构类型 organType 统一为 01（开发企业）。

## 改动内容
- src/utils/registerValidate.js：注册表单初始值 organType: '01'，提交 saveCompanyRegister 时带上该值
- src/views/company/companyRegister/index.vue：管理端列表查询 getQueryParams() 中 organType: '01'，只查开发企业注册记录
- e2e/fixtures/register-helpers.js：E2E 测试创建注册草稿时同步为 01

## 机构类型对照
- 01 = 开发企业
- 02 = 物业服务企业（原值，已弃用）
- 外网注册页标题为「企业账号注册（开发企业）」，应与 01 一致

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：registerValidate.js、companyRegister/index.vue、register-helpers.js
- 所属项目：产品2.0；来源会话：bc67591b-a7e5-4c59-bfbf-ecc997f7c3f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_organ_01",
  "source_extraction_id": "d5e51a3170d5493aafd467d465fcc484",
  "version": 1,
  "memory_type": "entities"
}
-->