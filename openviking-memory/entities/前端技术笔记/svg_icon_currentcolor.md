# SVG 图标主题色失效根因
svg-icon 图标颜色变成写死 #1990FF 不再跟随主题色，根因为 SVGO convertColors 插件在构建期改写源文件 fill="currentColor"。

## 现象
- svg-icon 图标颜色突然全部变成写死 #1990FF，不跟随主题色，运行时无报错。

## 根因
- 构建链 SVGO convertColors 插件在构建期把源 SVG 的 fill="currentColor" 改写成具体色值，可能在 2.6.2 或 2.6.2-yulin 等并行分支引入。

## 解决方案
- 批量把 SVG 源文件 fill="#1990FF" 恢复为 fill="currentColor"，让颜色由组件属性/父级 color 控制（黑色场景用组件属性显式指定）。
- 确认 vite.config.js 移除 convertColors 插件。
- 跨分支扩散：当前分支验证后 cherry-pick 到 develop/v2.6.2，再把 2.6.2 合入 2.6.2-yulin；vite.config.js 冲突时保留 isLowMemory 判断并只删 convertColors。
- 排查「图标颜色全局失效」先查构建期 SVG 变换，再查分支归属。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/SvgIcon/index.vue、zhi2-web-admin/vite.config.js。
- 所属项目：园区物管2.0；来源会话：5d274116-4347-47db-94d1-391da544e0b4；代码基线：f101dd464。
- 验证：008.md 会话 5d274116 批量恢复 fill="currentColor" + 移除插件，cherry-pick 94bcd9a8a 到 2.6.2、合入 2.6.2-yulin 保留 isLowMemory。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "svg_icon_currentcolor",
  "source_extraction_id": "300b3a9ed67245bca01dea527f6bd86b",
  "version": 1,
  "memory_type": "entities"
}
-->