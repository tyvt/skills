# zs-approval 审核按钮业务编码覆盖
产品2.0 中企业注册详情页的审核按钮因 zs-approval 只从路由 meta.busCode 取编码而缺失，需通过 bus prop 显式覆盖（属 bug 类修复）。

## 问题根因
- 公共 zs-approval 组件只从 this.$route.meta.busCode 取业务编码再调 isApprovalAuth 判权限
- 企业注册实际编码为 040100，详情路由 meta 往往无 busCode，取 undefined 后权限查询被跳过，按钮不渲染且不报错

## 解决方案
- 给 zs-approval / ApprovalProcessDialog 增加 bus prop，优先级「prop 显式传值 > 路由 meta」
- 页面侧写 const registerBusCode = this.$route.meta.busCode || '040100' 并 :bus-code 透传
- OperationBtnGroup 负责把 busCode 继续转发给 zs-approval，审批提交接口也用同一编码
- 按钮显示三条件须同时成立：bizState === 1 + 有 company:companyRegister:approval 权限码 + isApprovalAuth 返回 true

## 适用与归属
- 适用面：同源四项目所有「页面自己挂 zs-approval、业务编码非路由天然携带」的详情页（变更单、专项审批节点等）都应显式传 bus-code
- 验证证据：会话 784bbb09 用户报告 companyRegister/detail.vue 审核按钮没出现
- 涉及文件：company/companyRegister/detail.vue、OperationBtnGroup/index.vue、mixins/detailMixins.js、companyRegister.js
- 所属项目：产品2.0；来源会话：784bbb09-19cb-4209-8311-17aa5fdd0e9f；代码基线：5169909

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_approval_buscode",
  "source_extraction_id": "c6f7f75bccb4456b9472da01fa926967",
  "version": 1,
  "memory_type": "entities"
}
-->
