# 投票页提示图标加载失败修复
苏住房C小程序中 pages_vote 下共享组件 Tips.vue 引用主包图标被错误解析到分包导致500，已加入主包静态路径强制修正。

## 问题根因
- 报错路径 `/pages_vote/static/icon/tip-szf.png`，图片实际在主包 `src/static/icon/tip-szf.png`。
- `Tips.vue` 引用 `icon/tip-szf.png` 未指定 subpackage。
- `resolveStaticUrl` 按当前页面路由推断分包，在 pages_vote 下解析成分包路径，文件不存在加载失败。

## 修复方案
- 将 `icon/tip-szf.png` 加入 `MAIN_STATIC_PATHS`，强制从主包 static 目录加载。
- 修复后路径正确解析为 `/static/icon/tip-szf.png`。

## 验证与归属
- 涉及文件：pages_vote/elect/detail.vue、Tips.vue、utils/mainStaticPaths.js、pages.js。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：65302824-2836-4c68-a79c-8824fab43793。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "tip_icon_static",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 2,
  "memory_type": "entities"
}
-->