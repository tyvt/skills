# cbyh局部handleAdd引发整页刷新
苏州市房地产监测V3中cbyh/index.vue移除重复局部handleAdd，统一经listMixins跳转避免整页刷新。

## 全局注入
- vite.config.js 经 define 注入 window.debounce 供全项目 334 处调用
- permission.js 动态路由注册写入 meta.filePath 支撑路径解析

## 修复方案
- listMixins.js 的 handleAdd 统一经 getRouterPathByFilePath 跳转
- cbyh/index.vue 移除重复局部 handleAdd 避免整页刷新

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/019.md
- 涉及文件：cbyh/index.vue、cbyh/detail.vue、listMixins.js、detailMixins.js、ListTemplate.js、form.js、router/index.js、table.js
- 所属项目：苏州市房地产监测V3；来源会话：d05a4bd7-de6f-4b41-9315-000271ae8a10；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cbyh_handleadd_refresh",
  "source_extraction_id": "c77880165b094fe3a94ba8cb2b5fcca5",
  "version": 1,
  "memory_type": "entities"
}
-->