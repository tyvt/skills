# 微信小程序样式隔离使:deep无法穿透自定义组件
苏住房C（uni-app小程序zhi2-mobile-shimin）投票决策表单 StepChoose 中 ZsCheckbox 的 highlight 模式选中项贴边，父页 :deep(.checkbox-item) 设 padding 静默无效。

## 问题现象
- 选中项（ZsCheckbox highlight 模式）蓝色高亮背景完全贴边，与设计稿「背景内有内边距」不符
- 父页写 :deep(.checkbox-item) 设 padding，怎么调都没反应，无告警

## 根因
- 微信小程序自定义组件默认样式隔离，父页面的 :deep() 无法穿透进 ZsCheckbox 内部真实节点，声明被静默丢弃
- 与「组件标签上的 class/style 不透传」「WXSS 编译不报错但整条声明丢失」是同一类根因

## 解决方案
- 把 padding: 24rpx 28rpx、border-radius: 12rpx、box-sizing: border-box 写进 ZsCheckbox.vue 中 .highlight .checkbox-item 自身
- 选中态 .highlight .checkbox-item.active 只负责背景色（rgba(19,84,190,.08)）与文字色 var(--primary-color)
- 相邻项间距也放组件内（.highlight.v .checkbox-item + .checkbox-item { margin-top: 24rpx }）
- 删掉父页那段无效的 :deep(.checkbox-item)，避免两处维护、误以为改父页就能生效
- 推广：凡「组件自带的视觉形态（高亮、卡片、选中态）」一律组件内闭环；父页只应通过 props 控制形态开关而非用 CSS 覆盖内部节点

## 验证与归属
- 验证证据：会话 fee54f55（2026-08-28，基线 8fc3cc5）用户反馈「选中还是没有内边距」，根因为父页 StepChoose.vue 的 :deep(.checkbox-item) 无法生效
- 涉及文件：src/components/ZsCheckbox/ZsCheckbox.vue、src/pages_vote/decision/optional/StepChoose.vue、src/pages_vote/decision/common/StepChoose.vue、src/pages_vote/decision/form.vue
- 所属项目：苏住房C；来源会话ID：fee54f55-f0e6-4815-a66f-9e7605482cf9；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_style_isolation",
  "source_extraction_id": "b914c1b571894896a474b9ab1408ca7f",
  "version": 1,
  "memory_type": "entities"
}
-->