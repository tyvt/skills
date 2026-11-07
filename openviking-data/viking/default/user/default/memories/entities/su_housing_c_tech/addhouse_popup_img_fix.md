# 新增房源弹窗示例图不显示修复
苏住房C 移动端 `pages_owner/house/owner/addHouse` 弹窗中示例图不显示的问题已修复，根因为 ZsImage 样式冲突与隐藏容器不加载。

## 问题根因
- `ZsImage` 默认 `mode="aspectFill"` 内部样式 `height: 100%`
- 弹窗里 `.instructions-img` 写了固定 `height: 284rpx`，冲突后图片渲染高度为 0
- 微信小程序在隐藏容器里不加载图片，弹窗未打开时图片不渲染

## 修复要点
- 示例图加 `mode="widthFix"` 按宽度等比缩放
- 去掉 `.instructions-img` 固定高度
- 用 `v-if="showInstructionsPopup"` 弹窗打开后再渲染图片

## 涉及文件
- `src/pages_owner/house/owner/addHouse.vue`
- `src/pages_owner/house/owner` 目录
- `src/components/ZsImage/ZsImage.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：44137331-91dc-4b0c-ad74-f6c700c9aaf6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "addhouse_popup_img_fix",
  "source_extraction_id": "8af34dd423d746b8b76e046dd6ee35eb",
  "version": 1,
  "memory_type": "entities"
}
-->