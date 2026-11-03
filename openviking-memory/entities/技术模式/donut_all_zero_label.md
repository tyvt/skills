# 环图全0隐藏扇区label致分类名不展示
园区物管2.0 资源与合同分类环图在全为 0 时隐藏扇区 label 致分类名不展示，移除该判断后改为非空即渲染。

## 现象
- 环图全为 0 时资源与合同分类 label 不展示
- 13 子类 label 重叠系 ECharts avoidLabelOverlap 自动避让，非缺陷

## 根因
- 环图原逻辑在全为 0 时隐藏扇区 label，导致分类名缺失

## 解决方案
- 移除「全为 0 时隐藏扇区 label」判断
- 只要接口返回 donutData 不为空即渲染 `0 (0.0%)` 及引导线
- tooltip 与图例逻辑保持不变

## 验证与归属
- 验证证据：园区物管2.0/031.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、assetPanorama/mock.js、pieLegendHover.js、benefit/statisticsMap/index.vue、api/benefit/assetPanorama.js
- 所属项目：园区物管2.0
- 来源会话：6cb68a08-3eea-415d-bf9e-da0b8b216653；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "donut_all_zero_label",
  "source_extraction_id": "5336140ca3d7438dbc51c1ec0fc6e624",
  "version": 1,
  "memory_type": "entities"
}
-->