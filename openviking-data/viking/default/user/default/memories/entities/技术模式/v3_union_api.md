# 联行号接口全局统一迁移
苏州市房地产监测V3 联行号接口已全局统一迁移至 /system/unionBank/page。

## 核心改动
- 新增统一 API 模块 zhi2-web-admin/src/api/system/unionBank.js，导出 UNION_BANK_PAGE_URL、BANK_LIST_TREE_URL、UNION_BANK_TREE_CONFIG、UNION_BANK_SELECT_COLUMNS、pageUnionBank()
- VITE_APP_BASE_API=/api/v3.0，前端统一拼接为 /api/v3.0/system/unionBank/page
- yhlhhgl.js：listYhlhhgl → pageUnionBank（CRUD 仍保留旧 unionCodeManage/*，按计划未动）
- yhwdgl.js：listYhwdgl、listYhwdglzbxz、listYhwdsDialog 等迁移至 pageUnionBank

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：api/system/unionBank.js、api/jgyh/yhlhhgl.js、api/jgyh/yhwdgl.js、maintenance/receiptin/detail.vue
- 来源会话ID：6ce24e16-f765-47a3-bfb6-b6b8daf87b3a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_union_api",
  "source_extraction_id": "9ec3c07b17f34b9c98be7b3373038dfb",
  "version": 1,
  "memory_type": "entities"
}
-->