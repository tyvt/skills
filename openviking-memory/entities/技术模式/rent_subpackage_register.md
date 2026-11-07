# 分包页面漏配subPackages.js报页面找不到
rent 分包新增 vue 页面须同步配置 subPackages.js 并重新生成 pages.json，否则报 page not found。

## 问题原因
- 分包页面仅在 src/pages-rent/ 添加 .vue 不会自动注册

## 解决方案
- 须在 src/constants/rent/subPackages.js 的 pages 数组追加 { path: 'contractEdit', type: 'page' }
- 重新生成 pages.json，否则跳转报 page not found

## 验证与归属
- 所属项目：0
- 验证证据：extracted source=cursor project=0
- 验证：src=0/001.md
- 涉及文件：src/constants/rent/subPackages.js、pages.json
- 来源会话：a4715fcd-270b-447b-81e1-9e8eccd9d56c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_subpackage_register",
  "source_extraction_id": "2361c55339f146289f8d8bbd184ff68b",
  "version": 1,
  "memory_type": "entities"
}
-->