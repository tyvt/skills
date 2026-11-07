# 电子业主卡页面背景图与文字遮挡修复
苏住房C小程序电子业主卡因宽度限制截断长文本、装饰背景层遮挡文字，已通过去宽度限制与调层级修复。

## 问题根因
- 小区名称用 `w-500`（500rpx），长文本被截断只显示「玉」
- 装饰背景层盖在文字上方，导致顶部被裁切

## 修复内容
- 去掉 `w-500`，改为 `padding-right: 160rpx` 给「切换」按钮留位
- 文字区域包在 `info-card-content` 里并设 `z-index: 1`，保证在背景层之上
- 长文本（小区名、地址、身份码）加 `word-break: break-all` 避免溢出

## 涉及文件与归属
- 涉及文件：`pages_owner/ownerCard/index.vue`、`pages_guard/index/index.vue`、`pages_owner/tenant/index.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：5a765087-11ff-4a31-9326-3d3a3b8980b1

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_card_fix",
  "source_extraction_id": "7e2cf28eaccd4767bd08eb2baa41b9d2",
  "version": 1,
  "memory_type": "entities"
}
-->
