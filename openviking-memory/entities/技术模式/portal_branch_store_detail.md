# 分店详情页规范与审查结论
门户 publicPortal 分店（store-detail）详情页已对照 vue-reviewer 审查结论核对，当前无需再改代码。

## 规范要点
- 分店详情页「交易记录」表格已按需求隐藏，不在分支机构基本信息下显示
- 字段与 mock、模板分支已按设计对齐无缺陷；负责人电话保持完整号码（设计稿要求，与经纪人详情脱敏策略不同）
- 仅从列表进入的正常路径 mock 已带 parentAgency，暂不扩路由兜底；窄屏 @media (max-width:1200px) 下 .broker-store-fields 已为单列网格
- 分店列表名称相同为演示数据一致不影响详情；搜索 E2E 已改为「姑苏尚城」等

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal、pages/BrokerPages.vue、mock/brokers.js、portal.scss
- 所属项目：门户；来源会话ID：fbcede5c-3408-4b17-a700-fe4ca4fd9b05；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_branch_store_detail",
  "source_extraction_id": "e0e7df219ed7408bb18e5d442e1b453c",
  "version": 1,
  "memory_type": "entities"
}
-->
