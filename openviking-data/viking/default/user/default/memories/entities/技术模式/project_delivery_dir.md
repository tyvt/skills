# 交付备案申请前端目录调整
苏州市房地产监测V3 将交付备案申请前端目录调整为 `supervision/projectDelivery`，移除中间 `delivery` 层级。
## 变更内容
- 页面路径：`src/views/supervision/projectDelivery/`（含 `index.vue`、`detail.vue`、`components/` 等），已删除 `src/views/supervision/delivery/`
- 菜单 filePath：`supervision/projectDelivery/index|detail`
- E2E 配置：`project-delivery-menu-config.js` 已同步，`PermitAppendixPanel` 相对 import 路径已修正
## 后端菜单 SQL
- `component/filePath` 使用：`supervision/projectDelivery/index` 与 `supervision/projectDelivery/detail`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`index.vue`、`detail.vue`、`project-delivery-menu-config.js`、项目交付备案-前端对接文档.md、交付范围-前端对接文档.md、`CashsaleDetail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：c1ba3f9c-6614-48bf-aa3e-5d69f6494ccc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_delivery_dir",
  "source_extraction_id": "069f712b5e4e47259870a25360d9451d",
  "version": 1,
  "memory_type": "entities"
}
-->