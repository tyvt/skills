# 求购添加页信息有效期样式修复
苏住房C小程序 `pages_transaction/intention/add.vue` 修正「信息有效期至」文案样式以匹配表单项 label。

## 问题原因
- 「信息有效期至」使用了与区块标题相同的样式（`24rpx` / `#a2a2a2`）
- 上方「最小面积」等 label 为 `32rpx` / `#333`，导致样式不一致

## 修复内容
- 将该文案样式改为与 `.uni-forms-item__label` 一致：`font-size: 32rpx; color: #333333; line-height: 44rpx`
- 使用类 `font-(32 weight-400 color-333) leading-44` 渲染

## 验证与归属
- 重新编译小程序后效果一致
- 涉及文件：`pages_transaction/intention/add.vue`
- 所属项目：苏住房C；来源会话ID：452e5168-2d2e-4d7b-ad71-56eaaee8ce39；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_valid_date_style_fix",
  "source_extraction_id": "68876c8622ce424a85240de90cbdd4c6",
  "version": 1,
  "memory_type": "entities"
}
-->