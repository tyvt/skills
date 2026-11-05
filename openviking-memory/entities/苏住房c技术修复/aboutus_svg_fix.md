# 关于我们页SVG图标加载失败修复
苏住房C小程序「关于我们」页面电话和地址左侧图标因分包静态资源未登记导致渲染层网络层错误，已修复。

## 问题根因
- 主包 static/svg/ 中的同名 SVG 文件在构建时被裁剪，运行时无法从主包加载
- 分包静态资源未登记分包映射，导致图标加载失败、控制台出现 500 错误

## 修复内容
- 新增分包静态资源 src/pages_main/static/svg/ 下的 headphone.svg 与 location.svg
- 在 src/utils/index.js 登记分包映射：'svg/headphone.svg': ['pages_main']、'svg/location.svg': ['pages_main']

## 验证与归属
- npm run build 成功，产物 dist/pages_main/static/svg/ 下两个 SVG 文件均存在
- 需在微信开发者工具重新导入 dist 目录，打开「关于我们」页面确认图标正常、控制台无 500 错误
- 涉及文件：utils/index.js、AboutUs.vue、ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：e7e357b4-638f-4ace-8ca0-7fa9ff707a43

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "aboutus_svg_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 2,
  "memory_type": "entities"
}
-->