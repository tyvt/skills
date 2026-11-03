# 真实接口 E2E 遇「审核中/在途」数据：管理员驳回后复用续跑
企业信息变更类真实 UI 全流程 E2E 遇目标企业已「审核中」导致流程卡死时，用管理员账号驳回该数据并续跑优于 skip。

## 背景与问题
- 企业信息变更类 E2E 须走真实 UI 全流程（禁 mock、禁 page.evaluate 改状态），目标企业常已「审核中」导致「变更」按钮不出现、流程卡死
- 变更类业务一单在途就不允再发起是后端正常约束；原 fixture 排除在途行或 skip 会让用例长期不真正执行，等于无回归（用户原话「反复改了很久了」）

## 解决方案
- 用例最开始加状态预处理：判断当前企业是否审核中；若是直接用管理员账号从审批端 UI 操作驳回，再以被驳回单据继续跑「编辑→提交→待确认」完整流程
- 每条跑都会自愈出可用数据，不必依赖人工清理环境

## 配套注意
- 删掉页面「审核流程查看」按钮后，原靠该按钮的等待与断言必须同步改新基准：断言「变更」按钮隐藏、标题栏显示「待确认」、接口 activeChangeDisplayStatus === '2'，否则删按钮会改红用例

## 验证与归属
- 来源会话 42560c80：用户要求审核中数据直接管理员驳回续跑，并去掉「审核流程查看」按钮且同步代码与测试改为断言待确认与 activeChangeDisplayStatus==='2'
- 涉及文件：e2e/company/company-record-change.spec.js、e2e/fixtures/company-helpers.js、src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue、e2e/toB/company-personnel-flow.spec.js
- 所属项目：产品2.0；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "e2e_review_reuse",
  "source_extraction_id": "ff13169b04d14a4c8a6747f663e042e9",
  "version": 1,
  "memory_type": "entities"
}
-->