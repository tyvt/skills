# 平台横幅进入视口动画
门户首页平台横幅（platformBanner）改为滚动进入视口后再播放动画的实现模式。

## 实现要点
- 用 IntersectionObserver 监听 platformBanner，约 20% 区域进入视口时将 platformBannerIntro 设为 true 并加 platform-banner--intro 类触发动画
- 未进入视口前：左侧文案水平居中，橙色「一网通办」标签隐藏
- 触发后：文案 0.8s 滑到左侧 → 标签 0.5s 淡入
- 动画只播放一次（触发后断开 observer）
- 不支持 IntersectionObserver 的环境回退为立即播放

## 可调参数
- threshold 当前为 0.2，可调「刚露头就开始」或「几乎完全可见再开始」

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue
- 所属项目：门户；来源会话ID：9ad67057-f5d1-4085-a148-6d6c43688cee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_banner_animation",
  "source_extraction_id": "8ea22524996d48c6aef67b1869dae806",
  "version": 1,
  "memory_type": "entities"
}
-->