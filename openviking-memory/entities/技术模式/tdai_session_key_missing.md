# tdai 工具要求必填 session_key
在项目 苏州市房地产监测V3 中，MCP 工具如 `tdai_recall` 要求 `session_key`（例如：苏州市房地产监测V3）；缺失会触发 Missing required argument 错误。

## 问题根因
- `tdai_recall` 及其他 MCP 工具要求必填 `session_key`
- 调用时不带 `session_key` 会触发 `Missing required argument`

## 解决方案
- 调用时同时传入 `query` 和 `session_key`

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/052.md
- 涉及文件: api/xmxx/jgxm.js, supervision/agreement/jgxm/components/SupervisionAddDialog.vue, supervision/agreement/jgxm/components/RegulatoryDialog.vue, utils/apiV3Normalize.js, api/index.js, utils/request.js, mixins/ListTemplate.js, components/zs-select-dialog/zs-select-dialog-func.vue
- 所属项目: 苏州市房地产监测V3; 会话: 003bc3d6-55d2-4909-bd30-0c1d02f0083d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tdai_session_key_missing",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->