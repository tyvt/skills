# 企业信息页空白且无操作按钮修复
苏住房G 项目 B 端企业管理员进入企业信息页时字段空白且缺少变更按钮，根因是 form.js mixin 新增参数校验要求 id 而该页无需 id，已完成修复。

## 问题现象
- B 端企业管理员访问「企业管理 → 企业信息」(路由 /#/toB/companyInfo) 时所有字段显示「-」空白。
- 页面缺少「变更」等操作按钮，无法操作。

## 根因
- 企业信息页使用 toB/companyRecord/detail.vue，通过 /company/companyRecord/getOwnCompany 获取当前登录企业信息，不需要路由 id 参数。
- commit 01a0aa7cf 中 src/mixins/form.js 新增 validateDetailRequiredParams() 详情接口参数校验（58-77 行），对缺失参数做校验阻断。
- 该企业信息接口无 id 参数，触发校验失败导致页面空白且按钮不渲染。

## 修复方案
- 定位根因并完成修复，使企业信息页跳过不必要的 id 参数校验或适配无 id 场景。

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G。
- 涉及文件：toB/companyRecord/detail.vue、src/mixins/form.js、vite.config.js、.gitmodules、src/main.js 等。
- 来源会话ID：6b03f817-799f-459f-9742-e7b1d4894401。

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "company_info_blank",
  "source_extraction_id": "f71cdca3fc7f42be8b25a9f5ef75b181",
  "version": 1,
  "memory_type": "entities"
}
-->