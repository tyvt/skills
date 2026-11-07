# 门户首页二级页面表格链接加粗与测试失败归属
首页二级页面表格点击链接需统一加粗（部分已实现），Playwright 失败为既有问题，与 `portal.scss` 改动无关。

## 样式规范
- 首页二级页面表格内点击链接统一加粗，目前部分已加粗
- 相关样式在 `portal.scss` 的 `.portal-link` 类

## 测试验证
- 运行门户 Playwright 用例：11 个交互用例失败
- 视觉用例因缺少 `test-results/portal-hybrid-designs` 目录无法启动
- 临时 stash `portal.scss` 改动后重跑失败用例，现象相同（表格行数 10，断言期望 6）
- 确认失败为既有问题，与本次 `portal.scss` 改动无关

## 涉及文件
- `portal.scss`
- `.portal-link`
- `BrokerPages.vue`
- `zhi2-web-admin/src/views/home/publicPortal/portal.scss`
- `pages/BrokerPages.vue`

## 归属信息
- 所属项目：门户
- 来源会话ID：session_f4b84f4ec133d87666e8098da70a6b80
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_link_bold",
  "source_extraction_id": "41b1b4a15e7c4008a54ab7bb826f5e44",
  "version": 1,
  "memory_type": "entities"
}
-->