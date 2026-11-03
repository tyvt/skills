# 详情页根容器高度撑出底部灰留白
小区信息等以卡片堆叠的H5页，内容不足一屏时根容器height:100%叠加App全局uni-page-body 100%会撑出底部灰留白。

## 现象
- 内容高度小于一屏时，底部出现大面积灰色空白
- 背景色铺在整页容器上，短内容也会把灰色铺到屏幕底

## 根因
- 页面根类（如.project-page）设height:100%
- App.vue中uni-page-body也为height:100%，容器被强制等于视口高度
- 与min-height:100%父级未解析高度是不同根因，改前需确认是固定height还是min-height链

## 解决方案
- 去掉页面根节点不必要的height:100%，让高度随内容自适应
- 保留适度padding-bottom即可
- 修改前先看是固定height还是min-height链，避免误改

## 验证与归属
- 验证会话14093e7d：project/info/index.vue底部留白过多，去掉height:100%后随内容结束
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/project/info/index.vue、src/App.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：fb55fa9

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "project_height_whitespace",
  "source_extraction_id": "3527dbc6cabc42928f2894d85a85de59",
  "version": 1,
  "memory_type": "entities"
}
-->