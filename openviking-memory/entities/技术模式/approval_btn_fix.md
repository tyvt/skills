# 企业注册审核按钮显示修复
产品2.0 的企业注册审核按钮因业务编码缺失而不显示的问题已修复。

## 问题根因
- zs-approval 组件只从路由 meta.busCode 取业务编码
- 企业注册实际编码为 040100（定义在 companyRegister.js），审核页路由 meta 往往无此值
- 流程权限查询直接跳过，导致按钮不显示

## 修复内容
- detail.vue：传入 :bus-code="registerBusCode"，优先用路由 meta，否则回退到 040100
- OperationBtnGroup：把 busCode 转发给 zs-approval
- zs-approval / ApprovalProcessDialog：支持 bus 属性覆盖路由 meta，审批提交也用同一编码

## 显示条件
- form.bizState == 1（单据已提交、待审核）
- 当前用户有 company:companyRegister:approval 权限
- /flowable/task/isApprovalAuth 返回当前用户可审该节点

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：companyRegister.js、detail.vue、detailMixins.js
- 所属项目：产品2.0；来源会话：784bbb09-19cb-4209-8311-17aa5fdd0e9f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_btn_fix",
  "source_extraction_id": "d5e51a3170d5493aafd467d465fcc484",
  "version": 1,
  "memory_type": "entities"
}
-->