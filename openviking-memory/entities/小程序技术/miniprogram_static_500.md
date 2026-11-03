# 分包页面引用静态图 500 双根因
苏住房C 小程序页面报本地图片资源 500，根因是相对路径被解析成分包路径且未在分包映射表登记，属文件缺失+路径错误双根因。

## 问题现象
- 页面报 `Failed to load local image resource /pages_main/static/svg/headphone.svg` 或 `/static/images/family-empty.png` 500
- 图标/插图整块不显示，UI 看起来紊乱

## 根因
- 项目双份维护「主包 static + 分包 static」，由 utils 内「路径→允许分包列表」映射决定构建产物目录
- 页面写 `../static/images/xxx.png` 相对路径，被解析成分包路径 `/<分包>/static/...` 但该目录无此文件
- 资源只存在主包 src/static 但页面用分包内路径引用，构建时主包同名文件被裁剪，运行时 500
- 属「文件缺失+路径错误」双根因，非 CDN 或网络问题

## 解决方案
- 需放分包内的资源，实际创建到 src/<分包>/static/... 并在 utils/index.js 映射表登记如 `'svg/headphone.svg': ['pages_main']`
- 应走主包的资源，路径改主包格式（如 `images/family-empty.png`）交给 ZsImage，并在 mainStaticPaths.js 登记
- 文件曾被重构提交删除的，从 git 历史恢复而不是另找图
- 改完必须 npm run build 并核对 dist 下对应目录确有产物，再重新导入 dist（开发者工具「编译」不重跑构建）

## 验证与归属
- 验证：会话 e7e357b4（基线 6599714）AboutUs.vue 两 SVG 500，新增文件+登记修复；会话 4b96617b（基线 9832ba3）family/index.vue 相对路径 500，恢复文件+改主包路径修复
- 涉及文件：src/utils/index.js、mainStaticPaths.js、pages_main/about/AboutUs.vue、pages_owner/family/index.vue、components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：e7e357b4-638f-4ace-8ca0-7fa9ff707a43, 4b96617b-0fec-4c96-af40-e0ec9f6a6e13；代码基线：6599714/9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_static_500",
  "source_extraction_id": "5b23890cee2f479791fcd3096d3399ab",
  "version": 1,
  "memory_type": "entities"
}
-->