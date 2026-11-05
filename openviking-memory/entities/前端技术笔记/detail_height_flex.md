# 区域变更详情左右高度对齐修复
产品2.0 中 complexChange/detail.vue 查看模式右侧区域概览卡片与左侧表格高度不一致，已通过补全 flex 样式链修复。

## 问题原因
- 模板虽使用 flex items-stretch，但缺少让右侧卡片随左侧表格拉伸的完整 flex 样式链。
- 右侧区域概览卡片未逐级撑满高度，导致底部不对齐。

## 修复方式
- 为容器和左侧表格增加 basic-info-overview、basic-info-detail 类名。
- 父容器 align-items: stretch 使两列等高；左侧 DetailTemplate 的 detail-content 使用 flex:1 撑满。
- 右侧 .area-overview-wrapper 及内部 Headline（.collapse-container、.collapse-content）逐级 flex:1 填满高度。

## 验证与归属
- 验证：刷新「物业管理区域变更详情」页面后左右底部应对齐。
- 涉及文件：complexChange/detail.vue、complex/detail.vue、components/Headline/index.vue 等（路径前缀 d:/repository/产品2.0/zhi2-web-admin/src）。
- 所属项目：产品2.0；来源会话：1e61e3a9-dc70-4426-b664-29e85e61ae8d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "detail_height_flex",
  "source_extraction_id": "ca8df38d951f447aa2e165a2d2c0fccf",
  "version": 1,
  "memory_type": "entities"
}
-->