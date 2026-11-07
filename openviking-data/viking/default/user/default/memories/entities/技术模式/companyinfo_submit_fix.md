# companyInfo.vue 原生表单提交拦截修复
泰兴G（zhi2-web-admin）修复企业注册 companyInfo.vue 未拦截原生表单提交导致整页刷新的问题。

## 问题现象
- zs-form 底层是 Element UI 的 el-form，会渲染成原生 <form>
- 未拦截 submit 时，表单内按 Enter 或默认提交会触发浏览器 GET 提交，表现为整页刷新或地址栏带查询参数
- accountInfo.vue 已写 @submit.native.prevent，companyInfo.vue 之前没有，更易出现「像点了按钮就刷新」的现象

## 修改内容
- 在 companyInfo.vue 根 zs-form 增加 @submit.native.prevent，与 accountInfo.vue 一致，阻止原生表单默认提交

## 涉及文件与归属
- zhi2-web-admin/src/views/register/components/companyInfo.vue（修改）
- 参照：zhi2-web-admin/src/views/register/components/accountInfo.vue
- 所属项目：G（泰兴G / zhi2-web-admin）；来源会话：b2127488-181c-4650-ae00-f25d6e38cf6e；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "companyinfo_submit_fix",
  "source_extraction_id": "b987838a35414e90a1de560ff479ae3b",
  "version": 1,
  "memory_type": "entities"
}
-->
