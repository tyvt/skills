# 分包内静态资源禁止import
小程序里 import 静态资源生成按文件物理位置推算的路径，页面在别的分包就必然404，须用 resolveStaticUrl 显式传分包名。

## 问题根因
- 重构把背景图从条件编译 `background-image` 改成 `import bg from '@/pages_my/static/images/xxx.png'` 后，微信小程序入口背景图整块不显示、控制台404/500
- 小程序打包时 import 生成的是按源文件与打包后文件的物理相对位置推算的URL，页面编进 pages_my 分包后相对路径不再指向 pages_my/static，分包页面永远取不到图片
- 这类失败不报编译错误，只有渲染层网络错误，易误判成「图片没打包」

## 解决方案
- 小程序端静态资源一律走 `resolveStaticUrl(src, subpackage)`，显式传目标分包名如 `resolveStaticUrl('images/verification-bg-1.png', 'pages_my')`，微信下返回 `/pages_my/static/...`，H5下返回 `{base}/pages_my/static/...`
- 模板用 `ZsImage` 时同样用 `src` + `subpackage` 两属性，不 import 后绑 `:src`
- 自查：在 `src/pages_*` 下 grep `import.*\\.(png|svg|jpg)`，命中基本都要改；改完确认文件已在对应 `pages_*/static/` 下

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：@src/pages_my/verification/TypeChoose.vue 图片不显示，根因是分包内import路径无法访问分包静态图，修复为 resolveStaticUrl 并列出H5与小程序两种解析结果
- 涉及文件：pages_my/verification/TypeChoose.vue、pages_my/verification/FormLocal.vue、pages_owner/authentication/TypeChoose.vue、utils/index.js、pages.json
- 所属项目：苏住房C；来源会话ID：00a9d48a-4fa1-45d7-911c-3c025eccb8fc；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_import_bug",
  "source_extraction_id": "1e9d9fcc5d254f8bb6175bced3e8798b",
  "version": 1,
  "memory_type": "entities"
}
-->