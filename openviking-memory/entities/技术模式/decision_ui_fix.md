# 决策与投票页 UI 修复
苏住房C 项目 zhi2-mobile-shimin 完成投票决策相关页面的弹窗遮罩、选项样式与决策记录渲染修复。

## 弃权弹窗修复
- `ZsPopup` 新增 `showMask` 属性，设为 `false` 时去掉半透明遮罩
- 取消按钮去掉 `plain` 并强化无边框样式
- `optional/StepChoose.vue`、`sort/StepChoose.vue` 的弃权确认弹窗加 `:showMask="false"`

## 参与决策选项表决
- 选中背景色改为 `rgba(19, 84, 190, 0.08)`（#1354BE 8%）
- 决策项底部间距由 `200rpx` 改为 `16px`

## 我的决策页
- 选项表决结果页展示决策摘要
- 决策记录列表改用 `CardCell` 渲染，修复文字被挤压/不显示问题
- `common`、`optional`、`sort` 三类 DecisionResult 页面均加 `min-height: 100vh`，并统一 `page` 灰色背景

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：4b874d91-6178-415b-b2f9-76dd5a75acdc
- 涉及文件：ZsPopup.vue、optional/StepChoose.vue、sort/StepChoose.vue 等
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_ui_fix",
  "source_extraction_id": "5117a99df72949b2bc4386bc627f3a94",
  "version": 1,
  "memory_type": "entities"
}
-->