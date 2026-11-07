# 分包页面 ./static/ 不被 uni-app 打包致 500
苏住房C 小程序中分包页面用 import './static/xxx.png' 引用图片时，构建产物落在页面子目录 /分包/页面/static/，uni-app 只复制分包根部 static，导致运行时 500。

## 问题现象
- 分包页报 /pages_owner/repair/static/icon_arrow_right.png、icon_feedback.png、icon_repair.png 全部 500，同模块其它页正常。
- 控制台提示 Failed to load local image resource，图片整块不显示。

## 根因
- 与 ZsImage 路由推断 500 是独立根因：add.vue 用 import iconX from './static/xxx.png'，构建后路径为 /pages_owner/repair/static/。
- uni-app 只把分包根部的 static 目录（pages_owner/static/）复制进小程序输出目录，页面级子目录 repair/static/ 不产出，运行时找不到文件。

## 解决方案
- 分包页面的图片一律放分包根 static（如 pages_owner/static/），引用写相对路径 '../static/xxx.png'。
- 已存在的图片直接改 import 路径，缺的先复制到分包根 static 再改路径。
- 改完重新编译（npm run dev/构建）后在开发者工具刷新验证。
- 判别口径：报错路径出现「分包 + 页面子目录 + /static/」时，先查是否 ./static/ 写法，而非先怀疑 ZsImage 的 subpackage 参数。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 bf727bff：add.vue 从 ./static/ 引用三张图标，产物路径 /pages_owner/repair/static/… 返回 500；同模块 submit.vue 用 ../static/（即 pages_owner/static/）可正常打包。修复为把 icon_feedback.png、icon_repair.png 复制到 pages_owner/static/ 并改 import 为 '../static/'，icon_arrow_right.png 本已存在。
- 涉及文件：src/pages_owner/repair/add.vue、src/pages_owner/repair/index.vue、src/pages_owner/static/right.svg。
- 所属项目：苏住房C；来源会话ID：bf727bff-d0f8-4d85-8723-cfa12502510a；代码基线：9832ba3。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_page_static_500",
  "source_extraction_id": "55b2f7ec05614bdf8869f3a530457f35",
  "version": 1,
  "memory_type": "entities"
}
-->