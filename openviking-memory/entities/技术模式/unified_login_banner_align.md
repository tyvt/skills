# UnifiedLogin 横幅描述居左对齐
按设计稿将 UnifiedLogin 的 platform-banner-desc 调整为居左对齐，待确认后继续调标签和按钮位置。

## 改动要点
- 去掉 width: 33.55% 固定宽度拉伸，改为 height: 59.15% + width: auto 按高度等比缩放
- 增加 object-position: left top，文案从左侧起始对齐
- max-width 限制在按钮左侧，避免与右侧按钮区域重叠
- 两行文案紧贴左侧装饰区后显示，左对齐与设计稿一致

## 涉及文件
- d:\repository\门户\zhi2-web-admin\src\views\home\UnifiedLogin.vue

## 状态与归属
- 待用户确认后继续调整标签和按钮位置
- 所属项目：门户；来源会话：1c06a96f-418e-4cc9-93c8-d8e81869540b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_banner_align",
  "source_extraction_id": "50db55700aec41de90507de005ee0d8e",
  "version": 1,
  "memory_type": "entities"
}
-->