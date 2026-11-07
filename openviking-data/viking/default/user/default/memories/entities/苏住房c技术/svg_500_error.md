# 苏住房C小程序SVG加载500
苏住房C 微信小程序 SVG 图标报 500 有两类根因：分包静态白名单指向未复制文件，以及原生 img 相对路径按组件目录解析。

## 问题现象与根因
- 报错 Failed to load local image resource ...svg，server responded with status 500
- 根因一：走 ZsImage 的 location.svg 被 SUBPACKAGE_STATIC_IMAGES 白名单重写成 /pages_owner/static/icon/location.svg，但该文件只存在于主包 src/static/icon/，分包无副本 → 请求不存在路径 500
- 根因二：走原生 img 的 file_szf_pdf.svg 写成 <img src="svg/file_szf_pdf.svg">，小程序按组件目录解析为 /pages_owner/components/FileList/svg/...，真实文件在主包 /static/svg/ 下

## 解决方案
- 按白名单把缺的资源补进各分包 static（location.svg 复制到 pages_owner/static/icon/ 与 pages_credit/static/icon/）
- 把 FileList 的 <img> 统一改为 <ZsImage> 交给 resolveStaticUrl 解析，pages_owner/pages_main/pages_vote 三个分包同改

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 复发自查：先查报错路径有无分包前缀（白名单与文件是否对得上），再看是否对 svg/xxx.svg 用了原生 img 没过 ZsImage
- 验证：会话 be666288 报错 location.svg 与 file_szf_pdf.svg 均 500，定位白名单与文件不一致及原生 img 漏改
- 涉及文件：src/components/ZsImage/ZsImage.vue、src/utils/index.js、scripts/migrate-main-empty-static.mjs、src/pages_owner/components/FileList/FileList.vue、Type2.vue、Type3.vue
- 所属项目：苏住房C；来源会话ID：be666288-8d34-4fea-9f67-33d480306f30；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "svg_500_error",
  "source_extraction_id": "a725f791950e4fc49d6298dbdd82d457",
  "version": 1,
  "memory_type": "entities"
}
-->