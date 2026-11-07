# 横幅入视口20%触发动画一次
首页 `platformBanner` 通过 `IntersectionObserver` 监听，进入视口 20% 时添加 `platform-banner--intro` 类触发动画并仅播放一次。
## 实现要点
- 通过 `IntersectionObserver` 监听 `platformBanner`
- `threshold` 为 0.2 时置 `platformBannerIntro` 为 `true` 并添加 `platform-banner--intro` 类触发动画
- 触发后断开观察
- 不支持该 API 的环境回退立即播放，动画仅播放一次
## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：src=门户/034.md
- 来源会话ID：9ad67057-f5d1-4085-a148-6d6c43688cee；代码基线：none；所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_banner_intro",
  "source_extraction_id": "6fe27462e4a74952add80fdb66474b9b",
  "version": 1,
  "memory_type": "entities"
}
-->