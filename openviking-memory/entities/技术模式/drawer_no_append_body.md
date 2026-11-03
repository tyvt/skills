# 申报页抽屉未挂body致遮罩不全
园区物管2.0 中 pubQuarterlyDeclaration 移动端抽屉因未设置 append-to-body 导致遮罩无法铺满视口。

## 问题根因
- pubQuarterlyDeclaration/index.vue 的 mobileContainer 中 el-drawer 未设置 append-to-body
- el-drawer 渲染于 flex 容器 detail-container 内，遮罩无法铺满视口

## 解决方案
- 补充 append-to-body 使抽屉挂载到 body
- 将 @opened 改为 @open 以打开时加载预览数据
- 对齐 pubPropertyManage 的实现方式

## 验证与归属
- 来源会话：359338e5-7bdc-4836-8f28-c8e35d451719
- 涉及文件：benefit/pubQuarterlyDeclaration/detail.vue、mobilePreview/pubQuarterlyDeclaration/index.vue、benefit/pubAdvertiseSpace/detail.vue、mobilePreview/components/mobileContainer.vue、mobilePreview/pubPropertyManage/index.vue、mixins/detailMixins.js、mixins/form.js、styles/index.scss
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "drawer_no_append_body",
  "source_extraction_id": "7e48a78fbccf49ae99401e76e5772baa",
  "version": 1,
  "memory_type": "entities"
}
-->