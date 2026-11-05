# SuccessCard布局修复
苏住房C小程序中SuccessCard.vue图片未水平居中、按钮贴底问题已修复。

## 问题根因
- 原`ZsImage`未统一居中，且`.card :deep(.img)`规则无效
- `.card`缺少底部内边距，按钮区域贴容器下边缘

## 修复内容
- 4个`ZsImage`统一包在`.img-wrap`容器中，使用`display: flex; justify-content: center`居中，不依赖`:deep()`穿透
- 移除无效的`.card :deep(.img)`规则
- `.card`增加`padding: 46px 0 48rpx`和`box-sizing: border-box`
- 按钮区域与卡片下边缘保留`48rpx`间距，若偏紧可调整为`60rpx`对称

## 验证与归属
- 引用页面（`AuthorizedSuccess`、`UnauthorizedPage`等）无需修改自动生效
- 可在小程序开发者工具打开实名认证成功/未认证页面确认
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：066bd23c-4a48-43ae-a818-2324fa5a63fb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "successcard_layout_fix",
  "source_extraction_id": "dd1e2a6351994e95ac5b5cd35121b3c0",
  "version": 1,
  "memory_type": "entities"
}
-->