# 苏住房防汛C端 H5
苏住房防汛C端是面向移动端的防汛管理 H5 项目，由 Lead 负责前端开发与验收。
## 技术栈与结构
- 使用 uni-app（uni CLI）构建，H5 通过 nginx 站点部署
- 全局样式位于 src/styles/theme.css
- 汛前/汛中/汛后表单页面：src/pages/inspection/index.vue
- 求援工单页面：src/pages/rescue/index.vue
## 关键模块
- 物业管理区域选择组件含 `.complex-dropdown` 候选列表，曾因文档流占位顶掉下方字段，后改为绝对定位浮层


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "软件项目",
  "name": "suzhufang_flood_c_end",
  "source_extraction_id": "650564a5a7894b7883c8d7fa4792c5b9",
  "version": 1,
  "memory_type": "entities"
}
-->