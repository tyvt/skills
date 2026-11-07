# 企业信息变更E2E测试修复
苏州市房地产监测V3 项目修改企业信息变更 E2E 测试脚本 company-record-change.spec.js，5/5 用例通过。

## 修改内容
- `gotoCompanyInfoView`：已在企业信息查看页时不再 reload，改用 `fetchOwnCompanyPendingInfo` 拉数据；其余场景 `getOwnCompany` 等待超时改为 60s
- 用例 02 提交后：提交成功已落在查看页，去掉多余 `gotoCompanyInfoView`，直接等查看页并断言在途变更
- 用例 02 仍包含对 `qualificationRecordChangeList` 的请求体断言，本次一并验证通过

## 涉及文件
- `zhi2-web-admin/e2e/company/company-record-change.spec.js`
- `zhi2-web-admin/src/api/company/companyRecord.js`
- `zhi2-web-admin/e2e/fixtures/company-helpers.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 运行结果：01 / 01b / 02 / 03 / 04 全部 ok，约 1.2 分钟
- 所属项目：苏州市房地产监测V3
- 来源会话ID：12a2e42b-6de6-49de-9205-d3b77e75c3bf

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_e2e_fix",
  "source_extraction_id": "2fe7eac52e9242108067236bba5afb01",
  "version": 1,
  "memory_type": "entities"
}
-->