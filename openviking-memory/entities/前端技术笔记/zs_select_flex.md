# zs-select flex容器宽度固定与嵌套弹窗修正
在 maintenanceFeeDtlDialog.vue 与 SingleSelect.vue 中，flex 容器内的 zs-select 因缺乏明确宽度导致面板异常，需固定宽度并修正嵌套弹窗面板。

## 现象
- flex 容器中 zs-select 缺乏明确宽度，导致下拉面板异常。
- SingleSelect.vue 嵌套弹窗下面板需重定位、宽度同步与层级修正。

## 根因
- zs-select 在 flex 布局中未设固定宽度，面板定位与尺寸计算错误。

## 修复方案
- maintenanceFeeDtlDialog.vue 中为 zs-select 设 width:140px 及 flex:0 0 140px。
- SingleSelect.vue 补充嵌套弹窗下面板重定位、宽度同步与层级修正逻辑。

## 关联信息
- 涉及文件：maintenanceFeeDtlDialog.vue、SingleSelect.vue。
- 来源会话：074f871c-28c4-41be-986b-cadac0bc2bc2；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_select_flex",
  "source_extraction_id": "5f4a8e9e8b1749e193841376524c88e4",
  "version": 1,
  "memory_type": "entities"
}
-->