# 行政区域银行授权代码重生
苏住房G 已重新生成「行政区域银行授权」相关代码，置于 views/system/regionBankAuth。

## 文件清单
- `regionBankAuth/index.vue`：列表页（部门树 + 市/区/街道）
- `regionBankAuth/detail.vue`：新增/编辑/变更/详情/审批
- `regionBankAuth/components/StreetAuthDialog.vue`：街道授权弹窗
- `regionBankAuth/utils.js`：工具函数
- `platformConfig/detail.vue`：已增加 `bankAuthEnabled` 字段

## 使用说明
- 后端菜单 `component` 配置为 `system/regionBankAuth/index`
- 隐藏子路由：`add` → `system/regionBankAuth/detail`
- 验证证据：extracted source=cursor project=苏住房G；来源会话：30a9ebb2-e314-4631-ac50-9c9eece713f3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_bank_auth",
  "source_extraction_id": "6b04e6e015814a66a41bd7e1214053d1",
  "version": 1,
  "memory_type": "entities"
}
-->