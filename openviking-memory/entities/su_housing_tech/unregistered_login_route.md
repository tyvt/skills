# 登录路由未注册导致跳转失败
苏住房C移动端因pages.json中登录路由被移除，代码仍navigateTo跳转致page not found。

## 问题根因
- commit 61febf6 移除了 pages.json 中的登录路由（如 /pages/login/index）
- 代码仍使用 navigateTo 跳转该路径，导致 page is not found 报错

## 修复要点
- 在 pages.json 恢复注册 pages/login/index、forget、password、success 四个页面
- 涉及文件：src/pages/login/index.vue、src/pages.json

## 验证与归属
- 验证证据：src=苏住房C/079.md
- 来源会话ID：17b77da9-0fa5-4835-918b-0363e0ec5bf1
- 所属项目：苏住房C（zhi2-mobile-shimin）

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "unregistered_login_route",
  "source_extraction_id": "2426b49c7fdf4f01ad92a4896738da13",
  "version": 1,
  "memory_type": "entities"
}
-->