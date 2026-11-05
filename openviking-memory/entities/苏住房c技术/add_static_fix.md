# 苏服办报修页图片不显示修复
苏住房C 报修 add.vue 分类图标在苏服办 H5 环境无法显示，已改用 resolveStaticUrl 修复。

## 问题根因
- add.vue 分类图标通过内联 `:style` 写死相对路径 `url('../../static/images/icon-repair-xxx.png')`
- 内联样式不走 Vite 构建，相对路径不会被转成正确静态资源地址
- H5 生产环境使用 `/` 作为 base（见 vite.config.ts），页面 URL 与文件系统路径不一致，`../../static/...` 在 WebView 解析到错误位置

## 修复方案
- 改用项目已有的 resolveStaticUrl，根据 import.meta.env.BASE_URL 生成正确静态资源路径
- 与首页菜单、随手拍列表等页面保持一致（getCategoryBg 函数使用 resolveStaticUrl(`images/icon-...`)）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：add.vue、vite.config.ts、src/utils/index.js
- 来源会话ID：80e004b0-7fee-4cde-af50-62f07a822d3a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "add_static_fix",
  "source_extraction_id": "6ad3f2ea4fc04335a74efe9f454748b7",
  "version": 1,
  "memory_type": "entities"
}
-->