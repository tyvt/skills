# 认证页宽度与选择框修复
苏住房C小程序认证页因flex居中导致卡片未铺满、选择圆圈塌陷不可见，已修复。

## 问题根因
- `authentication.vue` 的 `.page-container` 使用 `align-items: center`，卡片和按钮被压缩居中
- 按钮使用 `long` 类（宽度 88%）而非满宽
- `TitleCard` 右侧插槽容器无固定尺寸，`ZsImage` 内部 `width/height:100%` 在父容器无尺寸时塌陷为 0

## 修复内容
- `TitleCard.vue` 为右侧选择图标增加固定尺寸容器 `.icon-slot`（20px）
- `authentication.vue` 去掉 `align-items: center`，卡片和按钮设 `width:100%`，移除按钮 `long` 类
- `addTypeChoose.vue` 按钮同步设 `width:100%`

## 验证与归属
- 刷新后三个选项卡片和「下一步」按钮铺满内容区，右侧单选圆圈正常显示
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：b057f782-58f8-4cae-917c-9f6600520843

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "auth_page_width_fix",
  "source_extraction_id": "d4aeab4b2dbf4b6c807c6259816b7573",
  "version": 1,
  "memory_type": "entities"
}
-->