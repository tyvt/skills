# 公共收益操作流程指南页面（苏住房G）
苏住房G 项目完成「公共收益操作流程指南」页面开发，沿用 ProcessGuidePage + guideConfig 模式。

## 实现内容
- 页面入口：operationGuide/publicRevenue/index.vue
- guideConfig.js 新增 PUBLIC_REVENUE_GUIDE 配置
- ProcessGuidePage.vue 支持 brandPrefix，公共收益页不显示「阳光物业 —」前缀
- operationGuide/ 新增 9 个流程图标

## 页面内容
- 标题：公共收益操作流程指南
- 说明区：4 条操作流程
- 流程图：9 个步骤（物业管理区域备案 → 管理主体备案 → 经营管理 → 开户申请 → 协议签署 → 租赁合同 → 资金缴纳 → 资...）

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：85deecf4-0791-4992-9fcb-e9788f29593d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_revenue_guide",
  "source_extraction_id": "3ed1418d03ae4a378ef623cde6769cc3",
  "version": 1,
  "memory_type": "entities"
}
-->