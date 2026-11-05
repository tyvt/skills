# 价格备案自动化测试截图对比
价格备案自动化测试已扩展为全部 10 个菜单的列表页 + 详情页截图对比，并已在线上环境跑通，共 20 张截图。

## 覆盖范围
- 每个菜单各截 2 张图（列表 + 详情），共 20 张
- 覆盖菜单：价格备案查询、价格备案申请、价格备案参数维护、价格备案(区县)、价格备案(市级)、征求意见、价格备案申请变更等 10 个菜单

## 运行环境
- 已在线上环境（prod）跑通
- 截图命名示例：recordpricemngsuzhou-1060000001-list.prod.png、...-detail.prod.png

## 关联信息
- 涉及文件：e2e/fixtures/manifest.prod.js、auth-helpers.js、playwright.config.js、package.json
- 所属项目：产品2.0；来源会话：6e92d8f9-3213-455d-ba5c-fe96f5b76ade

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_e2e_screenshot",
  "source_extraction_id": "6b8fdd3bf7ad451a97f037f40baed9eb",
  "version": 1,
  "memory_type": "entities"
}
-->