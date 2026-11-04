# 门户对外页面面包屑规则
门户对外门户（/#/UnifiedLogin）从首页进入、有层级关系的页面补充面包屑，无层级页面不显示。

## 面包屑层级
- 楼盘楼栋列表：可售楼盘展示 / 楼栋列表
- 楼幢销控表：可售楼盘展示 / 楼栋列表 / 销控表
- 公告正文：公示公告列表 / 公告正文
- 点击层级可回跳且保留项目数据；列表、空态、房屋/许可/房源/成交/合同等无层级页面不显示
- 经纪机构/经纪人页原有面包屑保持不变

## 实现与改动
- 新增 publicPortal/components/PortalBreadcrumb.vue：从经纪页提取的共享组件，样式与原实现逐像素一致（选择器加 .public-portal 前缀压过全局 gap: 24px）
- PropertyPages.vue / InformationPages.vue：接入组件 + 层级计算
- BrokerPages.vue：改用共享组件，删除内联实现（.broker-breadcrumb 类保留，测试选择器不受影响）
- 视觉基线：销控表设计稿原稿无面包屑，补充后卡片下移 40px，区域比对收敛为头部 + 结构断言（网格 y 332→371），销控颜色改由状态计数断言覆盖
- vite.config.js：修复本机 spawnSync 稳定 EBUSY 导致构建问题

## 验证与归属
- 验证证据：extracted source=workbuddy project=门户
- 涉及文件：PortalBreadcrumb.vue、PropertyPages.vue、InformationPages.vue、BrokerPages.vue
- 所属项目：门户；来源会话ID：02ffa87f-5b2c-4899-8321-3dac3ef60f31；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_breadcrumb_rule",
  "source_extraction_id": "8ec795904ec548c1801fc2e87c6a2106",
  "version": 1,
  "memory_type": "entities"
}
-->