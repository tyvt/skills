# 电子业主卡图片加载失败修复
苏住房C电子业主卡页因ZsImage按当前页面路由推断分包导致图片500错误，已通过指定subpackage修复。
## 问题根因
- 图片实际在 `pages_owner/static/images/`（owner_nav_1.png等），但页面在 `pages_owner_extra` 分包
- `ZsImage` 默认 `local=true`，按当前页面路由推断分包，请求路径错误返回500
- 同页 `questionIcon`、`cardBgUrl` 已正确指定 `pages_owner`，导航图标和箭头漏掉
## 修复内容
- 为相关 `ZsImage` 增加 `subpackage="pages_owner"`
- 示例：`<ZsImage class="nav-icon" :src="item.icon" subpackage="pages_owner" />`
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译后图片应正常加载，无渲染层网络层错误
- 涉及文件：ownerCard/index.vue、ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：5c003f25-6041-4bd4-854d-61f76247907c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_image_fix",
  "source_extraction_id": "92d5861c1a484f0989ce3fb58fc3482b",
  "version": 1,
  "memory_type": "entities"
}
-->