# 物业费申报取消审核按钮 Loading 与去图标（苏住房G）
苏住房G 项目通过通用组件 OperationBtnGroup 与 feeDeclare2/detail.vue 调整「取消审核」按钮的交互与 loading 状态。

## 改动说明
- OperationBtnGroup 中「取消审核」按钮去掉 `icon="el-icon-check"`，增加 `:loading="cancelApprovalLoading"`
- data 新增 `cancelApprovalLoading: false`
- `cancellation` 改为 async/await，仅 `e == '2'`（取消审核）时从点击到流程校验 + 审批接口全程 try/finally 管理 loading
- feeDeclare2/detail.vue 配置 `:cancelApproval="true"`，所有启用 cancelApproval 的详情页同步生效

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/components/OperationBtnGroup/index.vue、zhi2-web-admin/src/views/property/feeDeclare2/detail.vue
- 来源会话ID：aa70668a-bf0c-4bc0-91cc-ee27bdd35194

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "cancel_approval_fix",
  "source_extraction_id": "4f84ed465fbf45709ebc9281d8ed22a1",
  "version": 1,
  "memory_type": "entities"
}
-->