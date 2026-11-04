# 按钮 min-width:auto 与定高冲突致文字裁切
pages_main/automaticRobot/index.vue 发送按钮因 min-width:auto 宽度不足换行，且默认行高/padding 与 80rpx 定高冲突裁切文字。

## 问题根因
- 发送按钮 min-width:auto 导致宽度不足换行
- 默认 line-height/padding 与 80rpx 定高冲突裁切文字

## 解决方案
- 重设按钮宽度与行高消除裁切

## 验证与归属
- 验证证据：cursor 会话 139110b4-03df-4c4d-bf70-e95f95be8853
- 涉及文件：pages_main/automaticRobot/index.vue、pages_my/robot/index.vue、chitchatDetail.vue、chitchat.vue、pages.json、ZsButton.vue、pages/automaticRobot/index.vue、problemListCard.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "button_minwidth_textcut",
  "source_extraction_id": "c66174cae1ae4980af55b9f34536beff",
  "version": 1,
  "memory_type": "entities"
}
-->