# 门禁首页头像不显示修复
苏住房C 门禁首页（pages_guard）头像不显示，根因为 ZsImage 样式隔离与资源路径错误，已通过包裹尺寸层与复制资源修复。

## 问题根因
- 样式问题：新版 `ZsImage` 内部用 `width: 100%; height: 100%`，尺寸类 `header-img` 写在组件上；微信小程序自定义组件样式隔离，父级尺寸传不进去，图片渲染为 0 宽高
- 资源路径问题：`main-v2.1` 头像在主包 `src/static/images/default-avatar-gary.png`，当前分支只放分包 `pages_guard/static`，主包路径访问不到

## 修复内容
- 用带尺寸的 `div.header-img` 包裹 `ZsImage`，确保 132rpx 显示区域
- 将 `default-avatar-gary.png` 复制回主包 `static/images/`
- 加入 `MAIN_STATIC_PATHS`，与 v2.1 一样走 `/static/images/default-avatar-gary.png`

## 涉及文件与归属
- 涉及文件：`src/pages_guard/index/index.vue`、`src/components/ZsImage/ZsImage.vue`、`src/utils/index.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0c646bb9-d1fa-4e8d-a2e1-e84fc34f6838；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "guard_avatar_fix",
  "source_extraction_id": "4b4211148dcb4ca980c39c04cc0e7fe5",
  "version": 1,
  "memory_type": "entities"
}
-->
