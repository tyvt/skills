# 报修详情页按钮颜色与边框修复
泰兴小程序报修详情页按钮颜色与边框异常问题已修复，共改动 3 个文件。

## 问题根因
- PageButton 设置内联样式时未同步 CSS 变量，自定义颜色不生效
- ZsButton 非 plain 按钮的 ::after 残留角标边框，type=default 非 plain 按钮背景色与自定义背景冲突

## 修复方案
- PageButton.vue 的 getBtnStyle 同步写入 CSS 变量 --btn-bg-color/--btn-color/--btn-border-color，新增 .btn-custom 用 !important 强制应用并清除 ::after 伪元素边框
- ZsButton.vue 非 plain 按钮 ::after 由 border:0 改为 border:none !important，type=default 非 plain 按钮设 background-color: transparent
- issue/detail.vue 相应调整

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/components/PageButton/PageButton.vue、src/staff/components/ZsButton/ZsButton.vue、src/staff/pages_facility/issue/detail.vue、src/staff/styles/theme.scss
- 所属项目：泰兴小程序；来源会话ID：77cbc4d5-1383-48ff-89a4-e4c89c975bd9

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "button_color_fix",
  "source_extraction_id": "aa06516a5e8149c6b7cf2801366c4597",
  "version": 1,
  "memory_type": "entities"
}
-->