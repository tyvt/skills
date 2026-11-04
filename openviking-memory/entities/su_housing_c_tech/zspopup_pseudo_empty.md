# ZsPopup 伪元素为空壳且类型样式 CSS 缺失
ZsPopup.vue 中 .popup-container::after 为无背景空壳伪元素，全库无蓝色渐变样式。

## 样式缺失
- 组件模板含 :class="type"
- 苏住房C 内 .error/.warning/.success 无对应 CSS 定义

## 涉及文件
- src/components/ZsPopup/ZsPopup.vue
- src/pages_owner/house/authorization.vue
- src/pages_owner/house/index.vue
- src/pages_owner/house/detail.vue
- src/components/ZsPicker/ZsPicker.vue
- src/pages_transaction/intention/popup.vue
- package.json
- src/pages_owner/house/owner/addHouse.vue

## 验证与归属
- 验证：extracted source=cursor session=dbf1d248-7d94-4036-9d42-d7e63b814f60
- 所属项目：苏住房C/zhi2-mobile-shimin
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_pseudo_empty",
  "source_extraction_id": "4f9fafcde30a44d79d3bdf239b563b9b",
  "version": 1,
  "memory_type": "entities"
}
-->