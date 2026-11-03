# 房屋限制列表所属区域列需 provinceFormatter 转码
苏州市房地产监测V3 的 houseLimit/index.vue 所属区域列未配置 formatter，导致显示原始编码（如 320506）而非区县中文名。

## 问题根因
- houseLimit/index.vue 所属区域列缺少 formatter，直接展示区域编码
- 未复用 building/project/index.vue 的转码逻辑

## 修复方案
- 为该列添加 `formatter: this.formatters.provinceFormatter`
- 依赖 `common.allAreas` 将 `320506` 等区域代码渲染为区县中文名，与 building/project/index.vue 逻辑对齐

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/109.md；src=苏州市房地产监测V3/152.md
- 涉及文件：zhi2-web-admin/src/views/building/houseLimit/index.vue、building/project/index.vue、formatters/index.js、building/houseLimit/detail.vue、building/projectChange/index.vue、package.json、路由信息.json、.workbuddy/memory/2026-09-23.md
- 所属项目：苏州市房地产监测V3；来源会话：101f7d04-3b50-49eb-8e8d-10bc2d789804；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_area_formatter",
  "source_extraction_id": "44e59d3d914d48ed86daf5e20ef46d69",
  "version": 2,
  "memory_type": "entities"
}
-->