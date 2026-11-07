# 长页面滚不到底全局body高度截断
操作指引等长页面滚不到底，根因是全局body{height:100%}锁死文档高度，用页面级类名+:global规则局部绕开而不动全局样式。

## 问题根因
- 全局样式body{height:100%}把文档高度锁死，内容超出视口时文档不产生滚动条，滚动被截断
- 表现与「滚动容器选错」很像，但根因在html/body而非内容容器overflow
- 直接改全局body规则会影响所有长页面，属全量回归范围，不应在一次局部改动里动

## 解决方案
- 先确认是全局高度链问题而非内容容器overflow选错
- 局部绕开：该页组件created里给<html>加页面专属类名（如operation-guide-scroll），unmounted里移除，再用:global规则解除全局height:100%对本页截断
- 确认只影响本页，其他页面（商品房等）实测未受影响
- 补e2e断言（长页可滚动且末区块可见），结论留「全局body{height:100%}仍存在，其他长页面若有同样现象根因相同但需全量回归」

## 验证与归属
- 验证会话：session-8d2fa9f1-0373-431b-8764-c1951d953e12（基线b6165db）最终结论：created给<html>加operation-guide-scroll类、unmounted移除配合:global规则解除全局body{height:100%}截断，仅影响本页，商品房等未受影响；遗留全局body{height:100%}仍存在需全量回归
- 涉及文件：zhi2-web-admin/src/views/home/operationGuide/OperationGuide.vue、zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue、zhi2-web-admin/tests/e2e/operation-guide.spec.ts
- 所属项目：zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "longpage_scroll_fix",
  "source_extraction_id": "35a40b74c09b4248958c07f3ca6c79bd",
  "version": 1,
  "memory_type": "entities"
}
-->