# 投票表决相对路径跳转报错修复
苏住房C小程序投票表决「参与决策」、业委会选举「参与选举」因相对路径跳转导致 navigateTo 找不到页面，已修复。

## 问题根因
- 代码使用相对路径跳转，如 `goto(`detail?id=${data.id}`)`，微信小程序 `navigateTo` 需完整路径（如 `/pages_vote/decision/detail?id=...`）
- 相对路径 `detail?id=...` 被当成页面名，从而找不到页面
- H5 环境可能正常，故只在小程序端暴露该问题

## 修复方案
- 在 `utils/index.js` 的 `openPage` 中增加 `resolveRelativePageUrl`，跳转前根据当前页面路由把相对路径解析为绝对路径
- 示例：`detail?id=123`（当前在 `pages_vote/decision/index`）→ `/pages_vote/decision/detail?id=123`

## 涉及文件
- 涉及文件：`utils/index.js`、`route-map.js`、`pages.js`、`pages_vote/decision/index.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：010bdda8-aa5a-4e50-bc2e-6187b98c3ce5

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "vote_relative_path_fix",
  "source_extraction_id": "881586bec5ef4745b92508ce244b74a9",
  "version": 1,
  "memory_type": "entities"
}
-->