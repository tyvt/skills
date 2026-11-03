# getDetailRequiredParams 按页收窄必需参数
企业端公司信息页复用详情组件但不需要路由 id，因公共 mixin 强校验 id 致请求被跳全页空白，须重写该方法只返本页入参。

## 问题背景
- 场景：企业端「企业管理→企业信息」(#/toB/companyInfo) 整页字段显示 -、无「变更」按钮。
- 根因：该页复用 toB/companyRecord/detail.vue，取数走 getOwnCompany（不需路由 id）；某次给 mixins/form.js 的 getDetail 加 validateDetailRequiredParams() 默认把 primaryKey(id) 纳入，缺 id 就 console.warn 并 return，getDetail 未发。
- 连带：form 初始空值→全字段 -，且「变更」按钮依赖 form.bizState==2 也消失。

## 解决方案
- 在该页重写 getDetailRequiredParams()，只返回本页真正会用的入参（如 { moduleName, businessName }），让不需要 id 的详情接口照常请求。
- 排查特征：控制台有 `[getDetail] 缺少接口必需参数，已跳过请求：id`，全页 -、无报错、network 查不到详情请求。

## 验证与归属
- 验证：会话 6b03f817 companyInfo 全字段空白，定位 commit 01a0aa7cf 新增 validateDetailRequiredParams 要求 id；在 companyRecord/detail.vue 重写 getDetailRequiredParams 去掉 id 后恢复。
- 涉及文件：zhi2-web-admin/src/mixins/form.js；zhi2-web-admin/src/views/toB/companyRecord/detail.vue
- 所属项目：苏住房G；来源会话ID：6b03f817-799f-459f-9742-e7b1d4894401；代码基线：5ccda28

## 差异提示
- 与 #912（强塞 primaryKey 导致被跳过）和 #1008（重写 init() 导致不调接口）区别：本条给「按页重写 getDetailRequiredParams 收窄必需参数」具体解法（改页面不改 mixin 默认）并补「按钮同时消失」连带现象。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "detail_req_params",
  "source_extraction_id": "380f4b3087884e7bb7b69fd6773f6451",
  "version": 1,
  "memory_type": "entities"
}
-->