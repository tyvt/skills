# 发送按钮 80rpx 与输入框 76rpx 高度不等
pages_main/automaticRobot/ 页面输入框高度 76rpx 与发送按钮 80rpx 不一致致布局未对齐。

## 问题根因
- 页面输入框高度 76rpx 与发送按钮 80rpx 不一致

## 解决方案
- 统一两者高度值以对齐布局

## 验证与归属
- 验证证据：cursor 会话 77cf72a2-1093-447c-94f7-20320099f3ff
- 涉及文件：pages_main/automaticRobot/index.vue、ZsButton.vue、pages_my/robot/chitchatDetail.vue、pages_my/robot/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "button_input_height",
  "source_extraction_id": "c66174cae1ae4980af55b9f34536beff",
  "version": 1,
  "memory_type": "entities"
}
-->