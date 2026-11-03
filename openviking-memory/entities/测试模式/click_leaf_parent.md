# clickLeafMenusUnderParent顺序点击
按目录批量点子菜单时，用 DOM 计数 + nth 顺序点 sub-menu a，断言失败只记录不中断，是最小可靠版。

## 现象
- 基于 index/href 的跨上下文数据结构易算错、与展开状态脱节，导致循环空转或跳过子级。
- 脚本在第一个目录卡住，或展开目录后不再点子菜单。

## 根因
- 跨上下文复杂结构易与 DOM 实际状态脱节。

## 解决方案
- DOM 侧只统计当前目录下子菜单 `<a>` 数量；Playwright 侧用 `.locator('.menu-collapse-wrapper .sub-menu a').nth(i)` 按序点击。
- 每次点击后短等待并 assertMainContentNotBlank，失败写入 uiErrorRecords；每个子菜单 try/catch，异常只打日志。
- 在修好直接子级过滤后再叠加上去。

## 涉及信息
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话：5af92aab-06ab-48cb-be81-b133e170a41b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "click_leaf_parent",
  "source_extraction_id": "1001facf978947c0afeaf5611beb1e05",
  "version": 1,
  "memory_type": "entities"
}
-->