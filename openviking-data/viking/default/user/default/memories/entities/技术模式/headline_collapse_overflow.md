# Headline collapse-content 溢出撑破右栏修复
苏州市房地产监测V3 的 zhi2-web-admin 中，Headline 组件 collapse-content 默认 overflow:visible，导致要件列表加载后撑破右栏容器，已通过限高滚动修复。

## 问题根因
- Headline 组件的 collapse-content 默认 overflow: visible
- 要件列表加载后高度超出，直接撑破右栏容器边界

## 修复方案
- 要件区加 overflow: hidden !important 与 flex:1; height:0 实现限高滚动
- 右栏同步 height/maxHeight 对齐左侧
- 加载完触发 layout-sync 重算高度

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/003.md
- 涉及文件：zhi2-web-admin/src/views/presale/permit/components/detail.vue、presale/permit/detail.vue、presale/permit/components/PermitInfoPanel.vue、presale/permit/components/PermitAppendixPanel.vue、presale/permit/components/PresaleAddAppendix.vue、src/mixins/detailMixins.js、src/mixins/form.js、src/views/presale/permit/permitConstants.js
- 来源会话ID：80adc70b-981c-4804-9369-1f47d63c1006；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_collapse_overflow",
  "source_extraction_id": "462201af45e742729b026ea5c07ddb26",
  "version": 1,
  "memory_type": "entities"
}
-->