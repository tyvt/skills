# 弹窗多业务线附件口径分流
园区公共收益项目同一弹窗组件服务多业务线时，用场景标志切换 ImageUpload 与 zs-file-upload，勿先改全局上传组件。

## 问题背景
- 租赁/经营资源 subVenueDialog 等弹窗同时服务「经营资源租赁合同详情」与「租赁申请」等入口
- 附件口径可能不同：仅图片 vs doc/pdf 等文档
- 为单一路径改全局 zs-file-upload/FileUpload accept 或提示文案，会误伤租赁申请等仍要文档的页面

## 解决方案
- 在弹窗内用场景 prop（如 isRevenueContractFiling）分支
- 合同备案详情走 ImageUpload（png/jpg/jpeg），其他场景保留 zs-file-upload
- 客户后续要求全站仅图片时，再单独推进 ImageUpload 默认化，与本次局部分流无关

## 验证与归属
- 用户结论：在 subVenueDialog 按 isRevenueContractFiling 使用 ImageUpload，租赁申请等仍用 zs-file-upload，并撤销对全局上传组件的修改
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueDialog.vue、zhi2-web-admin/src/components/zs-file-upload/zs-file-upload.vue、zhi2-web-admin/src/components/ImageUpload/index.vue
- 所属项目：园区公共收益；来源会话ID：64ba5321-fee1-4c2c-b025-17c5b576d64a；代码基线：4468dfa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_scene_switch",
  "source_extraction_id": "265d1891016b4a6484b2371a245ed467",
  "version": 1,
  "memory_type": "entities"
}
-->