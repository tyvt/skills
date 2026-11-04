# 跨包 marker 图片引用失败及 textarea 塌陷
在移动项目 Su Housing C 中，通过 @/static 跨包引用的 location-red.png 导致小程序 500 错误，且 form2.scss 中的水平 flex 导致 ZsTextarea 高度塌陷。

## 问题根因
- 通过 @/static 跨包引用的 location-red.png 图片导致小程序 500 解析错误
- form2.scss 中的水平 flex 导致 addAlone.vue 中的 ZsTextarea 高度塌陷

## 修复
- 使用 resolveStaticUrl 并指定 pages_main 包来引用该图片
- 调整 addAlone.vue 中的 .description 样式以修复 ZsTextarea 塌陷

## 涉及文件
- src/pages_owner_extra/elevator/addAlone.vue
- src/components/ZsTextarea/ZsTextarea.vue
- src/styles/form2.scss
- src/utils/index.js
- src/pages_owner_extra/elevator/add.vue
- src/pages_feedback/feedback/add_feedback.vue
- src/pages.json
- src/pages_owner_extra/elevator/input.vue

## 验证
- 验证证据: extracted source=cursor session=85a3ba6b-0da3-48e5-b7f4-7ebc9f354ad6
- 所属项目: Su Housing C (zhi2-mobile-shimin); 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "marker_pkg_textarea",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->