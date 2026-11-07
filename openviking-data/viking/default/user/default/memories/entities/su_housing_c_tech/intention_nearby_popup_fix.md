# 求购附近小区弹窗布局修复
苏住房C小程序「添加求购信息」页点击「附近小区」弹窗的布局重叠问题已修复。

## 问题原因
- `z-paging` 默认 `fixed: true`，在弹窗内按全屏固定定位渲染，列表区与底部「取消」「保存」按钮重叠
- 原弹窗内容含按钮放在同一 `overflow-y: auto` 容器，列表高度受限，滚动体验差

## 修复内容
- 弹窗改为 flex 纵向布局：标题区 → 可滚动列表区 → 固定底部按钮区，三者分离
- 为 `z-paging` 设置 `:fixed="false"` 和 `:use-page-scroll="false"`，按父容器高度渲染
- 列表区设 `min-height: 500rpx`，弹窗整体 `max-height: 75vh`，扩大可视与滑动区域
- 底部按钮区 `flex-shrink: 0` 并加安全区适配，避免与列表重叠

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`zhi2-mobile-shimin/src/pages_transaction/intention/popup.vue`、`add.vue`
- 来源会话ID：451f9781-7f9a-465f-90a9-7f258714b1cc
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_nearby_popup_fix",
  "source_extraction_id": "f112774c505640e3b6c48d36ad3aaf81",
  "version": 1,
  "memory_type": "entities"
}
-->