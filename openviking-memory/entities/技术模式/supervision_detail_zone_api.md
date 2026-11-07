# 监管详情区域 API 不匹配
由于 zhi2-web-admin 中 API 引用未统一，监管区域的下拉框没有值。

## 描述
- 文件 `zhi2-web-admin/src/views/supervision/agreement/version/detail.vue` 错误地引用了 `@/api/zone/zone.js`。
- 区域/下属区域的下拉框未加载出值。

## 问题根因
- 与使用了 `@/api/system/zone` 的 `index.vue` 的 API 引用不一致。
- 列表加载逻辑未对齐。

## 解决方案
- 修改为 `@/api/system/zone` 以与 `index.vue` 对齐。
- 修正了列表加载逻辑。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：ff916423-d72a-4b4e-b8d0-925acbfa29d1
- 验证证据: src=苏州市房地产监测V3-rest/069.md
- 涉及文件: supervision/agreement/version/detail.vue, benefit/pubRegAccountChange/detail.vue, presale/entrustSale/detail.vue, api/zone/zone.js, api/system/zone.js, property/propertyAccount/detail.vue, api/index.js, mixins/detailMixins.js
- 所属项目: 苏州市房地产监测V3; 会话: ff916423-d72a-4b4e-b8d0-925acbfa29d1; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_detail_zone_api",
  "source_extraction_id": "871325fa12334107afbf4d507d0400dd",
  "version": 1,
  "memory_type": "entities"
}
-->