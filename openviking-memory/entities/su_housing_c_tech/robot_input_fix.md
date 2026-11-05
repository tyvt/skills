# 智能机器人页发送按钮与输入框高度对齐修复
苏住房C 移动端 automaticRobot 页修复发送按钮与输入框高度不一致问题，统一为 80rpx。

## 问题原因
- 输入框高度 76rpx，发送按钮 80rpx
- `ZsButton` 组件默认高度 96rpx，页面样式未完全覆盖内部 `.zs-button`
- `uni-easyinput` 内部元素未设置高度，外层样式未生效

## 修复要点
- 输入框高度统一为 80rpx
- 用 `:deep` 覆盖 `uni-easyinput` 内部容器与输入框高度
- 用 `:deep(send-box .zs-button)` 强制发送按钮为 80rpx 并统一圆角

## 涉及文件
- src/pages_main/automaticRobot/index.vue
- src/components/ZsButton/ZsButton.vue
- src/pages_my/robot/chitchatDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：77cf72a2-1093-447c-94f7-20320099f3ff
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "robot_input_fix",
  "source_extraction_id": "05299e8d90ea44e7b84c45eab8c8e81c",
  "version": 1,
  "memory_type": "entities"
}
-->