# 价格备案自定义审批流关闭公共按钮
产品2.0 中价格备案模块区县/市级四个页面自带自定义审批按钮，需用 show-approval 按页面关闭 OperationBtnGroup 的公共审批按钮。

## 问题根因
- 价格备案区县/市级 detail.vue 与 changeDetail.vue 四个页面已自带完全自定义审批按钮
- OperationBtnGroup 在 bizState==1 时仍额外渲染公共 zs-approval 审批按钮，两套同屏
- 不能全局关：同模块「价格备案申请/征求意见/归档」等页面仍走公共审批流

## 解决方案
- 页面层给 operation-btn-group 加 :show-approval="!useCustomApprovalFlow"
- 自定义流程页面 useCustomApprovalFlow 置 true，其余页面默认 false
- 改动只落 4 个自定义流程页面，公共组件与其它页面零改动
- 判据：页面内已有自己一套审批动作按钮则有则关；改完逐页回归同模块公共审批页面确认按钮还在

## 验证与归属
- 验证证据：会话 c05cfd63（基线 62d5fb9）用户截图指出这几个页面用自定义审批流，关公共的
- 覆盖 recordPriceMngSuzhou 的 county/city/citychange/countychange 四个路由
- 涉及文件：commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue、changeDetail.vue、OperationBtnGroup/index.vue
- 所属项目：产品2.0；来源会话：c05cfd63-9585-47cc-9ca4-a4dd6b15eae9；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_approval_fork",
  "source_extraction_id": "c6f7f75bccb4456b9472da01fa926967",
  "version": 1,
  "memory_type": "entities"
}
-->