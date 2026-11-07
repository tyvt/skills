
# 在线咨询页发送按钮文字显示不全修复
苏住房C小程序「我的→消息→微聊→机器客服」(在线咨询页)右下角发送按钮文字显示不全，因按钮宽度不足换行且文字被裁切。

## 问题根因
- 按钮宽度被压缩：min-width:auto 在小程序 WebView 里让按钮宽度不足，「发送」两字可能换行显示
- 文字被裁切：原生 button 默认 line-height/padding 与固定高度 80rpx 冲突，只露出字符上下边缘

## 解决方案
- ZsButton 组件（全局）增加 padding:0、line-height:1、white-space:nowrap，避免文字换行和溢出裁切
- automaticRobot/index.vue 发送按钮固定 128rpx 宽，去掉 min-width:auto
- chitchatDetail.vue（微聊页）同步相同样式加固，避免同类问题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：139110b4-03df-4c4d-bf70-e95f95be8853
- 验证证据：cursor 会话 139110b4-03df-4c4d-bf70-e95f95be8853
- 涉及文件：pages_main/automaticRobot/index.vue、pages_my/robot/index.vue、pages_my/robot/chitchatDetail.vue、pages_my/robot/chitchat.vue、pages.json、ZsButton.vue、problemListCard.vue、automaticRobot/index.vue、chitchatDetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "button_minwidth_textcut",
  "source_extraction_id": "b4dab85f66b143b3b0951d4f778fb563",
  "version": 2,
  "memory_type": "entities"
}
-->