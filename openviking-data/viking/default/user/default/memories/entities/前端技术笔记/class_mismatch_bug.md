# 复制改造页面布局错乱（类名不匹配）
园区物管2.0 中复制或改造列表页后，因模板类名与样式类名对不上导致布局完全错乱的已知问题。

## 现象
- 改造/复制既有列表页（如 serviceItem/index.vue）后，左侧分类与右侧表格布局完全错乱，调样式无效。
- CSS 不报错、元素照样渲染，易被误判为样式权重或组件默认样式问题反复排查。

## 根因
- 模板结构类名（type-main-box、type-left）与 <style> 中的样式类名（sort-main-box、sort-left）对不上，样式规则未命中。
- 通常源于分支合并/复制时模板改了类名而样式没同步（v2.6.1→v2.6.2 改造残留）。

## 排查与修复
- 遇到「样式完全没生效/布局乱」先做模板类名与样式选择器的双向 grep 对账，而非先怀疑样式权重。
- 确认是分支残留时，直接从上一个正常版本（v2.6.1）恢复该页布局最稳。
- 修复需同步提交到所有在用的发布分支（develop/v2.6.2 与 v2.6.2-yulin）。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/property/serviceItem/detail.vue、complexService/components/complexServiceDetailDialog.vue；代码基线 c52866fc8。
- 验证：262 分支 serviceItem/index.vue 模板用 type-* 但样式写在 sort-*；已从 v2.6.1 恢复并提交到 develop/v2.6.2（62b5647c8）与 develop/v2.6.2-yulin（347237709）。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "class_mismatch_bug",
  "source_extraction_id": "37c782270dad448bb86143b13a756fbb",
  "version": 1,
  "memory_type": "entities"
}
-->