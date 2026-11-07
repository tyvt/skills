# 企业注册股东弹窗证件类型修复
产品2.0 的 zhi2-web-admin 企业注册 E2E 全流程中，修复了股东弹窗证件类型选择失败的问题。

## 问题背景
- 全流程约 46 秒跑通 Step1 到 Step5，`registered_record_dept`（苏州市住建局）生效后 Step1 通过
- 股东弹窗原卡在「证件类型」选择，无法正确选中并保留错误值

## 修复方案
- 「证件类型」改用 `pickSelectOption(dialog, '证件类型', '居民身份证')`，与股东类型选择方式一致
- 打开股东弹窗后等待 `document_type` 字典接口返回再操作
- 选完下拉后等待面板关闭，不再用 `Escape` 清掉已选值

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：重跑 `cd zhi2-web-admin && npm run test:e2e:real-api-flow`，录像在 test-results/../video.webm
- 涉及文件：AnnexUpload/index.vue、companyRegister/dialog.vue、FjDialog.vue
- 所属项目：产品2.0；来源会话：a48b51e8-5524-4296-ac1b-f971accfcfcb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_cert_fix",
  "source_extraction_id": "fa91e52bec984e5cbe8148f4d9145e28",
  "version": 1,
  "memory_type": "entities"
}
-->