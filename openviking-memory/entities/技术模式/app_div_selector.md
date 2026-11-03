# src/App.vue 的 div 选择器小程序不支持
src/App.vue 全局样式使用 div 标签选择器，小程序端 style 不支持触发警告，移除后仅保留 view。

## 问题现象
- src/App.vue 全局样式使用 div 标签选择器，小程序端 style 不支持触发警告

## 解决方案
- 移除 div 选择器
- 仅保留 view { box-sizing: border-box; }

## 验证与归属
- 验证证据：src=i-H5/001.md
- 涉及文件：src/App.vue
- 所属项目：i-H5；代码基线 none；来源会话 2c9bfb73-886d-44bd-8ae0-224538ca4876

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "app_div_selector",
  "source_extraction_id": "7bf82be17f474ef1b475cb00d486216c",
  "version": 1,
  "memory_type": "entities"
}
-->