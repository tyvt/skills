# ZsCheckbox 高亮模式内边距修复
苏住房C小程序修复微信小程序组件样式隔离导致 ZsCheckbox 选中项蓝色背景贴边问题。

## 问题根因
- 父页面 StepChoose.vue 用 :deep(.checkbox-item) 设置的 padding 无法穿透到 ZsCheckbox 内部
- 选中项的蓝色背景贴边，没有内边距

## 修复内容
- ZsCheckbox.vue 在 highlight 模式下把内边距和圆角写在组件内部：padding: 24rpx 28rpx、border-radius: 12rpx、box-sizing: border-box
- .highlight .checkbox-item.active 背景色 rgba(19, 84, 190, 0.08)、文字色 var(--primary-color)
- .highlight.v .checkbox-item + .checkbox-item 设置 margin-top: 24rpx
- optional/StepChoose.vue 移除无效的 :deep(.checkbox-item) 样式

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/ZsCheckbox/ZsCheckbox.vue、src/pages_vote/decision/optional/StepChoose.vue
- 来源会话ID：fee54f55-f0e6-4815-a66f-9e7605482cf9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zscheckbox_padding_fix",
  "source_extraction_id": "16730c0f2c094b93a4bc0dbabc7ca178",
  "version": 1,
  "memory_type": "entities"
}
-->