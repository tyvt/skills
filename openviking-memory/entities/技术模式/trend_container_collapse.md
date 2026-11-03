# 趋势图容器压缩致高度塌陷重叠
园区物管2.0 资金全景趋势图因容器弹性属性误用导致高度塌陷、图表重叠，已修正。

## 问题描述
- 趋势图外层容器误用 `flex: 1 1 0` 与 `min-height: 0`，高度被压缩为 0
- 收入图与支出图因此重叠显示异常

## 解决方案
- 容器修正为 `flex: 1 1 auto` 并将弹性比例调至 `0.65`
- 各区账户余额横柱状图维持固定 `280px` 不受影响

## 验证与归属
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue、src/views/benefit/dataSandbox/fundPanorama/chartConstants.js、src/views/benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：03064ac9-644e-4263-ae50-f1c88bdea7a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "trend_container_collapse",
  "source_extraction_id": "e008fb7437824de69119ff4118b6d71b",
  "version": 1,
  "memory_type": "entities"
}
-->