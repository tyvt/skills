# 经纪机构注册流程E2E自动化
苏州市房地产监测V3 中经纪机构入网注册端到端自动化流程已重跑并修复多处与页面不一致的问题，整条链路跑通。

## 自动化调整
- Step2：UI 填管理员信息 + 从 /code 拉真实图片验证码；短信默认填联调码 293858，不点「获取验证码」（与开发企业注册一致，避免 sendVerificationCode 超时）
- Step3：按「上传」按钮循环上传要件，直到没有待传项
- Step4：按钮文案改为「新增」（不再是「新增服务方案」），提交用「申请入网」+ 确认框
- 管理端审批：增加 institutionRegister/approval 响应匹配（原先只认 companyRegister/approval）

## 跑测结果
- 整条链路已跑通：匿名入网 → 上传要件 → 管理端审批 → USCI 登录 → 打开机构基本信息
- 备案侧 busCode=030100 要件包里没有文件（与开发企业 040100 同类问题），90s 轮询后失败——说明注册单上有要件，审批后未同步到备案 companyRecordId 的 030100

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：agency-institution-register-flow-helpers.js、e2e/company/register-network-basic-appendix-real-api-flow.spec.js、.gitmodules、路由信息.json、MEMORY.md、institutionRegister/components/Step3Appendix.vue
- 所属项目：苏州市房地产监测V3；来源会话：6b984501-42f6-4b9b-a56e-364375c13c03；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_register_e2e",
  "source_extraction_id": "a43abec617b04cbbb35cf2e96893e74d",
  "version": 1,
  "memory_type": "entities"
}
-->