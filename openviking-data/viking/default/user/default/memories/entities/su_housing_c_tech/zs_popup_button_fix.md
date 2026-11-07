# ZsPopup 底部按钮区布局修复
苏住房C小程序全局弹窗组件 `ZsPopup.vue` 底部按钮贴边问题已修复。

## 问题根因
- 弹窗宽度 `280px`，按钮固定 `220rpx × 2` + `48rpx` 间距 + `22px` 左右内边距，总宽超出容器，按钮贴到弹窗边缘

## 修复内容
- 左右内边距 `22px` → `40rpx`，底部 `26px` → `40rpx`
- 按钮间距 `48rpx` → `24rpx`
- 按钮宽度 固定 `220rpx` → `flex: 1` 均分剩余空间，使「取消」「确认」与边缘保持间距

## 验证与归属
- 该组件为全局共用，其他使用 `ZsPopup` 的弹窗一并生效
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`components/ZsPopup/ZsPopup.vue`、`pages_my/setting/index.vue`、`components/ZsButton/ZsButton.vue`
- 来源会话ID：88f64892-53b3-4162-8469-1e1a1d20ac0d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_popup_button_fix",
  "source_extraction_id": "f52854a4bf0f4d3c8f51f968519959b1",
  "version": 1,
  "memory_type": "entities"
}
-->