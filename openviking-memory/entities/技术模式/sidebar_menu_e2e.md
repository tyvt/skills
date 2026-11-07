# 侧栏目录型菜单E2E遍历规范
navbar-sidebar-accessibility用例需遍历全部直接子叶子，同URL用main-content文本变化判定跳转成功。
## 解决方案
- 递归侧栏时只处理当前目录直接子叶子；现实现为用 `.locator('.menu-collapse-wrapper .sub-menu a').nth(i)` 顺序点击，早期曾用 sidebar-leaf-link 的 testid+closest 过滤避免捞到深层后代
- 每次点击前记录beforeUrl与[data-testid="main-content"]的innerText
- 点击后优先waitForURL与beforeUrl不同；若URL未变用waitForFunction比较main-content文本变化超时约4s再记成功
- 依次点击目录下每一个叶子而非只点最后一个
- 目录展开、滚动与pointer遮挡问题仍按侧栏专项用例里的展开/scrollIntoView处理
## 涉及文件
- zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0；代码基线：none
- 验证证据：会话97cb886a诉求2指出目录类型sidebar只点最后一个菜单；结论增加beforeMainText与URL不变时内容变化等待
- 来源会话ID：97cb886a-e67c-42b6-8516-f9591fa85219

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_menu_e2e",
  "source_extraction_id": "eec1849560e54b0ab2f531caec03b1b3",
  "version": 2,
  "memory_type": "entities"
}
-->