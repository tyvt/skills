# ZsPopup按钮固定宽度致弹窗溢出贴边
苏住房C移动端 ZsPopup.vue 弹窗宽280px，底部按钮固定220rpx×2加48rpx间距与22px内边距，总宽超出容器致贴边。

## 问题根因
- ZsPopup.vue 弹窗宽 280px
- 底部按钮固定 220rpx×2 加 48rpx 间距与 22px 内边距，总宽超出容器致贴边

## 修复要点
- 左右内边距 22px→40rpx、底部 26px→40rpx
- 按钮间距 48rpx→24rpx，按钮宽 220rpx→flex:1 均分，全局弹窗生效

## 涉及文件
- src/pages_my/setting/index.vue
- src/components/ZsPopup/ZsPopup.vue
- src/components/ZsButton/ZsButton.vue

## 验证与归属
- 验证证据：extracted source=cursor session=88f64892-53b3-4162-8469-1e1a1d20ac0d
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：88f64892-53b3-4162-8469-1e1a1d20ac0d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zspopup_button_overflow",
  "source_extraction_id": "bac8a29b0640417db020196152582699",
  "version": 1,
  "memory_type": "entities"
}
-->