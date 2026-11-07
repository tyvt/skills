# 监管标准弹窗接口调用链路
苏州市房地产监测V3 中监管协议 jgxm 模块的监管标准弹窗与接口调用关系已梳理。
## 相关文件
- 弹窗组件：zhi2-web-admin/src/views/supervision/agreement/jgxm/components/RegulatoryDialog.vue
- API 定义：zhi2-web-admin/src/api/xmxx/jgxm.js（getRegulatory → /prefund/superviseStandardVersion/selectRegulatoryStandardList）
- 唯一调用方：zhi2-web-admin/src/views/supervision/agreement/jgxm/components/SupervisionAddDialog.vue
- 父级入口：zhi2-web-admin/src/views/supervision/agreement/jgxm/components/SupervisionTable.vue
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：302ec45a-4a8a-4a2c-8b9d-89dca9c35825；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_dialog_api",
  "source_extraction_id": "f5ca0326c543440ba2dbc7a77ff0f348",
  "version": 1,
  "memory_type": "entities"
}
-->