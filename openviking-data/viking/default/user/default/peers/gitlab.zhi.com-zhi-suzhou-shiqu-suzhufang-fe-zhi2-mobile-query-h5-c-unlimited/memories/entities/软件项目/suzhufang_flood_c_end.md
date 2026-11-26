# 苏住房防汛C端 H5
苏住房防汛C端是面向移动端的防汛管理 H5 项目，由 Lead 负责前端开发与验收。
## 技术栈与结构
- 使用 uni-app（uni CLI）构建，H5 通过 nginx 站点部署
- 全局样式位于 src/styles/theme.css
- 汛前/汛中/汛后表单页面：src/pages/inspection/index.vue
- 求援工单页面：src/pages/rescue/index.vue
## 关键模块
- 物业管理区域选择组件含 `.complex-dropdown` 候选列表，曾因文档流占位顶掉下方字段，后改为绝对定位浮层
## 保存接口约定
- 保存逻辑集中在 src/stores/flood.ts，含 buildSavePayload 与 submitRescueRemote。
- 汛前/汛中/汛后检查保存接口 /inspection/save 需带 inspectionFileUrl、inspectionFileName，由 buildSavePayload 通过 photosToInspectionFiles(values.photos) 合并。
- 求援保存接口 /rescue/save 需带 attachUrl，由 submitRescueRemote 在有完成照片时写入。
- 照片仅在 status === 'done' 且 url 非空时上报，与 validatePhotos 一致；无照片时不传附件字段。

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "suzhufang_flood_c_end",
  "source_extraction_id": "7c9596ed3e0e45c5bf7f3399302432e7",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->