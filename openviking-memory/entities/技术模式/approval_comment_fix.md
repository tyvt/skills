# 审批意见字段统一为approveMessage
苏州市房地产监测V3 项目将预售撤销/延期审批接口的「意见说明」字段由 `comment` 统一改为 `approveMessage`。

## 修改文件
- `permitCancel/components/ApprovalDialog.vue`：表单绑定、校验规则、请求体及注释
- `permitExtend/components/ApprovalDialog.vue`：同上
- `e2e/fixtures/presale-cancel-helpers.js`：断言改为 `payload.approveMessage`
- `e2e/fixtures/presale-extend-helpers.js`：同上

## 说明
- 字段改名与预售许可主流程保持一致
- 请求体示例使用 `approveMessage` 作为意见说明字段

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件如上；所属项目：苏州市房地产监测V3
- 来源会话：cf534ef4-25d6-4a32-b82b-358de4a68ed6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_comment_fix",
  "source_extraction_id": "f8016802bbdc45ea86428e1387fbac2b",
  "version": 1,
  "memory_type": "entities"
}
-->