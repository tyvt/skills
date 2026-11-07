# 顶栏背景天际线图
苏州市房地产监测V3 管理端顶栏使用天际线背景图，并保留纯色兜底防止加载失败。
## 实现要点
- 背景图路径：`zhi2-web-admin/public/assets/images/navbar-bg.png`
- `Navbar.vue` 的 `.navbar` 使用 `background-image`
- `background-color` 保留作图片加载失败回退
- 样式：`background-size: cover; background-position: center bottom`
## 涉及文件
- `zhi2-web-admin/src/layout/components/Navbar.vue`
## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：来源会话 34e98571-54c2-446a-b11e-33e725fa6bc5
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_bg_skyline",
  "source_extraction_id": "5f5198d2b46443abad5d1a01cf1edbb4",
  "version": 1,
  "memory_type": "entities"
}
-->