# 修复机构人员列表中操作列的固定宽度
在 苏州市房地产监测V3 项目中，机构人员列表的操作列移除了固定宽度，以减少空白。

## 问题
- zs-operate-column 使用 :width="480" 导致在 AgencyPersonnelList.vue 列表中出现过多空白。

## 解决方案
- 在 AgencyPersonnelList.vue 中从 zs-operate-column 移除了 :width="480"
- 组件根据按钮文本自动计算宽度
- 宽度减少了 164px，按钮排列不换行

## 验证与文件
- 验证: src=苏州市房地产监测V3/179.md
- 涉及文件: AgencyPersonnelList.vue, zs-operate-column.vue, package.json, agency-personnel-real-api-flow.spec.js, vite.config.js, institution-menu-config.js, institution-helpers.js, auth-helpers.js
- 会话: c07f2835-00f4-4f26-8f40-499ded465259

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：c07f2835-00f4-4f26-8f40-499ded465259


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_col_width_fix",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->
