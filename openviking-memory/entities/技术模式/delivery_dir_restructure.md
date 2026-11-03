# 交付备案目录调整弃用中间delivery层级
苏州市房地产监测V3 中交付备案页面由 supervision/delivery/ 迁移至 supervision/projectDelivery/ 并删除旧目录。

## 变更要点
- 交付备案页面目录由 src/views/supervision/delivery/ 迁移至 src/views/supervision/projectDelivery/（含 index.vue、detail.vue）
- 删除旧 delivery 目录
- 菜单 filePath 设为 supervision/projectDelivery/index|detail
- 同步 E2E 配置 project-delivery-menu-config.js 与 PermitAppendixPanel 相对 import 路径
- 后端 SQL component/filePath 采用新路径

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/048.md
- 涉及文件：项目交付备案-前端对接文档.md、交付范围-前端对接文档.md、CashsaleDetail.vue、cashsale-apply-helpers.js、jffw.js、MEMORY.md、路由信息.json、2026-09-13.md
- 所属项目：苏州市房地产监测V3；来源会话：c1ba3f9c-6614-48bf-aa3e-5d69f6494ccc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delivery_dir_restructure",
  "source_extraction_id": "193aaf4ba64b42d4a62ba98bf6ee8d2d",
  "version": 1,
  "memory_type": "entities"
}
-->