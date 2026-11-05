# 人工添加页图片上传组件修复
苏住房C小程序人工添加页面图片上传组件不显示且按钮过窄，已通过布局重写与样式补齐修复。

## 问题根因
- ImageUploader 加了 h-144，4 列网格下每格约 36rpx 几乎不可见
- grid-auto-rows 用宽度算行高在小程序常算错，上传格高度为 0
- 页面用 align-items: center 按钮仅按文字宽度撑开，long 类无对应样式

## 修复内容
- ImageUploader 改用 aspect-ratio: 1 + min-height: 144rpx 保证可见，去掉 h-144 与宽度测量，register.vue 显式引入 ImageUploader
- 页面改 align-items: stretch，按钮用 block 属性且 width: 100%，ZsButton 补充 .zs-button--block { width: 100% } 样式

## 涉及文件与归属
- 涉及文件：ImageUploader 组件、register.vue、FormManual.vue、ZsButton 组件
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：3f889ff2-2daa-476e-86b3-963833ee9ca2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "manual_upload_fix",
  "source_extraction_id": "1bc3f2f67eab4e51a467d63662cd46c9",
  "version": 1,
  "memory_type": "entities"
}
-->