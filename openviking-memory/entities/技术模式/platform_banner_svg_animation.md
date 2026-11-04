# platform-banner 文案区 SVG 动画与无障碍
UnifiedLogin 平台横幅将文字与图片拆成多行 SVG 时需同步桌面/移动端入场 animation-delay。

## 动画时序
- intro 与 badge 淡入动效要在 @media (max-width: 1200px) 为 platform-banner-desc-enter-mobile 补与桌面一致的 animation-delay（如 0.25s）
- 避免窄屏两行错开时序不一致

## 无障碍
- 装饰性组合图可加 role="img" 保留 aria-label 满足无障碍
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue
- 所属项目：门户；代码基线：f489349；来源会话：6c10489b-ba36-4666-abdd-3b956862c76b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platform_banner_svg_animation",
  "source_extraction_id": "901dd939b34140e28e31fd6770021d9f",
  "version": 1,
  "memory_type": "entities"
}
-->