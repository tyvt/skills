# 微信小程序无sessionStorage致intention跳转异常
微信小程序无 `sessionStorage`，`pages_transaction/intention/list` 复用 `my.vue` 时 `viewItem` 误用浏览器 API 致跳转异常。

## 问题根因
- 微信小程序无 `sessionStorage`，`pages_transaction/intention/list` 复用 `my.vue` 时 `viewItem` 误用浏览器 API 致跳转异常

## 解决方案
- 修改 `my.vue` 的 `viewItem` 用 `uni.setStorageSync`
- `detail.vue` 读取改 `uni.getStorageSync` 并增 `|| '{}'` 防空值报错

## 验证与归属
- 涉及文件：my.vue、detail.vue、list.vue
- 验证：src=苏住房C/081.md；来源会话：f3006cc6-3479-4cab-8a4c-e366714a4084
- 项目：苏住房C（zhi2-mobile-shimin 市民端）

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "intention_sessionstorage_fix",
  "source_extraction_id": "f6592072a2364f72844e36ea1d0776c5",
  "version": 1,
  "memory_type": "entities"
}
-->