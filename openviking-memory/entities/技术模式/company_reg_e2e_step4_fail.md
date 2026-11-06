# 企业注册E2E Step4 503失败
苏州市房地产监测V3 企业注册全流程E2E在Step4股东信息提交时因后端503工作流启动失败。

## 环境验证
- URL http://192.168.1.129:8098 验证通过，HTTP 200，注册页正常加载
- 根路径即可，无需 /sys/fdc

## 失败详情
- Step1信息录入、Step2法人信息、Step3要件上传均通过
- Step4股东信息+提交失败（editAndSubmit），Step5主管部门审核未执行
- 失败原因：工作流启动失败 [503] dur（后端环境问题）
- 复现命令：E2E_BASE_URL=http://192.168.1.129:8098 npx playwright test e2e/register/company-register.spec.js --grep "全流程"

## 涉及文件与归属
- 涉及文件：e2e/register/company-register.spec.js、playwright-report/index.html
- 项目：苏州市房地产监测V3；来源会话ID：bbf4455e-d301-4701-a090-882f15126648

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_reg_e2e_step4_fail",
  "source_extraction_id": "c002564f850c4da795d9ca098fc59f02",
  "version": 1,
  "memory_type": "entities"
}
-->