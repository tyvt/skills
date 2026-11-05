# ZsSubmit 提交前流程配置校验修复
园区公共收益项目(zhi2-web-admin)中，ZsSubmit 提交流程原在解析 submitApi 前调用 ensureFlowConfigured，导致误报「审核流程未维护完成」。

## 问题根因
- submitApi 由 getSubmitApi 按约定拼出 /autonomy/ownerCommitteeLog/submit，本身正常
- ZsSubmit 在解析 submitApi 之前先调用 ensureFlowConfigured 查 /flowable/flowConfig/list
- 该步骤与 submitApi 是否配置无关，却复用同一条提示「审核流程未维护完成」，造成误导

## 解决方案
- ZsSubmit 改为先通过 getSubmitApi(route.meta, moduleName, businessName) 解析提交接口，仅解析不到路径时才报错，不再提交前调用 ensureFlowConfigured
- flowApi.js 统一 getSubmitApi / getApprovalApi 回退逻辑，菜单 submitApi 为空或未配置时使用 moduleName + businessName 拼接
- OperationBtnGroup 将 busCode、form 传给 ZsSubmit

## 涉及文件
- zhi2-web-admin/src/utils/flowApi.js
- zhi2-web-admin/src/views/autonomy/record/components/directDetail.vue
- zhi2-web-admin/src/mixins/approval.js
- zhi2-web-admin/src/mixins/form.js

## 验证与归属
- 所属项目：园区公共收益；来源会话ID：e92d4f55-1a75-41cb-a38f-01916f1c4db8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_submit_fix",
  "source_extraction_id": "d29a058ffc4a4d00972767cc35116df4",
  "version": 1,
  "memory_type": "entities"
}
-->