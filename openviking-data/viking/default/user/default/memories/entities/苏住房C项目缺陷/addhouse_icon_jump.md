# addHouse 中的帮助图标在跳包时失败且占位符不一致
在项目 Su Housing C 中，addHouse.vue 中的 '?' 图标在子包间导航时失败，且证书字段存在不一致的占位符。

## 问题根因
- addHouse.vue 中的 '?' 图标使用了易失败的子包间跳转
- 证书编号输入框未使用统一的 placeholder 类

## 修复
- 使用内部 popup uni-popup 配合 openInstructions() 并添加 @tap.stop
- 在证书输入框上应用 placeholder-class='uni-easyinput__placeholder-class'

## 涉及文件
- src/pages_owner/house/owner/addHouse.vue
- src/pages_transaction/publishHouse/verification.vue
- src/components/ZsPicker/ZsPicker.vue
- src/uni.scss
- src/pages.json
- src/components/ZsImage/ZsImage.vue
- src/pages_owner/house/owner/register.vue
- src/pages_owner/house/verify.vue

## 验证
- 验证证据: extracted source=cursor session=7bc1d9ba-8faa-4839-9f70-f4939f0e1403
- 所属项目: Su Housing C (zhi2-mobile-shimin); 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "addhouse_icon_jump",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->