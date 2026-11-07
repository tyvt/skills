# 新房详情页收藏图标不显示修复
苏住房C小程序新房详情页底部「收藏」图标不显示的问题已修复，根因包含组件未注册与静态资源路径错误。

## 问题根因
- collectBtn 组件使用了 ZsImage 但未 import 和注册，图标节点无法渲染
- 未收藏图标 aixin_e.svg 在分包 pages_transaction/static 下，此前按主包 static 解析导致路径错误
- 微信小程序下 resolveStaticUrl 走了 IMAGE_BASE 远程 URL，本地打包静态图应使用 /static/ 本地路径

## 修复内容
- collectBtn.vue 显式导入并注册 ZsImage，新增 subpackage 属性按收藏状态选择主包/分包路径，补充图标尺寸样式
- newHouse/detail.vue 传入 emptyUrl="images/szf/aixin_e.svg" 和 subpackage="pages_transaction"
- utils/index.js 在微信小程序下将 resolveStaticUrl 改为返回本地路径

## 涉及文件与归属
- 涉及文件：collectBtn.vue、newHouse/detail.vue、utils/index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：d53574b2-2d92-4663-9c80-ced6a44b903a；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "favorite_icon_fix",
  "source_extraction_id": "1bc3f2f67eab4e51a467d63662cd46c9",
  "version": 1,
  "memory_type": "entities"
}
-->
