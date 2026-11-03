# 取消审核按钮去图标增loading
OperationBtnGroup 的「取消审核」按钮移除图标并绑定 loading 防止重复点击。

## 问题现象
- 「取消审核」按钮原带 icon="el-icon-check" 且未防重复点击
- 快速多次点击可能触发重复请求

## 解决方案
- OperationBtnGroup/index.vue 的「取消审核」按钮移除 icon="el-icon-check" 并绑定 :loading="cancelApprovalLoading"
- data 新增 cancelApprovalLoading: false，cancellation 改 async/await 并在 e == '2' 时以 try/finally 管理 loading
- feeDeclare2/detail.vue 配置 :cancelApproval="true" 后所有启用该属性的详情页同步生效

## 验证与归属
- 验证证据：苏住房G/071.md
- 涉及文件：components/OperationBtnGroup/index.vue、utils/flowApi.js、zs-button/zs-button.vue、property/feeDeclare2/detail.vue
- 所属项目：苏住房G；来源会话ID：aa70668a-bf0c-4bc0-91cc-ee27bdd35194；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_approval_loading",
  "source_extraction_id": "62aa50b1d31141a59681e1090dfd286d",
  "version": 1,
  "memory_type": "entities"
}
-->