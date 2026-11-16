# 顶栏背景更换为苏州天际线
苏州市房地产监测V3 将后台顶栏背景替换为用户提供的苏州天际线图片，保留纯色兜底。

## 资源与样式
- 图片位置：`zhi2-web-admin/public/assets/images/navbar-bg.png`
- 样式修改位于 `zhi2-web-admin/src/layout/components/Navbar.vue` 的 `.navbar`
- 保留 background-color（平台 menuBackgroundColor 或默认 #052c50），图片加载失败仍显示纯色
- 背景图使用 cover + center bottom，尽量露出底部天际线

## 说明
- 当前素材约 1024×34，宽屏 cover 放大后可能略糊；可替换同名高清图
- 可通过调整 background-position（如 left bottom 或百分比）微调裁切

## 验证与归属
- 2026-11-15 只读比对 V3 主 checkout：背景图尺寸与当前候选相同，原组件采用 cover 与底部对齐；随后继续比对品牌区、菜单布局与背景样式（尚无结论）
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 涉及文件：`zhi2-web-admin/src/layout/components/Navbar.vue`
- 来源会话ID：34e98571-54c2-446a-b11e-33e725fa6bc5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_bg_change",
  "source_extraction_id": "08db786d773549be87ae5bac8bc79344",
  "version": 2,
  "memory_type": "entities"
}
-->