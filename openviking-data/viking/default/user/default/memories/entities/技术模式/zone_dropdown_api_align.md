
# 监管标准详情片区下拉API不一致则无值
`supervision/agreement/version/detail.vue` 将 `@/api/zone/zone.js` 引用统一为 `@/api/system/zone` 并修复片区下拉加载逻辑。

## 问题根因
- `supervision/agreement/version/detail.vue` 引用 `@/api/zone/zone.js` 与 `index.vue` 不一致
- 片区下拉数据加载逻辑异常导致无值

## 修复方案
- 将 `@/api/zone/zone.js` 引用统一为 `@/api/system/zone`（对齐 `index.vue`）
- 修复 `list` 相关片区下拉数据加载逻辑以解决无值

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/118.md
- 涉及文件：supervision/agreement/version/detail.vue、benefit/pubRegAccountChange/detail.vue、presale/entrustSale/detail.vue、api/zone/zone.js、api/system/zone.js、property/propertyAccount/detail.vue、api/index.js、mixins/detailMixins.js
- 所属项目：苏州市房地产监测V3；来源会话：ff916423-d72a-4b4e-b8d0-925acbfa29d1；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zone_dropdown_api_align",
  "source_extraction_id": "c0492b99adb24ccda6149da33f2e4546",
  "version": 1,
  "memory_type": "entities"
}
-->