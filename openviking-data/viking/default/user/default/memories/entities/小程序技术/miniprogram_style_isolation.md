# 微信小程序样式隔离使:deep无法穿透自定义组件
苏住房C（uni-app小程序zhi2-mobile-shimin）中，父页 :deep() 无法穿透 ZsCheckbox 等自定义组件内部节点，选中态背景色与内边距等样式静默失效。

## 问题现象
- ZsCheckbox highlight 模式选中项贴边（无内边距），父页 :deep(.checkbox-item) 设 padding 静默无效
- 「选项表决」页 :deep(.checkbox-item.active) 设选中浅蓝背景+主题色文字，勾选图标正常但背景色完全不出现
- 同页其它区域有背景，视觉不一致；加 !important 同样无效（选择器不匹配而非被覆盖）

## 根因
- 微信小程序自定义组件默认样式隔离，父页面 :deep() 有效范围只到子组件根节点，无法穿透进 ZsCheckbox 内部真实节点，声明被静默丢弃
- 与「组件标签上的 class/style 不透传」「WXSS 编译不报错但整条声明丢失」是同一类根因

## 解决方案
- 把「选中高亮」变成组件自身能力：ZsCheckbox.vue 新增 highlight prop，组件内部按选中态绑背景色 rgba(19,84,190,0.08) 与文字色 var(--primary-color)
- 选中态内边距/圆角也写进组件：.highlight .checkbox-item 设 padding:24rpx 28rpx、border-radius:12rpx、box-sizing:border-box；.highlight.v .checkbox-item + .checkbox-item 设相邻项间距 margin-top:24rpx
- 调用方改写成 <ZsCheckbox highlight ...>，删掉无效的 :deep(.checkbox-item.active) 与 :deep(.checkbox-item)，避免死样式误导后人
- 推广：凡「组件自带的视觉形态（高亮、卡片、选中态、内部图标、内部间距）」一律组件内闭环；父页只应通过 props 控制形态开关而非 CSS 覆盖内部节点；只有子组件根节点上的间距类调整才可用 :deep（如 base-card 的 margin-top）

## 验证与归属
- 会话 fee54f55（2026-08-28，基线 8fc3cc5）：用户反馈「选中还是没有内边距」，根因为父页 StepChoose.vue 的 :deep(.checkbox-item) 无法生效
- 会话 6c34628f（基线 8fc3cc5）：用户反馈「选项表决选择还是没有背景色」，定位 :deep(.checkbox-item.active) 无法穿透 ZsCheckbox，改为新增 highlight prop 内部实现选中背景
- 涉及文件：src/components/ZsCheckbox/ZsCheckbox.vue、src/pages_vote/decision/optional/StepChoose.vue、src/pages_vote/decision/common/StepChoose.vue、src/pages_vote/decision/components/RadioGroup.vue、src/pages_vote/decision/form.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_style_isolation",
  "source_extraction_id": "5bb7ea354f264d7a85462f53c9ba0596",
  "version": 2,
  "memory_type": "entities"
}
-->