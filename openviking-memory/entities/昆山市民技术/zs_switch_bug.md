# zs-switch 小程序滑块宽高位移及对齐异常
昆山市民 `zs-switch` 组件在小程序下因 `aspect-ratio` 不生效等原因导致滑块尺寸、位移与文字对齐异常，已修复。

## 问题根因
- `zs-switch` 组件在小程序下 `aspect-ratio` 不生效致滑块尺寸异常
- `translateX` 位移错误且文字居中未避滑块

## 修复方案
- `zs-switch.vue` 设固定宽高、改 `left` 定位、文字左右对齐并设轨道最小宽
- `assetsPublicity/index.vue` 删冗余 `.mid-switch` 样式

## 验证与归属
- 来源会话ID：3123da20-6d5f-4805-879f-6708af6c6456
- 代码基线：none
- 涉及文件：src/components/zs-switch/zs-switch.vue、src/pages_benefit/assetsPublicity/index.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "zs_switch_bug",
  "source_extraction_id": "1e221c0770bc474fb2d32abe42a88d10",
  "version": 1,
  "memory_type": "entities"
}
-->